import { injectable } from 'tsyringe';

// Modules
import {
    Currency,
    CurrencyDTO
} from '@modules/currency';
import { CurrencyRepository } from '@modules/currency/repository/currency.repository';

// Modules
import { ErrorWithStatus } from '@src/utils';

@injectable()
export class CurrencyService {

    private currencyRepository: CurrencyRepository;

    constructor(currencyRepository: CurrencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    getById = async (id: number): Promise<Currency> => {
        return await this.findByProperty('id', id);
    };

    getByName = async (name: string): Promise<Currency> => {
        return await this.findByProperty('name', name);
    };

    getAll = async (): Promise<Currency[]> => {
        return await this.currencyRepository.findAll();
    };

    create = async (dto: CurrencyDTO): Promise<Currency> => {
        const newCurrency = new Currency(dto.name);

        return await this.currencyRepository.create(newCurrency);
    };

    private findByProperty = async (property: string, value: unknown): Promise<Currency> => {
        const currency = await this.currencyRepository.findOne({ property, value });
        if (!currency) throw new ErrorWithStatus(404, `Currency with ${property} ${value} not found`);
        else return currency;
    };
}