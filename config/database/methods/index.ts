// Config
import { DB } from '@config/database';

// Modules
import { User } from '@modules/user';
import { Currency } from '@modules/currency';
import { Balance, Wallet } from '@modules/wallet';

// Utils
import { formatDate } from '@utils/formatters';
import { ErrorWithStatus } from '@utils/errors';

// Types & Interfaces
export type FindMethod<T> = (options: FindOneOptions) => Promise<T | undefined>;
export type CreateMethod<T> = (entity: T) => Promise<T>;
export type DepositMethod = (walletId: number, amount: number, currency: Currency) => Promise<Wallet>;
export type WithdrawMethod = (walletId: number, amount: number, currency: Currency) => Promise<Wallet>;
export type AddBalanceMethod = (walletId: number, balance: Balance) => Promise<Wallet>;
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


export const createUser: CreateMethod<User> = (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        const userIndex = DB.users.entities.findIndex(c => c.name === user.name);
        if (userIndex !== -1) reject(new ErrorWithStatus(409, 'User already exists'));
        else {
            user.id = DB.users.entities.length + 1;
            DB.users.entities.push(user);
            resolve(user);
        }
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

/* ================================================================================================================ */
/* ================================================ WALLET METHODS ================================================ */
/* ================================================================================================================ */

export const findOneWallet: FindMethod<Wallet> = (options: FindOneOptions): Promise<Wallet | undefined> => {
    return new Promise((resolve, reject) => {
        const wallet = DB.wallets.entities.find(w => {
            switch (options.property) {
                case 'id': return w.id === options.value;
                case 'userId': return w.user.id === options.value;
                case 'userName': return w.user.name === options.value;
                default: reject(new ErrorWithStatus(400, 'Invalid property'));
            }
        });
        setTimeout(() => {
            if (!wallet) resolve(undefined);
            else resolve(wallet);
        }, 1500);
    });
};

export const findAllWallets: FindAllMethod<Wallet> = (): Promise<Wallet[]> => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(DB.wallets.entities);
        }, 1500);
    });
};


export const createWallet: CreateMethod<Wallet> = (wallet: Wallet): Promise<Wallet> => {
    return new Promise((resolve, reject) => {
        const walletIndex = DB.wallets.entities.findIndex(w => w.user.id === wallet.user.id);
        if (walletIndex !== -1) reject(new ErrorWithStatus(409, 'There\'s already a Wallet for that user'));
        else {
            wallet.id = DB.wallets.entities.length + 1;
            DB.wallets.entities.push(wallet);
            resolve(wallet);
        }
    });
};

export const deposit: DepositMethod = (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
    return new Promise((resolve, reject) => {
        const wallet = DB.wallets.entities.find(w => w.id === walletId);
        setTimeout(() => {
            if (!wallet) reject(new ErrorWithStatus(404, 'Wallet not found'));
            else {
                const currencyIndex = wallet.balances.findIndex(b => b.currency.id === currency.id);
                if (currencyIndex === -1) reject(new ErrorWithStatus(404, 'Balance not found'));
                else {
                    wallet.balances[currencyIndex].deposits.push({
                        id: wallet.balances[currencyIndex].deposits.length + 1,
                        amount,
                        date: formatDate(new Date()),
                        initialAmount: wallet.balances[currencyIndex].amount,
                        finalAmount: wallet.balances[currencyIndex].amount + amount
                    });
                    wallet.balances[currencyIndex].amount += amount;
                    resolve(wallet);
                }}
        }, 1500);
    });
};

export const withdraw: WithdrawMethod = (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
    return new Promise((resolve, reject) => {
        const wallet = DB.wallets.entities.find(w => w.id === walletId);
        setTimeout(() => {
            if (!wallet) reject(new ErrorWithStatus(404, 'wallet not found'));
            else {
                const currencyIndex = wallet.balances.findIndex(b => b.currency.id === currency.id);
                if (currencyIndex === -1) reject(new ErrorWithStatus(404, 'Balance not found'));
                else {
                    wallet.balances[currencyIndex].withdrawal.push({
                        id: wallet.balances[currencyIndex].withdrawal.length + 1,
                        amount,
                        date: formatDate(new Date()),
                        initialAmount: wallet.balances[currencyIndex].amount,
                        finalAmount: wallet.balances[currencyIndex].amount - amount
                    });
                    wallet.balances[currencyIndex].amount -= amount;
                }
                resolve(wallet);
            }
        });
    });
};

export const addBalance = (walletId: number, balance: Balance): Promise<Wallet> => {
    return new Promise((resolve, reject) => {
        const wallet = DB.wallets.entities.find(w => w.id === walletId);
        setTimeout(() => {
            if (!wallet) reject(new ErrorWithStatus(404, 'wWllet not found'));
            else {
                wallet.balances.push(balance);
                resolve(wallet);
            }
        });
    });
};