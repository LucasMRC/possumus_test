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

export const depositCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const deposit = req.body;
    const userId = req.params.id;
    const userService = container.resolve(UserService);

    try {
        const user = await userService.depositCurrency(Number(userId), deposit.amount, deposit.currencyId);
        res.json(user);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const withdrawCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const withdraw = req.body;
    const userId = req.params.id;
    const userService = container.resolve(UserService);

    try {
        const user = await userService.withdrawCurrency(Number(userId), withdraw.amount, withdraw.currencyId);
        res.json(user);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const dto: UserDTO = req.body;
    const userService = container.resolve(UserService);

    try {
        const user = await userService.create(dto);
        res.json(user);
    } catch(ex: unknown) {
        next(ex);
    }
};