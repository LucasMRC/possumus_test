export class ErrorWithStatus extends Error {
    constructor(status: number, message: string) {
        super();
        this.message = message;
        this.status = status;
    }

    status: number;
}