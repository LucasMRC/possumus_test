import { ErrorWithStatus } from '@src/utils';

export class CurrencyDTO {
    constructor({ name }: { name: string }) {
        if (!name) throw new ErrorWithStatus(400, 'Currency name is required');
        this.name = name;
    }

    name: string;
}