// Config
import { DB } from '@config/database';

// Modules
import { Balance, User } from '@modules/user';
import { Currency } from '@modules/currency';

// Utils
import { formatDate } from '@utils/formatters';
import { ErrorWithStatus } from '@utils/errors';

// Types & Interfaces
export type FindMethod<T> = (options: FindOneOptions) => Promise<T | undefined>;
export type CreateMethod<T> = (entity: T) => Promise<T>;
export type DepositMethod = (userId: number, amount: number, currency: Currency) => Promise<User>;
export type WithdrawMethod = (userId: number, amount: number, currency: Currency) => Promise<User>;
export type AddBalanceMethod = (userId: number, balance: Balance) => Promise<User>;
export type FindAllMethod<T> = () => Promise<T[]>;

export interface FindOneOptions {
    property: string;
    value: unknown;
}

/* ============================================================================================================== */
/* ================================================ USER METHODs ================================================ */
/* ============================================================================================================== */

export const findOneUser: FindMethod<User> = (options: FindOneOptions): Promise<User | undefined> => {
    return new Promise((resolve, reject) => {
        const user = DB.users.entities.find(u => {
            switch (options.property) {
                case 'id': return u.id === options.value;
                case 'name': return u.name === options.value;
                default: reject(new ErrorWithStatus(400, 'Invalid property'));
            }
        });
        setTimeout(() => {
            if (!user) resolve(undefined);
            else resolve(user);
        }, 1500);
    });
};

export const findAllUsers: FindAllMethod<User> = (): Promise<User[]> => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(DB.users.entities);
        }, 1500);
    });
};

export const deposit: DepositMethod = (userId: number, amount: number, currency: Currency): Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = DB.users.entities.find(u => u.id === userId);
        setTimeout(() => {
            if (!user) reject(new ErrorWithStatus(404, 'User not found'));
            else {
                const currencyIndex = user.balance.findIndex(b => b.currency.id === currency.id);
                if (currencyIndex === -1) reject(new ErrorWithStatus(404, 'Balance not found'));
                else {
                    user.balance[currencyIndex].deposits.push({
                        id: user.balance[currencyIndex].deposits.length + 1,
                        amount,
                        date: formatDate(new Date()),
                        initialAmount: user.balance[currencyIndex].amount,
                        finalAmount: user.balance[currencyIndex].amount + amount
                    });
                    user.balance[currencyIndex].amount += amount;
                    resolve(user);
                }}
        }, 1500);
    });
};

export const withdraw: WithdrawMethod = (userId: number, amount: number, currency: Currency): Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = DB.users.entities.find(u => u.id === userId);
        setTimeout(() => {
            if (!user) reject(new ErrorWithStatus(404, 'User not found'));
            else {
                const currencyIndex = user.balance.findIndex(b => b.currency.id === currency.id);
                if (currencyIndex === -1) reject(new ErrorWithStatus(404, 'Balance not found'));
                else {
                    user.balance[currencyIndex].withdrawal.push({
                        id: user.balance[currencyIndex].withdrawal.length + 1,
                        amount,
                        date: formatDate(new Date()),
                        initialAmount: user.balance[currencyIndex].amount,
                        finalAmount: user.balance[currencyIndex].amount - amount
                    });
                    user.balance[currencyIndex].amount -= amount;
                }
                resolve(user);
            }
        });
    });
};

export const createUser: CreateMethod<User> = (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        const userIndex = DB.users.entities.findIndex(c => c.name === user.name);
        if (userIndex !== -1) reject(new ErrorWithStatus(409, 'User already exists'));
        else {
            user.id = DB.users.entities.length + 1;
            user.balance = [];
            DB.users.entities.push(user);
            resolve(user);
        }
    });
};

export const addBalance = (userId: number, balance: Balance): Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = DB.users.entities.find(u => u.id === userId);
        setTimeout(() => {
            if (!user) reject(new ErrorWithStatus(404, 'User not found'));
            else {
                user.balance.push(balance);
                resolve(user);
            }
        });
    });
};

/* ================================================================================================================== */
/* ================================================ CURRENCY METHODS ================================================ */
/* ================================================================================================================== */

export const findOneCurrency: FindMethod<Currency> = (options: FindOneOptions): Promise<Currency | undefined> => {
    return new Promise((resolve, reject) => {
        const currency = DB.currencies.entities.find(c => {
            switch (options.property) {
                case 'id': return c.id === options.value;
                case 'name': return c.name === options.value;
                default: reject(new ErrorWithStatus(400, 'Invalid property'));
            }
        });
        setTimeout(() => {
            if (!currency) resolve(undefined);
            else resolve(currency);
        }, 1500);
    });
};

export const findAllCurrencies: FindAllMethod<Currency> = (): Promise<Currency[]> => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(DB.currencies.entities);
        }, 1500);
    });
};

export const createCurrency: CreateMethod<Currency> = (currency: Currency): Promise<Currency> => {
    return new Promise((resolve, reject) => {
        // Currency names will be saved in lowercase
        currency.name = currency.name.toLowerCase();
        const currencyIndex = DB.currencies.entities.findIndex(c => c.name === currency.name);
        if (currencyIndex !== -1) reject(new ErrorWithStatus(409, 'Currency already exists'));
        else {
            currency.id = DB.currencies.entities.length + 1;
            DB.currencies.entities.push(currency);
            resolve(currency);
        }
    });
};
