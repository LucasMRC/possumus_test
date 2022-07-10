import { Router } from 'express';

// Modules
import {
    depositCurrency,
    getWallet,
    withdrawCurrency,
    createWallet,
    getAll
} from '@modules/wallet';

const WalletRoutes = Router();

WalletRoutes.get('/:id', getWallet);

WalletRoutes.get('/', getAll);

WalletRoutes.post('/:id/deposit', depositCurrency);

WalletRoutes.post('/:id/withdraw', withdrawCurrency);

WalletRoutes.post('/', createWallet);

export { WalletRoutes };
