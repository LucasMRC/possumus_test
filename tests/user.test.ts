import 'reflect-metadata';
import { container } from 'tsyringe';

// Modules
import { UserService, UserDTO } from '@modules/user';

describe('Testing users', () => {
    test('Create users', async () => {
        const userService = container.resolve(UserService);

        const emptyUsers = await userService.getAll();
        expect(emptyUsers.length).toBe(0);

        // Create new user
        const newUser = new UserDTO({ name: 'Tomás', email: 'tomas@possumus.io' });
        await userService.create(newUser);

        const oneUser = await userService.getAll();
        expect(oneUser.length).toBe(1);
        expect(oneUser[0].name).toBe('Tomás');

        // Create aother user
        const anotherUser = new UserDTO({ name: 'Lucas', email: 'lucas@possumus.io' });
        await userService.create(anotherUser);

        const twoUsers = await userService.getAll();
        expect(twoUsers.length).toBe(2);
        expect(twoUsers[0].name).toBe('Tomás');
        expect(twoUsers[1].name).toBe('Lucas');

        // Fail to create the same user twice
        await expect(userService.create(newUser))
            .rejects.toThrow(Error);
    });
});