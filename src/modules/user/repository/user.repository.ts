import { injectable } from 'tsyringe';

// Config
import { DB } from '@config/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { User } from '@modules/user';
import { Wallet } from '@modules/wallet';

@injectable()
export class UserRepository {

    findOne = async (options: FindOneOptions): Promise<User | undefined> => {
        return await DB.users.findOne(options);
    };

    findAll = async (): Promise<User[]> => {
        return await DB.users.findAll();
    };

    create = async (user: User): Promise<User> => {
        return await DB.users.create(user);
    };

    findWallet = async (userId: number): Promise<Wallet | undefined> => {
        return await DB.wallets.findOne({ property: 'userId', value: userId });
    };

}
