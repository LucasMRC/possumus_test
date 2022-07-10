import { Router } from 'express';

// Modules
import {
    depositCurrency,
    getUser,
    withdrawCurrency,
    createUser
} from '@modules/user';

const UserRoutes = Router();

UserRoutes.get('/:id', getUser);

UserRoutes.post('/:id/deposit', depositCurrency);

UserRoutes.post('/:id/withdraw', withdrawCurrency);

UserRoutes.post('/', createUser);

export { UserRoutes };
