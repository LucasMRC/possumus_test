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
    findAllCurrencies,
    findOneWallet,
    findAllWallets,
    createWallet
} from '@config/database/methods';

// Modules
import { Currency } from '@modules/currency';
import { User } from '@modules/user';
import { Wallet } from '@modules/wallet';

interface DBI {
    users: {
        entities: User[];
        findOne: FindMethod<User>;
        create: CreateMethod<User>;
        findAll: FindAllMethod<User>;
    }
    currencies: {
        entities: Currency[];
        findOne: FindMethod<Currency>;
        create: CreateMethod<Currency>,
        findAll: FindAllMethod<Currency>;
    },
    wallets: {
        entities: Wallet[];
        findOne: FindMethod<Wallet>;
        deposit: DepositMethod;
        withdraw: WithdrawMethod;
        addBalance: AddBalanceMethod;
        create: CreateMethod<Wallet>;
        findAll: FindAllMethod<Wallet>;
    }
}

export const DB: DBI = {
    users: {
        entities: [],
        findOne: findOneUser,
        create: createUser,
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
                name: 'usdt'
            }
        ],
        findOne: findOneCurrency,
        create: createCurrency,
        findAll: findAllCurrencies
    },
    wallets: {
        entities: [],
        findOne: findOneWallet,
        create: createWallet,
        deposit,
        withdraw,
        addBalance,
        findAll: findAllWallets
    }
};
