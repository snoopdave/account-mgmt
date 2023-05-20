import { Command } from 'commander';
import { AccountManager } from './AccountManager';


(async () => {
    const program = new Command();
    const manager: AccountManager = await AccountManager.getInstance('accounts.json');

    program.version('0.0.1');

    program
        .command('add <account-name> <account-amount>')
        .description('Create a new account')
        .action(async (name, amount) => {
            await manager.addAccount(name, parseFloat(amount));
        });

    program
        .command('sell <account-name> <sell-amount>')
        .description('Sell an amount from an existing account')
        .action(async (name, amount) => {
            await manager.sellAmount(name, parseFloat(amount));
        });

    program
        .command('buy <account-name> <buy-amount>')
        .description('Buy an amount into an existing account')
        .action(async (name, amount) => {
            await manager.buyAmount(name, parseFloat(amount));
        });

    program
        .command('plan <csv-file>')
        .description('Show the plan of what buys and sells would be done for a re-balance plan')
        .action(async (filename) => {
            await manager.plan(filename);
        });

    program
        .command('execute <csv-file>')
        .description('Execute a re-balance plan')
        .action(async (filename) => {
            await manager.execute(filename);
        });

    program
        .command('list')
        .description('List all existing accounts')
        .action(async () => {
            await manager.listAccounts();
        });

    program.parse(process.argv);

})();
