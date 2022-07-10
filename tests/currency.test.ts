import 'reflect-metadata';
import { container } from 'tsyringe';

// Modules
import { CurrencyDTO, CurrencyService } from '@modules/currency';

describe('Test currency', () => {
    test('Create currencies', async () => {
        const currencyService = container.resolve(CurrencyService);

        const baseCurrencies = await currencyService.getAll();
        expect(baseCurrencies.length).toBe(3);

        // Create new currency
        const newCurrency = new CurrencyDTO({ name: 'BTC' });
        await currencyService.create(newCurrency);

        const fourCurrency = await currencyService.getAll();
        expect(fourCurrency.length).toBe(4);
        expect(fourCurrency[3].name).toBe('btc'); // name is lowercase

        // Create aother currency
        const anotherCurrency = new CurrencyDTO({ name: 'Peso' });
        await currencyService.create(anotherCurrency);

        const fiveCurrencies = await currencyService.getAll();
        expect(fiveCurrencies.length).toBe(5);
        expect(fiveCurrencies[3].name).toBe('btc');
        expect(fiveCurrencies[4].name).toBe('peso'); // name is lowercase

        // Fail to create the same currency twice
        await expect(currencyService.create(newCurrency))
            .rejects.toThrow(Error);
    });
});