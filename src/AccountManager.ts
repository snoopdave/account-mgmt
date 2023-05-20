import Account from "./Account";

export class AccountManager {
    private accounts: Map<string, Account>;

    constructor() {
        this.accounts = new Map<string, Account>();
        this.accounts.set('cash-on-hand', {name: 'cash-on-hand', amount: 0});
    }

    addAccount(accountName: string, initialAmount: number): void {
        if (!this.isValidName(accountName)) {
            throw new Error("Invalid account name. Account names should be alphanumeric with no spaces or special characters.");
        }
        this.accounts.set(accountName, {name: accountName, amount: initialAmount});
    }

    sellAmount(accountName: string, amount: number): void {
        let account = this.accounts.get(accountName);
        if (account) {
            account.amount -= amount;
            let cashOnHand = this.accounts.get('cash-on-hand');
            if (cashOnHand) {
                cashOnHand.amount += amount;
            }
        } else {
            throw new Error("Account does not exist.");
        }
    }

    buyAmount(accountName: string, amount: number): void {
        let cashOnHand = this.accounts.get('cash-on-hand');
        if (cashOnHand && cashOnHand.amount >= amount) {
            let account = this.accounts.get(accountName);
            if (account) {
                account.amount += amount;
                cashOnHand.amount -= amount;
            } else {
                throw new Error("Account does not exist.");
            }
        } else {
            throw new Error("Insufficient funds in cash-on-hand.");
        }
    }

    listAccounts(): Account[] {
        let sortedAccounts = Array.from(this.accounts.values()).sort((a, b) => a.name.localeCompare(b.name));
        return sortedAccounts;
    }

    private isValidName(name: string): boolean {
        return /^[a-z0-9]+$/i.test(name);
    }
}
