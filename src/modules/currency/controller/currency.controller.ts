import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { CurrencyService, CurrencyDTO } from '@modules/currency';

export const getCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const currencyId = req.params.id;
    const currencyService = container.resolve(CurrencyService);

    try {
        const currency = await currencyService.getOne(Number(currencyId));
        res.json(currency);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const currencyService = container.resolve(CurrencyService);

    try {
        const currencies = await currencyService.getAll();
        res.json(currencies);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const createCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const dto: CurrencyDTO = req.body;
    const currencyService = container.resolve(CurrencyService);

    try {
        const currency = await currencyService.create(dto);
        res.json(currency);
    } catch(ex: unknown) {
        next(ex);
    }
};