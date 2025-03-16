
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import { formatCurrency } from '../utils/formatters';

const SearchResults: React.FC = () => {
  const { filteredCryptos, setSelectedCrypto, setIsSearching, setSearchTerm } = useCrypto();

  if (filteredCryptos.length === 0) {
    return (
      <div className="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-lg rounded-lg p-2 animate-fade-in z-10">
        <p className="text-center text-gray-400 p-4">Nenhuma criptomoeda encontrada</p>
      </div>
    );
  }

  const handleSelectCrypto = (crypto: any) => {
    setSelectedCrypto(crypto);
    setIsSearching(false);
    setSearchTerm('');
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden animate-fade-in z-10 max-h-[300px] overflow-y-auto">
      {filteredCryptos.map((crypto) => (
        <div
          key={crypto.id}
          className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors"
          onClick={() => handleSelectCrypto(crypto)}
        >
          <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
          <div className="flex-1">
            <h4 className="font-medium">{crypto.name}</h4>
            <p className="text-xs text-gray-400">{crypto.symbol.toUpperCase()}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(crypto.current_price)}</p>
            <p 
              className={`text-xs ${crypto.price_change_percentage_24h >= 0 
                ? 'text-green-500' 
                : 'text-red-500'}`}
            >
              {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
