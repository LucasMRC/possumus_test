import { injectable } from 'tsyringe';

// Config
import { DB as DevDB } from '@config/database';
import { DB as TestDB } from '@tests/database';
import { FindOneOptions } from '@config/database/methods';


// Modules
import { Currency } from '@modules/currency';

// Set up database
const DATABASE = process.env.NODE_ENV === 'testing'
    ? TestDB
    : DevDB;
@injectable()
export class CurrencyRepository {

    findOne = async (options: FindOneOptions): Promise<Currency | undefined> => {
        return await DATABASE.currencies.findOne(options);
    };

    findAll = async (): Promise<Currency[]> => {
        return await DATABASE.currencies.findAll();
    };

    create = async (currency: Currency): Promise<Currency> => {
        return await DATABASE.currencies.create(currency);
    };

}