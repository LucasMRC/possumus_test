export interface WalletDTO {
    userId: number;
    balances: {
        [key: string]: number;
    }
}