import { injectable } from 'tsyringe';

// Utils
import { ErrorWithStatus } from '@utils/errors';

// Modules
import { User, UserDTO } from '@modules/user';
import { CurrencyService } from '@modules/currency';
import { UserRepository } from '@modules/user/repository/user.repository';
import { Wallet } from '@modules/wallet';

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
        return await this.findById(userId);
    };

    getAll = async (): Promise<User[]> => {
        return await this.userRepository.findAll();
    };

    create = async (dto: UserDTO): Promise<User> => {
        const newUser = new User(dto.name, dto.email);
        return await this.userRepository.create(newUser);
    };

    getUsersWallet = async (userId: number): Promise<Wallet> => {
        await this.findById(userId);
        const wallet = await this.userRepository.findWallet(userId);
        if (!wallet) throw new ErrorWithStatus(404, `Wallet with userId ${userId} not found`);
        return wallet;
    };

    private findById = async (userId: number): Promise<User> => {
        const user = await this.userRepository.findOne({ property: 'id', value: userId });
        if (!user) throw new ErrorWithStatus(404, `User with id ${userId} not found`);
        return user;
    };
}