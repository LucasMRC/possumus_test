import 'reflect-metadata';
import { container } from 'tsyringe';

// Modules
import { WalletDTO, WalletService, MovementDTO } from '@modules/wallet';
import { UserService, UserDTO } from '@modules/user';

jest.setTimeout(100000);

describe('Testing wallets', () => {
    beforeAll(async () => {
        const userService = container.resolve(UserService);
        // Create test user
        const userDto = new UserDTO({ name: 'Tomás', email: 'tomas@possumus.io' });
        await userService.create(userDto);
        container.clearInstances();
    });

    test('Create wallet', async () => {
        const walletService = container.resolve(WalletService);

        const emptyWallets = await walletService.getAll();
        expect(emptyWallets.length).toBe(0);

        // Create wallet for test user
        const newWallet = new WalletDTO({
            userId: 1,
            balances: {
                dollar: 1500
            }
        });
        await walletService.create(newWallet);

        const oneWallet = await walletService.getAll();
        expect(oneWallet.length).toBe(1);

        const tomasWallet = await walletService.getWallet(1);
        expect(tomasWallet.user.name).toBe('Tomás');
        expect(tomasWallet.balances.length).toBe(1);
        expect(tomasWallet.balances[0].amount).toBe(1500);
        expect(tomasWallet.balances[0].deposits.length).toBe(1);
        expect(tomasWallet.balances[0].deposits[0].initialAmount).toBe(0);
        expect(tomasWallet.balances[0].deposits[0].finalAmount).toBe(1500);

        // Fail to create the same wallet twice
        await expect(walletService.create(newWallet))
            .rejects.toThrow(Error);
    });

    test('Deposit', async () => {
        const walletService = container.resolve(WalletService);

        const [ walletId, amount, dollarId ] = [ 1, 1000, 2 ];
        const deposit = new MovementDTO(walletId, amount, dollarId);
        await walletService.depositCurrency(deposit);

        const tomasWallet = await walletService.getWallet(1);
        expect(tomasWallet.user.name).toBe('Tomás');
        expect(tomasWallet.balances.length).toBe(1);
        expect(tomasWallet.balances[0].amount).toBe(2500);
        expect(tomasWallet.balances[0].deposits.length).toBe(2);
        expect(tomasWallet.balances[0].deposits[0].initialAmount).toBe(0);
        expect(tomasWallet.balances[0].deposits[1].initialAmount).toBe(1500);

        // Add new balance
        const euroId = 1;
        const otherDeposit = new MovementDTO(walletId, amount, euroId);
        await walletService.depositCurrency(otherDeposit);

        const tomasWalletAgain = await walletService.getWallet(1);
        expect(tomasWalletAgain.balances.length).toBe(2);
        expect(tomasWallet.balances[0].deposits.length).toBe(2);
        expect(tomasWallet.balances[0].currency.name).toBe('dollar');
        expect(tomasWallet.balances[0].amount).toBe(2500);
        expect(tomasWallet.balances[1].currency.name).toBe('euro');
        expect(tomasWallet.balances[1].amount).toBe(1000);
    });

    test('Withdraw', async () => {
        const walletService = container.resolve(WalletService);

        const [ walletId, amount, dollarId ] = [ 1, 1000, 2 ];
        const withdrawal = new MovementDTO(walletId, amount, dollarId);
        await walletService.withdrawCurrency(withdrawal);

        const tomasWallet = await walletService.getWallet(1);
        expect(tomasWallet.user.name).toBe('Tomás');
        expect(tomasWallet.balances[0].amount).toBe(1500);
        expect(tomasWallet.balances[0].deposits.length).toBe(2);
        expect(tomasWallet.balances[0].withdrawal.length).toBe(1);
        expect(tomasWallet.balances[0].withdrawal[0].initialAmount).toBe(2500);

        // Withdraw from the other balance
        const euroId = 1;
        const otherWithdrawal = new MovementDTO(walletId, amount, euroId);
        await walletService.withdrawCurrency(otherWithdrawal);

        const tomasWalletAgain = await walletService.getWallet(1);
        expect(tomasWalletAgain.balances.length).toBe(2);
        expect(tomasWallet.balances[0].withdrawal.length).toBe(1);
        expect(tomasWallet.balances[1].withdrawal.length).toBe(1);
        expect(tomasWallet.balances[0].currency.name).toBe('dollar');
        expect(tomasWallet.balances[0].amount).toBe(1500);
        expect(tomasWallet.balances[1].currency.name).toBe('euro');
        expect(tomasWallet.balances[1].amount).toBe(0);

        // Fail to withdraw more than the amount available in balance
        await expect(walletService.withdrawCurrency(otherWithdrawal))
            .rejects.toThrow(Error);
    });
});