import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { UserDTO, UserService } from '@modules/user';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const userService = container.resolve(UserService);

    try {
        const user = await userService.getUser(Number(userId));
        res.json(user);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const userService = container.resolve(UserService);

    try {
        const users = await userService.getAll();
        res.json(users);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userService = container.resolve(UserService);

    try {
        const dto: UserDTO = new UserDTO(req.body);
        const user = await userService.create(dto);
        res.json(user);
    } catch(ex: unknown) {
        next(ex);
    }
};