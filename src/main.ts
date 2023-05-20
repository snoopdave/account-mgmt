import {Command} from 'commander';
import {AccountManager} from './AccountManager';
import {parseCSV, CSVPlan} from './ParseCSV';

const program = new Command();
const accountManager = new AccountManager();

program
    .command('accounts add <account-name> <account-amount>')
    .action((accountName: string, accountAmount: number) => {
        accountManager.addAccount(accountName, accountAmount);
        console.log(`Account ${accountName} added with initial amount ${accountAmount}`);
    });

program
    .command('accounts sell <account-name> <sell-amount>')
    .action((accountName: string, sellAmount: number) => {
        accountManager.sellAmount(accountName, sellAmount);
        console.log(`Sold ${sellAmount} from account ${accountName}`);
    });

program
    .command('accounts buy <account-name> <buy-amount>')
    .action((accountName: string, buyAmount: number) => {
        accountManager.buyAmount(accountName, buyAmount);
        console.log(`Bought ${buyAmount} into account ${accountName}`);
    });

program
    .command('accounts plan <csv-file>')
    .action(async (csvFile: string) => {
        const plans = await parseCSV(csvFile);
        plans.forEach((plan: CSVPlan) => {
            console.log(`accounts sell ${plan.account_name} ${plan.percentage}`);
        });
    });

program
    .command('accounts list')
    .action(() => {
        const accounts = accountManager.listAccounts();
        accounts.forEach((account) => {
            console.log(`${account.name}: ${account.amount}`);
        });
    });

program.parse(process.argv);
