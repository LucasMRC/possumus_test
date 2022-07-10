import { Router } from 'express';

// Modules
import { getCurrency, createCurrency } from '@modules/currency';

const CurrencyRoutes = Router();

CurrencyRoutes.get('/:id', getCurrency);

CurrencyRoutes.post('/', createCurrency);

export { CurrencyRoutes };
