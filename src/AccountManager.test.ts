import {AccountManager} from "./AccountManager";
import fs from "fs";

export function randomString(length: number) {
    const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz'];
    const allNumbers = [...'0123456789'];
    const base = [...allNumbers, ...allLowerAlpha];
    return [...Array(length)].map(() => base[Math.random() * base.length | 0]).join('');
}

describe('AccountManager', () => {

    test('should add an account', async () => {
        const random = randomString(5);
        const path = `test-accounts-${random}.json`;
        let manager: AccountManager = new AccountManager(path);
        await manager.loadData();

        try {
            await manager.addAccount('test', 100);
            expect(manager.accounts.size).toBe(2);
            expect(manager.accounts.get('test')!.amount).toBe(100);
            expect(manager.total()).toBe(100);
        } finally {
            fs.unlinkSync(path);
        }
    });

    test('should sell an amount', async () => {
        const random = randomString(5);
        const path = `test-accounts-${random}.json`;
        let manager: AccountManager = new AccountManager(path);
        await manager.loadData();

        try {
            await manager.addAccount('test', 100);
            await manager.sellAmount('test', 50);
            expect(manager.accounts.size).toBe(2);
            expect(manager.accounts.get('test')!.amount).toBe(50);
            expect(manager.accounts.get('cash-on-hand')!.amount).toBe(50);
            expect(manager.total()).toBe(100);
        } finally {
            fs.unlinkSync(path);
        }
    });

    test('should buy an amount', async () => {
        const random = randomString(5);
        const path = `test-accounts-${random}.json`;
        let manager: AccountManager = new AccountManager(path);
        await manager.loadData();

        try {
            await manager.addAccount('test', 100);
            await manager.sellAmount('test', 50);
            await manager.buyAmount('test', 25);
            expect(manager.accounts.size).toBe(2);
            expect(manager.accounts.get('test')!.amount).toBe(75);
            expect(manager.accounts.get('cash-on-hand')!.amount).toBe(25);
            expect(manager.total()).toBe(100);
        } finally {
            fs.unlinkSync(path);
        }
    });

    test('should plan', async () => {
        const random = randomString(5);
        const path = `test-accounts-${random}.json`;
        let manager: AccountManager = new AccountManager(path);
        await manager.loadData();

        try {
            await manager.addAccount('test1', 25);
            await manager.addAccount('test2', 25);
            await manager.addAccount('test3', 50);
            await manager.plan('test-plan.csv')
            expect(manager.accounts.size).toBe(4);
        } finally {
            fs.unlinkSync(path);
        }
    });

    test('should execute', async () => {
        const random = randomString(5);
        const path = `test-accounts-${random}.json`;
        let manager: AccountManager = new AccountManager(path);
        await manager.loadData();

        try {
            await manager.addAccount('test1', 25);
            await manager.addAccount('test2', 25);
            await manager.addAccount('test3', 50);
            await manager.execute('test-plan.csv')
            expect(manager.accounts.size).toBe(4);
        } finally {
            fs.unlinkSync(path);
        }
    });
});
