import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { WalletDTO, WalletService, MovementDTO } from '@modules/wallet';

export const getWallet = async (req: Request, res: Response, next: NextFunction) => {
    const walletId = req.params.id;
    const walletService = container.resolve(WalletService);

    try {
        const wallet = await walletService.getWallet(Number(walletId));
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const walletService = container.resolve(WalletService);

    try {
        const wallets = await walletService.getAll();
        res.json(wallets);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const depositCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const deposit = req.body;
    const walletId = req.params.id;
    const walletService = container.resolve(WalletService);

    try {
        const dto = new MovementDTO(Number(walletId), deposit.amount, deposit.currencyId);
        const wallet = await walletService.depositCurrency(dto);
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const withdrawCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const withdraw = req.body;
    const walletId = req.params.id;
    const walletService = container.resolve(WalletService);

    try {
        const dto = new MovementDTO(Number(walletId), withdraw.amount, withdraw.currencyId);
        const wallet = await walletService.withdrawCurrency(dto);
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    const walletService = container.resolve(WalletService);

    try {
        const dto: WalletDTO = new WalletDTO(req.body);
        const wallet = await walletService.create(dto);
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};