import fs from 'fs/promises';
import Account from './Account';
import {parseCSV} from './ParseCSV';
import Table from 'cli-table3';

type Action = {
    type: 'buy' | 'sell',
    accountName: string,
    amount: number
}

export class AccountManager {
    private static instance: AccountManager;
    readonly accounts: Map<string, Account>;
    private readonly filename: string;

    constructor(filename: string) {
        this.accounts = new Map<string, Account>();
        this.filename = filename;
    }

    public static async getInstance(filename: string): Promise<AccountManager> {
        if (!AccountManager.instance) {
            AccountManager.instance = new AccountManager(filename);
            await AccountManager.instance.loadData();
        }
        return AccountManager.instance;
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.filename, { encoding: 'utf-8' });
            if (data) {
                const json = JSON.parse(data);
                for (const key in json) {
                    this.accounts.set(key, json[key]);
                }
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log(`Failed to parse account data file: ${this.filename}`);
                return;
            }
            console.log(`Creating data file ${this.filename}`);
            this.accounts.set('cash-on-hand', { name: 'cash-on-hand', amount: 0});
            await this.saveData();
        }
    }

    async saveData() {
        const data = JSON.stringify(Object.fromEntries(this.accounts.entries()));
        await fs.writeFile(this.filename, data);
    }

    async addAccount(name: string, amount: number) {
        if (name === 'cash-on-hand') {
            console.error('Cannot add cash-on-hand account, it already exists');
            return;
        }
        const account = this.accounts.get(name);
        if (account) {
            console.error('Account already exists');
            return;
        }
        await this.loadData();
        if (!/^[a-zA-Z0-9]+$/.test(name)) {
            throw new Error('Account name must be alphanumeric with no spaces.');
        }
        this.accounts.set(name, { name, amount });
        await this.saveData();
    }

    async sellAmount(name: string, amount: number) {
        if (name === 'cash-on-hand') {
            console.error('Cannot sell cash-on-hand, that makes no sense');
            return;
        }
        await this.loadData();
        const account = this.accounts.get(name);
        if (!account) {
            console.error('Account does not exist.');
            return;
        }
        account.amount -= amount;
        this.accounts.get('cash-on-hand')!.amount += amount;
        await this.saveData();
    }

    async buyAmount(name: string, amount: number) {
        if (name === 'cash-on-hand') {
            console.error('Cannot buy cash-on-hand, that makes no sense');
            return;
        }
        await this.loadData();
        const account = this.accounts.get(name);
        const cashOnHand = this.accounts.get('cash-on-hand')!;
        if (!account || cashOnHand.amount < amount) {
            throw new Error('Operation not possible.');
        }
        account.amount += amount;
        cashOnHand.amount -= amount;
        await this.saveData();
    }

    private async generatePlan(filename: string): Promise<Action[]> {
        const data = await parseCSV(filename);
        const totalInvestment = this.total();
        const actions: Action[] = [];

        let totalPercent = 0;

        data.forEach(row => {
            const accountName = row['account_name'];
            const percentage = parseFloat(row['percentage']);
            const targetAmount = (totalInvestment * percentage) / 100;
            const account = this.accounts.get(accountName);

            totalPercent = totalPercent + percentage;

            if (account) {
                const difference = targetAmount - account.amount;
                if (difference > 0) {
                    actions.push({type: 'buy', accountName: accountName, amount: difference});
                } else if (difference < 0) {
                    actions.push({type: 'sell', accountName: accountName, amount: -difference});
                }
            }
        });

        console.log(`Plan adds up to total percent of ${totalPercent}`);

        // Sort actions to ensure that all 'sell' actions come before 'buy' actions
        actions.sort((a, b) => {
            if (a.type === 'sell' && b.type === 'buy') return -1;
            if (a.type === 'buy' && b.type === 'sell') return 1;
            return 0;
        });

        return actions;
    }


    public async plan(filename: string): Promise<void> {
        const actions = await this.generatePlan(filename);
        actions.forEach(action => {
            console.log(`${action.type} ${action.accountName} ${action.amount.toFixed(2)}`);
        });
    }

    public async execute(filename: string): Promise<void> {
        const actions = await this.generatePlan(filename);

        for (const action of actions) {
            if (action.type === 'buy') {
                await this.buyAmount(action.accountName, action.amount);
            } else if (action.type === 'sell') {
                await this.sellAmount(action.accountName, action.amount);
            }
        }
        await this.saveData();
    }

    public listAccounts(): void {
        const table = new Table({
            head: ['Account', 'Amount', 'Proportion'],
            colWidths: [20, 20, 20],
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }
        });

        let total = 0;
        for (const account of this.accounts) {
            total += account[1].amount;
        }

        for (const account of this.accounts) {
            const proportion = total === 0 ? 0 : ((account[1].amount / total) * 100).toFixed(2);
            table.push([account[1].name, account[1].amount.toFixed(2), `${proportion}%`]);
        }

        console.log(table.toString());
        console.log(`Total investment ${this.total()}`);
    }


    total() {
        let total = 0;
        const entries = this.accounts.entries();
        for (const [, account] of entries) {
            total += account.amount;
        }
        return total;
    }
}
