export class User {
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    id?: number;
    name: string;
    email: string;
}