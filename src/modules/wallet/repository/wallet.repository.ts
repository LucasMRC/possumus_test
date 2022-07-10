import { injectable } from 'tsyringe';

// Config
import { DB } from '@config/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { Currency } from '@modules/currency';
import { Wallet, Balance } from '@modules/wallet';

@injectable()
export class WalletRepository {

    findOne = async (options: FindOneOptions): Promise<Wallet | undefined> => {
        return await DB.wallets.findOne(options);
    };

    findAll = async (): Promise<Wallet[]> => {
        return await DB.wallets.findAll();
    };

    create = async (wallet: Wallet): Promise<Wallet> => {
        return await DB.wallets.create(wallet);
    };

    addBalance = async (walletId: number, balance: Balance): Promise<Wallet> => {
        return await DB.wallets.addBalance(walletId, balance);
    };

    deposit = async (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
        return await DB.wallets.deposit(walletId, amount, currency);
    };

    withdraw = async (walletId: number, amount: number, currency: Currency): Promise<Wallet> => {
        return await DB.wallets.withdraw(walletId, amount, currency);
    };

}
