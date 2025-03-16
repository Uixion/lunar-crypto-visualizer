
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
        "crypto-card cursor-pointer animate-fade-in opacity-0 relative overflow-hidden transition-all duration-300",
        isSelected && "ring-2 ring-crypto-accent/50",
        isPositive ? "hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]" : "hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
      )}
      onClick={onClick}
      style={{ 
        animationDelay: `${Math.random() * 0.5}s`,
        borderLeft: isPositive ? '4px solid rgb(52, 211, 153)' : '4px solid rgb(239, 68, 68)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.image} 
            alt={crypto.name} 
            className={cn(
              "w-10 h-10 rounded-full object-contain p-1 transition-transform duration-500",
              isPositive ? "bg-green-500/10" : "bg-red-500/10",
              isPositive ? "animate-pulse" : ""
            )}
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-lg">{crypto.name}</h3>
            <span className="text-sm text-gray-400">{crypto.symbol}</span>
          </div>
        </div>
        <div 
          className={cn(
            "flex items-center gap-1 font-medium text-sm px-2 py-1 rounded-full transition-all duration-300",
            isPositive 
              ? "bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]" 
              : "bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          )}
        >
          {isPositive 
            ? <TrendingUp size={14} className="animate-bounce" /> 
            : <TrendingDown size={14} className="animate-bounce" />
          }
          <span>{isPositive ? "+" : ""}{crypto.price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="h-20 mb-3 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#34D399' : '#EF4444'} stopOpacity={0.5} />
                <stop offset="100%" stopColor={isPositive ? '#34D399' : '#EF4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#34D399' : '#EF4444'}
              strokeWidth={2}
              fill={`url(#gradient-${crypto.id})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-baseline">
        <span className={cn(
          "text-2xl font-bold transition-all duration-300",
          isPositive ? "text-green-400" : "text-red-400"
        )}>
          {formatCurrency(crypto.current_price)}
        </span>
        <span className="text-sm text-gray-400">Cap. de Mercado: {formatCurrency(crypto.market_cap, 0, true)}</span>
      </div>
    </div>
  );
};

export default CryptoCard;
