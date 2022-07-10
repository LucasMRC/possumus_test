import { injectable } from 'tsyringe';

// Config
import { DB as DevDB } from '@config/database';
import { DB as TestDB } from '@tests/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { Balance, User } from '@modules/user';
import { Currency } from '@modules/currency';

// Set up database
const DATABASE = process.env.NODE_ENV === 'testing'
    ? TestDB
    : DevDB;

@injectable()
export class UserRepository {

    findOne = async (options: FindOneOptions): Promise<User | undefined> => {
        return await DATABASE.users.findOne(options);
    };

    findAll = async (): Promise<User[]> => {
        return await DATABASE.users.findAll();
    };

    create = async (user: User): Promise<User> => {
        return await DATABASE.users.create(user);
    };

    addBalance = async (userId: number, balance: Balance): Promise<User> => {
        return await DATABASE.users.addBalance(userId, balance);
    };

    deposit = async (userId: number, amount: number, currency: Currency): Promise<User> => {
        return await DATABASE.users.deposit(userId, amount, currency);
    };

    withdraw = async (userId: number, amount: number, currency: Currency): Promise<User> => {
        return await DATABASE.users.withdraw(userId, amount, currency);
    };

}
