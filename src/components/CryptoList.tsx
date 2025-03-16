
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import CryptoCard from './CryptoCard';

const CryptoList: React.FC = () => {
  const { cryptos, isLoading, selectedCrypto, setSelectedCrypto } = useCrypto();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="crypto-card h-48 shimmer-effect"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
      {cryptos.map((crypto) => (
        <CryptoCard 
          key={crypto.id} 
          crypto={crypto} 
          onClick={() => setSelectedCrypto(crypto)}
          isSelected={selectedCrypto?.id === crypto.id}
        />
      ))}
    </div>
  );
};

export default CryptoList;
