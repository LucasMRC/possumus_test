import { Router } from 'express';

// Modules
import {
    getUser,
    createUser,
    getAll,
    getUsersWallet
} from '@modules/user';

const UserRoutes = Router();

UserRoutes.get('/:id', getUser);

UserRoutes.get('/:id/wallet', getUsersWallet);

UserRoutes.get('/', getAll);

UserRoutes.post('/', createUser);

export { UserRoutes };
