import {AccountManager} from '../src/AccountManager';

test('Add account', () => {
    const accountManager = new AccountManager();
    accountManager.addAccount('test', 1000);
    expect(accountManager.listAccounts().length).toBe(2);
    expect(accountManager.listAccounts()[1].name).toBe('test');
    expect(accountManager.listAccounts()[1].amount).toBe(1000);
});

test('Sell amount', () => {
    const accountManager = new AccountManager();
    accountManager.addAccount('test', 1000);
    accountManager.sellAmount('test', 500);
    expect(accountManager.listAccounts()[1].amount).toBe(500);
});

test('Buy amount', () => {
    const accountManager = new AccountManager();
    accountManager.addAccount('test', 1000);
    accountManager.sellAmount('test', 500);
    accountManager.buyAmount('test', 200);
    expect(accountManager.listAccounts()[1].amount).toBe(700);
});

test('List accounts', () => {
    const accountManager = new AccountManager();
    accountManager.addAccount('test', 1000);
    accountManager.addAccount('test2', 2000);
    const accounts = accountManager.listAccounts();
    expect(accounts.length).toBe(3);
    expect(accounts[1].name).toBe('test');
    expect(accounts[2].name).toBe('test2');
});
