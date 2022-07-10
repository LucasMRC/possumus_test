import { Currency } from '@modules/currency';

export class Balance {
    constructor(currency: Currency, amount: number) {
        this.currency = currency;
        this.amount = amount;
        this.deposits = [
            {
                id: 1,
                amount,
                date: new Date(),
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
    date: Date;
    initialAmount: number;
    finalAmount: number;
}

export class User {
    constructor(name: string) {
        this.name = name;
    }

    id?: number;
    name: string;
    balance: Balance[] = [];
}