// Modules
import { User } from '@modules/user';
import { Currency } from '@modules/currency';

// Utils
import { formatDate } from '@utils/formatters';

export class Wallet {
    constructor(user: User, balances: Balance[]) {
        this.user = user;
        this.balances = balances;
    }

    id?: number;
    user: User;
    balances: Balance[];
}

export class Balance {
    constructor(currency: Currency, amount: number) {
        this.currency = currency;
        this.amount = amount;
        this.deposits = [
            {
                id: 1,
                amount,
                date: formatDate(new Date()),
                initialAmount: 0,
                finalAmount: amount
            }
        ];
    }

    currency: Currency;
    amount: number;
    deposits: Movement[];
    withdrawal: Movement[] = [];
}

export interface Movement {
    id: number;
    amount: number;
    date: string;
    initialAmount: number;
    finalAmount: number;
}
