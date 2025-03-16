
/**
 * Formata um número como moeda
 * @param value Número para formatar
 * @param decimals Número de casas decimais
 * @param compact Se deve compactar números grandes (ex: 1,2B)
 * @returns String formatada
 */
export const formatCurrency = (
  value: number, 
  decimals: number = 2,
  compact: boolean = false
): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
    compactDisplay: 'short'
  });
  
  // Para valores muito pequenos como em criptomoedas
  if (value < 0.01 && value > 0) {
    return 'R$' + value.toFixed(6);
  }
  
  return formatter.format(value);
};

/**
 * Formata um número grande com vírgulas
 * @param value Número para formatar
 * @returns String formatada
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

/**
 * Destaca texto de pesquisa em uma string
 * @param text Texto a ser verificado
 * @param query Termo de pesquisa
 * @returns JSX com destaque para o termo pesquisado
 */
export const highlightSearchMatch = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? <span key={i} className="bg-yellow-500/30">{part}</span> : part
  );
};
