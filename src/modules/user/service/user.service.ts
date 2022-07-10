import { injectable } from 'tsyringe';

// Utils
import { ErrorWithStatus } from '@utils/errors';

// Modules
import { User, UserDTO } from '@modules/user';
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

    private findById = async (userId: number): Promise<User | undefined> => {
        return await this.userRepository.findOne({ property: 'id', value: userId });
    };
}