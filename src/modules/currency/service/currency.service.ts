import { injectable } from 'tsyringe';

// Modules
import {
    Currency,
    CurrencyDTO
} from '@modules/currency';
import { CurrencyRepository } from '@modules/currency/repository/currency.repository';

@injectable()
export class CurrencyService {

    private currencyRepository: CurrencyRepository;

    constructor(currencyRepository: CurrencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    getOne = async (id: number): Promise<Currency | undefined> => {
        return await this.findByProperty('id', id);
    };

    create = async (dto: CurrencyDTO): Promise<Currency> => {
        const newCurrency = new Currency(dto.name);

        return await this.currencyRepository.create(newCurrency);
    };

    private findByProperty = async (property: string, value: unknown): Promise<Currency | undefined> => {
        return await this.currencyRepository.findOne({ property, value });
    };
}