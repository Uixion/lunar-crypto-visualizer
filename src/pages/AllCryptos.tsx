
import React, { useState } from 'react';
import { CryptoProvider, useCrypto } from '../context/CryptoContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { formatCurrency } from '../utils/formatters';
import { ArrowLeft, ArrowUpDown, Search, TrendingDown, TrendingUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const CryptosList: React.FC = () => {
  const { cryptos, setSelectedCrypto } = useCrypto();
  const [localSearch, setLocalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof cryptos[0] | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'market_cap',
    direction: 'descending',
  });

  const handleSort = (key: keyof typeof cryptos[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptos = React.useMemo(() => {
    const sortableCryptos = [...cryptos];
    if (sortConfig.key !== null) {
      sortableCryptos.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCryptos;
  }, [cryptos, sortConfig]);

  const filteredCryptos = sortedCryptos.filter(
    (crypto) => 
      crypto.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <div className="py-5">
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar ao Dashboard
          </Button>
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar criptomoedas..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10 bg-white/5"
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-3">#</th>
                <th className="text-left py-4 px-3">Moeda</th>
                <th className="text-left py-4 px-3 cursor-pointer" onClick={() => handleSort('current_price')}>
                  <div className="flex items-center">
                    Preço
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-3 cursor-pointer" onClick={() => handleSort('price_change_percentage_24h')}>
                  <div className="flex items-center">
                    24h %
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-3 cursor-pointer" onClick={() => handleSort('market_cap')}>
                  <div className="flex items-center">
                    Cap. de Mercado
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-3 cursor-pointer" onClick={() => handleSort('total_volume')}>
                  <div className="flex items-center">
                    Volume (24h)
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCryptos.map((crypto, index) => (
                <tr 
                  key={crypto.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedCrypto(crypto);
                    window.location.href = '/';
                  }}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-xs text-gray-400">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3">{formatCurrency(crypto.current_price)}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center">
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                      ) : (
                        <TrendingDown size={16} className="text-red-500 mr-1" />
                      )}
                      <span 
                        className={crypto.price_change_percentage_24h >= 0 
                          ? 'text-green-500' 
                          : 'text-red-500'}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3">{formatCurrency(crypto.market_cap, 0, true)}</td>
                  <td className="py-4 px-3">{formatCurrency(crypto.total_volume, 0, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AllCryptos: React.FC = () => {
  return (
    <CryptoProvider>
      <div className="min-h-screen navy-gradient-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <Header />
          
          <div className="flex space-x-6">
            <Sidebar />
            
            <main className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Todas as Criptomoedas</h1>
              <CryptosList />
            </main>
          </div>
        </div>
      </div>
    </CryptoProvider>
  );
};

export default AllCryptos;
