
/**
 * Format a number as currency
 * @param value Number to format
 * @param decimals Number of decimal places
 * @param compact Whether to compact large numbers (e.g., 1.2B)
 * @returns Formatted string
 */
export const formatCurrency = (
  value: number, 
  decimals: number = 2,
  compact: boolean = false
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
    compactDisplay: 'short'
  });
  
  // For very small values like in cryptocurrencies
  if (value < 0.01 && value > 0) {
    return '$' + value.toFixed(6);
  }
  
  return formatter.format(value);
};

/**
 * Format a large number with commas
 * @param value Number to format
 * @returns Formatted string
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};
