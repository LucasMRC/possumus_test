import { injectable } from 'tsyringe';

// Config
import { DB } from '@config/database';
import { FindOneOptions } from '@config/database/methods';

// Modules
import { Currency } from '@modules/currency';

@injectable()
export class CurrencyRepository {

    findOne = async (options: FindOneOptions): Promise<Currency | undefined> => {
        return await DB.currencies.findOne(options);
    };

    create = async (currency: Currency): Promise<Currency> => {
        return await DB.currencies.create(currency);
    };

}