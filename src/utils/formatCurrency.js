/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol or code (default: '₸')
 * @return {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = '₸') => {
    return `${amount.toLocaleString()} ${currency}`;
  };