import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { WalletDTO, WalletService } from '@modules/wallet';

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
        const wallet = await walletService.depositCurrency(Number(walletId), deposit.amount, deposit.currencyId);
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
        const wallet = await walletService.withdrawCurrency(Number(walletId), withdraw.amount, withdraw.currencyId);
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};

export const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    const dto: WalletDTO = req.body;
    const walletService = container.resolve(WalletService);

    try {
        const wallet = await walletService.create(dto);
        res.json(wallet);
    } catch(ex: unknown) {
        next(ex);
    }
};