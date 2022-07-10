import { injectable } from 'tsyringe';

// Utils
import { ErrorWithStatus } from '@utils/errors';

// Modules
import { Wallet, Balance, WalletDTO } from '@modules/wallet';
import { CurrencyService } from '@modules/currency';
import { WalletRepository } from '../repository/wallet.repository';
import { UserService } from '@modules/user';

@injectable()
export class WalletService {
    private walletRepository: WalletRepository;
    private currencyService: CurrencyService;
    private userService: UserService;

    constructor(
        walletRepository: WalletRepository,
        currencyService: CurrencyService,
        userService: UserService
    ) {
        this.walletRepository = walletRepository;
        this.currencyService = currencyService;
        this.userService = userService;
    }

    getWallet = async (walletId: number): Promise<Wallet> => {
        const wallet = await this.findById(walletId);
        return wallet;
    };

    getAll = async (): Promise<Wallet[]> => {
        return await this.walletRepository.findAll();
    };

    create = async (dto: WalletDTO): Promise<Wallet> => {
        const user = await this.userService.getUser(dto.userId);
        const balances: Balance[] = [];

        for (const [ currencyName, amount ] of Object.entries(dto.balances)) {
            const currency = await this.currencyService.getByName(currencyName);
            const newBalance = new Balance(currency, amount);
            balances.push(newBalance);
        }

        const newWallet = new Wallet(user, balances);
        return await this.walletRepository.create(newWallet);
    };

    depositCurrency = async (walletId: number, amount: number, currencyId: number): Promise<Wallet> => {
        const wallet = await this.findById(walletId);
        if (!wallet) throw new ErrorWithStatus(404, `Wallet with id ${walletId} not found`);

        const currency = await this.currencyService.getById(currencyId);
        const balance = wallet.balances.find(b => b.currency.id === currencyId);
        if (!balance) {
            const newBalance = new Balance(currency, amount);
            return await this.walletRepository.addBalance(walletId, newBalance);
        } else {
            return await this.walletRepository.deposit(walletId, amount, currency);
        }
    };

    withdrawCurrency = async (walletId: number, amount: number, currencyId: number): Promise<Wallet> => {
        const wallet = await this.findById(walletId);
        if (!wallet) throw new ErrorWithStatus(404, `Wallet with id ${walletId} not found`);

        const currency = await this.currencyService.getById(currencyId);
        if (!currency) throw new ErrorWithStatus(404, `Currency with id ${currencyId} not found`);

        const balance = wallet.balances.find(b => b.currency.id === currencyId);
        if (!balance || balance.amount === 0) throw new ErrorWithStatus(400, 'Wallet has no money for this currency');
        else if (balance.amount < amount) throw new ErrorWithStatus(400, `Not enough money, max ${balance.amount} to withdraw`);

        else {
            return await this.walletRepository.withdraw(walletId, amount, currency);
        }
    };

    private findByUser = async (userId: number): Promise<Wallet> => {
        const wallet = await this.walletRepository.findOne({ property: 'userId', value: userId });
        if (!wallet) throw new ErrorWithStatus(404, `There's no wallet for user with id ${userId}`);
        return wallet;
    };

    private findById = async (id: number): Promise<Wallet> => {
        const wallet = await this.walletRepository.findOne({ property: 'id', value: id });
        if (!wallet) throw new ErrorWithStatus(404, `Wallet with id ${id} not found`);
        return wallet;
    };

}