import { injectable } from 'tsyringe';

// Config
import { DB as DevDB } from '@config/database';
import { DB as TestDB } from '@tests/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { User } from '@modules/user';
import { Wallet } from '@modules/wallet';

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

    findWallet = async (userId: number): Promise<Wallet | undefined> => {
        return await DATABASE.wallets.findOne({ property: 'userId', value: userId });
    };

}
