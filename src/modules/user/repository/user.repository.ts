import { injectable } from 'tsyringe';

// Config
import { DB } from '@config/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { Balance, User } from '@modules/user';
import { Currency } from '@modules/currency';

@injectable()
export class UserRepository {

    findOne = async (options: FindOneOptions): Promise<User | undefined> => {
        return await DB.users.findOne(options);
    };

    create = async (user: User): Promise<User> => {
        return await DB.users.create(user);
    };

    addBalance = async (userId: number, balance: Balance): Promise<User> => {
        return await DB.users.addBalance(userId, balance);
    };

    deposit = async (userId: number, amount: number, currency: Currency): Promise<User> => {
        return await DB.users.deposit(userId, amount, currency);
    };

    withdraw = async (userId: number, amount: number, currency: Currency): Promise<User> => {
        return await DB.users.withdraw(userId, amount, currency);
    };

}
