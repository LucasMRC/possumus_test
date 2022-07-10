import {
    Application
} from 'express';

// Routes
import { UserRoutes } from '@routes/user.routes';
import { CurrencyRoutes } from '@routes/currency.routes';
import { WalletRoutes } from '@src/routes/wallet.routes';

export default (app: Application) => {
    app.use('/users', UserRoutes);
    app.use('/currencies', CurrencyRoutes);
    app.use('/wallets', WalletRoutes);
    console.log('🧭 Routes loaded!');
};