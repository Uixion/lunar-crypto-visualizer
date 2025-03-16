
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CryptoContextType, CryptoData, TimeRange } from '../types/crypto';

// Sample mockup data
const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 59842.37,
    price_change_percentage_24h: 2.53,
    market_cap: 1172808999946,
    total_volume: 29949099277,
    circulating_supply: 19600000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    sparkline: [59532, 59678, 59780, 59842, 60011, 59900, 59842, 59950, 60100, 60050, 59842],
    color: '#F7931A'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 3112.86,
    price_change_percentage_24h: 1.82,
    market_cap: 373973602294,
    total_volume: 14927077521,
    circulating_supply: 120000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    sparkline: [3080, 3090, 3075, 3095, 3110, 3105, 3100, 3115, 3125, 3120, 3112],
    color: '#627EEA'
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    current_price: 553.71,
    price_change_percentage_24h: -0.43,
    market_cap: 85297199671,
    total_volume: 1487498983,
    circulating_supply: 154000000,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    sparkline: [556, 555, 554, 553, 552, 551, 550, 551, 552, 553, 554],
    color: '#F0B90B'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    current_price: 137.22,
    price_change_percentage_24h: 5.68,
    market_cap: 59520929542,
    total_volume: 2876059025,
    circulating_supply: 433000000,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    sparkline: [130, 131, 132, 133, 134, 135, 136, 137, 136, 136.5, 137],
    color: '#14F195'
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    current_price: 0.5071,
    price_change_percentage_24h: -1.24,
    market_cap: 28086465204,
    total_volume: 1063476818,
    circulating_supply: 55000000000,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    sparkline: [0.512, 0.51, 0.509, 0.508, 0.507, 0.506, 0.505, 0.506, 0.507, 0.508, 0.507],
    color: '#23292F'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    current_price: 0.4528,
    price_change_percentage_24h: 0.92,
    market_cap: 15993669507,
    total_volume: 338223147,
    circulating_supply: 35300000000,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    sparkline: [0.448, 0.449, 0.45, 0.451, 0.452, 0.453, 0.452, 0.451, 0.452, 0.453, 0.453],
    color: '#3CC8C8'
  },
];

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>(mockCryptoData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(mockCryptoData[0]);
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Simulate data fetching
  useEffect(() => {
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setCryptos(mockCryptoData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Search functionality
  const filteredCryptos = searchTerm.trim() !== '' 
    ? cryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <CryptoContext.Provider
      value={{
        cryptos,
        isLoading,
        selectedCrypto,
        setSelectedCrypto,
        timeRange,
        setTimeRange,
        searchTerm,
        setSearchTerm,
        isSearching,
        setIsSearching,
        filteredCryptos,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
