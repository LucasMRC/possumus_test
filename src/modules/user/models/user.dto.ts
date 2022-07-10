import { ErrorWithStatus } from '@src/utils';

export class UserDTO {
    constructor({ name, email }: { name: string; email: string }) {
        if (!name) throw new ErrorWithStatus(400, 'User name is required');
        if (!email) throw new ErrorWithStatus(400, 'User email is required');
        this.name = name;
        this.email = email;
    }

    name: string;
    email: string;
}