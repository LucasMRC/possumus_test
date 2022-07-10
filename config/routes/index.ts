import {
    Application
} from 'express';

// Routes
import { UserRoutes } from '@routes/user.routes';
import { CurrencyRoutes } from '@routes/currency.routes';

export default (app: Application) => {
    app.use('/users', UserRoutes);
    app.use('/currencies', CurrencyRoutes);
    console.log('🧭 Routes loaded!');
};