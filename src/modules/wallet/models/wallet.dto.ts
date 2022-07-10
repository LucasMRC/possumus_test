import { ErrorWithStatus } from '@src/utils';

type BalanceDTO = {
    [key: string]: number;
};
export class WalletDTO {
    constructor({ userId, balances }: { userId: number; balances: BalanceDTO }) {
        if (!userId) throw new ErrorWithStatus(400, 'Wallet\'s user id is required');
        if (!balances || !Object.keys(balances).length) throw new ErrorWithStatus(400, 'At least one wallet balance is required');
        this.userId = userId;
        this.balances = balances;
    }

    userId: number;
    balances: BalanceDTO;
}

export class MovementDTO {
    constructor(walletId: number, amount: number, currencyId: number) {
        if (!walletId) throw new ErrorWithStatus(400, 'Wallet id is required');
        if (!amount) throw new ErrorWithStatus(400, 'Amount is required');
        if (!currencyId) throw new ErrorWithStatus(400, 'Currency id is required');
        this.walletId = walletId;
        this.amount = amount;
        this.currencyId = currencyId;
    }
    walletId: number;
    amount: number;
    currencyId: number;
}