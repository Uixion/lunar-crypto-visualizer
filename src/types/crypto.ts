
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  image: string;
  sparkline: number[];
  color: string;
}

export interface CryptoContextType {
  cryptos: CryptoData[];
  isLoading: boolean;
  selectedCrypto: CryptoData | null;
  setSelectedCrypto: (crypto: CryptoData | null) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

export type TimeRange = '1D' | '7D' | '1M' | '3M' | '1Y';
