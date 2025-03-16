
import React from 'react';
import { CryptoData } from '../types/crypto';
import { formatCurrency } from '../utils/formatters';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface CryptoCardProps {
  crypto: CryptoData;
  onClick: () => void;
  isSelected: boolean;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, onClick, isSelected }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const chartData = crypto.sparkline.map((price, index) => ({ price, index }));

  return (
    <div 
      className={cn(
        "crypto-card cursor-pointer animate-fade-in opacity-0",
        isSelected && "ring-2 ring-crypto-accent/50"
      )}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.image} 
            alt={crypto.name} 
            className="w-10 h-10 rounded-full object-contain bg-white/5 p-1"
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-lg">{crypto.name}</h3>
            <span className="text-sm text-gray-400">{crypto.symbol}</span>
          </div>
        </div>
        <div 
          className={cn(
            "flex items-center gap-1 font-medium text-sm px-2 py-1 rounded-full",
            isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          )}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isPositive ? "+" : ""}{crypto.price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="h-20 mb-3 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={crypto.color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={crypto.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={crypto.color}
              strokeWidth={2}
              fill={`url(#gradient-${crypto.id})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-baseline">
        <span className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</span>
        <span className="text-sm text-gray-400">Market Cap: {formatCurrency(crypto.market_cap, 0, true)}</span>
      </div>
    </div>
  );
};

export default CryptoCard;
