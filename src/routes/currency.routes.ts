import { Router } from 'express';

// Modules
import { getCurrency, createCurrency, getAll } from '@modules/currency';

const CurrencyRoutes = Router();

CurrencyRoutes.get('/:id', getCurrency);

CurrencyRoutes.get('/', getAll);

CurrencyRoutes.post('/', createCurrency);

export { CurrencyRoutes };
