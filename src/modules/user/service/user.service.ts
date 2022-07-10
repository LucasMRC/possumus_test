import { injectable } from 'tsyringe';

// Utils
import { ErrorWithStatus } from '@utils/errors';

// Modules
import { Balance, User, UserDTO } from '@modules/user';
import { CurrencyService } from '@modules/currency';
import { UserRepository } from '@modules/user/repository/user.repository';

@injectable()
export class UserService {
    private userRepository: UserRepository;
    private currencyService: CurrencyService;

    constructor(
        userRepository: UserRepository,
        currencyService: CurrencyService
    ) {
        this.userRepository = userRepository;
        this.currencyService = currencyService;
    }

    getUser = async (userId: number): Promise<User> => {
        const user = await this.findById(userId);
        if (!user) throw new ErrorWithStatus(404, `User with id ${userId} not found`);
        return user;
    };

    getAll = async (): Promise<User[]> => {
        return await this.userRepository.findAll();
    };

    create = async (dto: UserDTO): Promise<User> => {
        const newUser = new User(dto.name);
        return await this.userRepository.create(newUser);
    };

    depositCurrency = async (userId: number, amount: number, currencyId: number): Promise<User> => {
        const user = await this.findById(userId);
        if (!user) throw new ErrorWithStatus(404, `User with id ${userId} not found`);

        const currency = await this.currencyService.getOne(currencyId);
        if (!currency) throw new ErrorWithStatus(404, `Currency with id ${currencyId} not found`);
        const balance = user.balance.find(b => b.currency.id === currencyId);
        if (!balance) {
            const newBalance = new Balance(currency, amount);
            return await this.userRepository.addBalance(userId, newBalance);
        } else {
            return await this.userRepository.deposit(userId, amount, currency);
        }
    };

    withdrawCurrency = async (userId: number, amount: number, currencyId: number): Promise<User> => {
        const user = await this.findById(userId);
        if (!user) throw new ErrorWithStatus(404, `User with id ${userId} not found`);

        const currency = await this.currencyService.getOne(currencyId);
        if (!currency) throw new ErrorWithStatus(404, `Currency with id ${currencyId} not found`);

        const balance = user.balance.find(b => b.currency.id === currencyId);
        if (!balance || balance.amount === 0) throw new ErrorWithStatus(400, 'User has no money for this currency');
        else if (balance.amount < amount) throw new ErrorWithStatus(400, `Not enough money, max ${balance.amount} to withdraw`);

        else {
            return await this.userRepository.withdraw(userId, amount, currency);
        }
    };

    private findById = async (userId: number): Promise<User | undefined> => {
        return await this.userRepository.findOne({ property: 'id', value: userId });
    };
}