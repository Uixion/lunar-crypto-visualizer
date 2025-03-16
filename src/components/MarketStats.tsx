
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import { formatCurrency } from '../utils/formatters';
import { BarChart3, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketStats: React.FC = () => {
  const { cryptos, isLoading } = useCrypto();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card h-24 rounded-2xl shimmer-effect"></div>
        ))}
      </div>
    );
  }
  
  // Calculate market stats
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
  const totalVolume = cryptos.reduce((sum, crypto) => sum + crypto.total_volume, 0);
  
  // Calculate average 24h change
  const avgChange = cryptos.reduce((sum, crypto) => sum + crypto.price_change_percentage_24h, 0) / cryptos.length;
  const isPositiveAvgChange = avgChange >= 0;
  
  const stats = [
    {
      title: 'Total Market Cap',
      value: formatCurrency(totalMarketCap, 0, true),
      icon: <BarChart3 className="h-6 w-6 text-crypto-accent" />,
      color: 'from-crypto-accent/20 to-crypto-accent/5',
      pulsate: true
    },
    {
      title: '24h Trading Volume',
      value: formatCurrency(totalVolume, 0, true),
      icon: <Wallet className="h-6 w-6 text-crypto-binance" />,
      color: 'from-crypto-binance/20 to-crypto-binance/5',
      pulsate: false
    },
    {
      title: 'Average 24h Change',
      value: `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(2)}%`,
      icon: isPositiveAvgChange 
        ? <TrendingUp className="h-6 w-6 text-green-400 animate-bounce" /> 
        : <TrendingDown className="h-6 w-6 text-red-400 animate-bounce" />,
      color: isPositiveAvgChange 
        ? 'from-green-500/20 to-green-500/5' 
        : 'from-red-500/20 to-red-500/5',
      textColor: isPositiveAvgChange ? 'text-green-400' : 'text-red-400',
      borderColor: isPositiveAvgChange ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400',
      glow: isPositiveAvgChange ? 'shadow-[0_0_15px_rgba(52,211,153,0.2)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.2)]'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={cn(
            "glass-card rounded-2xl p-5 animate-fade-in transition-all duration-300",
            stat.borderColor || "",
            stat.glow || "",
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">{stat.title}</h3>
            <div className={cn(
              "p-2 rounded-full bg-gradient-to-b",
              stat.color,
              stat.pulsate ? "animate-pulse" : ""
            )}>
              {stat.icon}
            </div>
          </div>
          <p className={`text-2xl font-bold ${stat.textColor || 'text-white'}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
