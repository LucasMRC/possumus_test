import { injectable } from 'tsyringe';

// Config
import { DB as DevDB } from '@config/database';
import { DB as TestDB } from '@tests/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { Currency } from '@modules/currency';
import { Wallet, Balance } from '@modules/wallet';

// Set up database
const DATABASE = process.env.NODE_ENV === 'testing'
    ? TestDB
    : DevDB;

@injectable()
export class WalletRepository {

    findOne = async (options: FindOneOptions): Promise<Wallet | undefined> => {
        return await DATABASE.wallets.findOne(options);
    };

    findAll = async (): Promise<Wallet[]> => {
        return await DATABASE.wallets.findAll();
    };

    create = async (wallet: Wallet): Promise<Wallet> => {
        return await DATABASE.wallets.create(wallet);
    };

    addBalance = async (walletId: number, balance: Balance): Promise<Wallet> => {
        return await DATABASE.wallets.addBalance(walletId, balance);
    };

    deposit = async (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
        return await DATABASE.wallets.deposit(walletId, amount, currency);
    };

    withdraw = async (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
        return await DATABASE.wallets.withdraw(walletId, amount, currency);
    };

}
