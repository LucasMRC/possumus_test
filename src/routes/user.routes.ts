import { Router } from 'express';

// Modules
import {
    getUser,
    createUser,
    getAll
} from '@modules/user';

const UserRoutes = Router();

UserRoutes.get('/:id', getUser);

UserRoutes.get('/', getAll);

UserRoutes.post('/', createUser);

export { UserRoutes };
