// Methods
import {
    findOneUser,
    findOneCurrency,
    withdraw,
    deposit,
    FindMethod,
    DepositMethod,
    WithdrawMethod,
    addBalance,
    AddBalanceMethod,
    createCurrency,
    CreateMethod,
    createUser,
    FindAllMethod,
    findAllUsers,
    findAllCurrencies
} from '@config/database/methods';

// Modules
import { Currency } from '@modules/currency';
import { User } from '@modules/user';

interface DBI {
    users: {
        entities: User[];
        findOne: FindMethod<User>;
        deposit: DepositMethod;
        withdraw: WithdrawMethod;
        addBalance: AddBalanceMethod;
        create: CreateMethod<User>;
        findAll: FindAllMethod<User>;
    }
    currencies: {
        entities: Currency[];
        findOne: FindMethod<Currency>;
        create: CreateMethod<Currency>,
        findAll: FindAllMethod<Currency>;
    }
}

export const DB: DBI = {
    users: {
        entities: [],
        findOne: findOneUser,
        create: createUser,
        deposit,
        withdraw,
        addBalance,
        findAll: findAllUsers
    },
    currencies: {
        entities: [
            {
                id: 1,
                name: 'euro'
            },
            {
                id: 2,
                name: 'dollar'
            },
            {
                id: 3,
                name: 'USDT'
            }
        ],
        findOne: findOneCurrency,
        create: createCurrency,
        findAll: findAllCurrencies
    }
};
