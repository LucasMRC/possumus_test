const currencyFormatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
});

export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const formatAmount = (amount: number): string => {
    return currencyFormatter.format(amount).replace('$', '');
};