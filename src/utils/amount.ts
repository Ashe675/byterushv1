export const formatAmount = (amount : number) => {
    return amount.toLocaleString('en-US', {
        style : 'currency',
        currency : 'USD'
    })
}

export const formatAmountToHNL = (amount: string | number): string => {
  const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericValue)) return 'Invalid amount';

  return numericValue.toLocaleString('es-HN', {
    style: 'currency',
    currency: 'HNL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};