
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { TimeRange } from '../types/crypto';

const timeRanges: TimeRange[] = ['1D', '7D', '1M', '3M', '1Y'];

const DetailedChart: React.FC = () => {
  const { selectedCrypto, timeRange, setTimeRange } = useCrypto();
  
  if (!selectedCrypto) {
    return (
      <div className="glass-card rounded-2xl p-6 h-[400px] flex items-center justify-center">
        <p className="text-gray-400">Select a cryptocurrency to view detailed chart</p>
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
  
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <img 
              src={selectedCrypto.image} 
              alt={selectedCrypto.name} 
              className="w-8 h-8 rounded-full"
            />
            {selectedCrypto.name} Price Chart
          </h2>
          <p className="text-gray-400">
            Current Price: <span className="text-white font-medium">{formatCurrency(selectedCrypto.current_price)}</span>
            <span className={`ml-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{selectedCrypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                timeRange === range 
                  ? 'bg-crypto-accent text-white' 
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
                <stop offset="5%" stopColor={selectedCrypto.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={selectedCrypto.color} stopOpacity={0} />
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
              formatter={(value: number) => [formatCurrency(value), 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={selectedCrypto.color} 
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
