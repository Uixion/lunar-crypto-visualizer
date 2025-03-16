
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { TimeRange } from '../types/crypto';
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeRanges: TimeRange[] = ['1D', '7D', '1M', '3M', '1Y'];

const DetailedChart: React.FC = () => {
  const { selectedCrypto, timeRange, setTimeRange } = useCrypto();
  
  if (!selectedCrypto) {
    return (
      <div className="glass-card rounded-2xl p-6 h-[400px] flex items-center justify-center">
        <p className="text-gray-400">Selecione uma criptomoeda para ver o gráfico detalhado</p>
      </div>
    );
  }
  
  // Generate more detailed data based on the sparkline data
  const generateExtendedData = () => {
    const baseData = selectedCrypto.sparkline;
    // Extend the sparkline data to create a more detailed chart
    const extended = [];
    const multiplier = timeRange === '1D' ? 24 : 
                      timeRange === '7D' ? 7 : 
                      timeRange === '1M' ? 30 : 
                      timeRange === '3M' ? 90 : 365;
    
    // Create a date range going backward from now
    const now = new Date();
    const timestamps = [];
    
    for (let i = multiplier; i >= 0; i--) {
      const date = new Date();
      if (timeRange === '1D') {
        date.setHours(now.getHours() - i);
        timestamps.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        date.setDate(now.getDate() - i);
        timestamps.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
      }
    }
    
    // Create price variations based on the sparkline but with more points
    const baseLength = baseData.length;
    for (let i = 0; i <= multiplier; i++) {
      const baseIndex = Math.floor((i / multiplier) * (baseLength - 1));
      const nextIndex = Math.min(baseIndex + 1, baseLength - 1);
      
      // Interpolate between points for smoother data
      const ratio = (i / multiplier) * (baseLength - 1) - baseIndex;
      const basePrice = baseData[baseIndex];
      const nextPrice = baseData[nextIndex];
      const price = basePrice + (nextPrice - basePrice) * ratio;
      
      // Add some random noise for more realistic data
      const noise = price * 0.01 * (Math.random() - 0.5);
      
      extended.push({
        timestamp: timestamps[i],
        price: price + noise,
        date: i
      });
    }
    
    return extended;
  };
  
  const chartData = generateExtendedData();
  const isPositive = selectedCrypto.price_change_percentage_24h >= 0;
  const priceChangeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const priceChangeIcon = isPositive ? <TrendingUp className="animate-bounce mr-1" /> : <TrendingDown className="animate-bounce mr-1" />;
  const chartColor = isPositive ? '#34D399' : '#EF4444';
  
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="relative">
              <img 
                src={selectedCrypto.image} 
                alt={selectedCrypto.name} 
                className={cn(
                  "w-8 h-8 rounded-full",
                  isPositive ? "animate-pulse" : ""
                )}
              />
              {isPositive 
                ? <ArrowUp size={12} className="absolute -top-1 -right-1 text-green-400 p-0.5 bg-green-400/20 rounded-full" /> 
                : <ArrowDown size={12} className="absolute -top-1 -right-1 text-red-400 p-0.5 bg-red-400/20 rounded-full" />
              }
            </div>
            Gráfico de Preço de {selectedCrypto.name}
          </h2>
          <div className="flex items-center">
            <p className="text-gray-400 mr-2">
              Preço Atual: <span className="text-white font-medium">{formatCurrency(selectedCrypto.current_price)}</span>
            </p>
            <div className={`flex items-center ${priceChangeColor} px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              {priceChangeIcon}
              <span className="font-medium">
                {isPositive ? '+' : ''}{selectedCrypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                timeRange === range 
                  ? `bg-${isPositive ? 'green' : 'red'}-500/20 text-white shadow-[0_0_10px_${isPositive ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}]` 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#132F4C" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              stroke="#9CA3AF" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value, 0)}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Preço']}
              labelFormatter={(label) => `Tempo: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: isPositive ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                boxShadow: isPositive 
                  ? '0 10px 15px -3px rgba(52, 211, 153, 0.2)' 
                  : '0 10px 15px -3px rgba(239, 68, 68, 0.2)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor} 
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailedChart;
