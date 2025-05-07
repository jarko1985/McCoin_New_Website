// components/CryptoMarketCapChart.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Check, X } from 'lucide-react';
import { useParams } from 'next/navigation';

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

interface ChartData {
  name: string;
  [key: string]: number | string;
}

const CRYPTO_COLORS: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  BNB: '#F3BA2F',
  SOL: '#00FFA3',
  XRP: '#27A2DB',
  ADA: '#0033AD',
  DOGE: '#CBAE5B',
  DOT: '#E6007A',
  AVAX: '#E84142',
  SHIB: '#FFC72C'
};

const ALL_CRYPTOS = Object.keys(CRYPTO_COLORS);

const CryptoMarketCapChart = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';  
  const [apiData, setApiData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>(['BTC', 'ETH', 'BNB']);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch data with caching
  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const cacheKey = 'cryptoMarketData';
      const cache = localStorage.getItem(cacheKey);
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes
      
      if (cache && !forceRefresh) {
        const parsed = JSON.parse(cache);
        if (Date.now() - parsed.timestamp < cacheExpiry) {
          setApiData(parsed.data);
          setLastUpdated(new Date(parsed.timestamp));
          setLoading(false);
          return;
        }
      }
      
      setRefreshing(true);
      const response = await fetch(`/${locale}/api/crypto`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      const newData = result.data;
      
      setApiData(newData);
      setLastUpdated(new Date());
      localStorage.setItem(cacheKey, JSON.stringify({
        data: newData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch cryptocurrency data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Generate chart data
  const chartData = useMemo(() => {
    if (!apiData.length) return [];

    const days = 30;
    const generatedData: ChartData[] = [];

    for (let i = 0; i < days; i++) {
      const dayData: ChartData = { name: `Day ${i + 1}` };
      
      apiData.forEach(crypto => {
        if (selectedCryptos.includes(crypto.symbol)) {
          const fluctuation = crypto.quote.USD.percent_change_24h / 100;
          const randomFactor = 1 + (Math.random() * 0.1 - 0.05);
          dayData[crypto.symbol] = crypto.quote.USD.market_cap * 
            (1 - (days - i) / days * fluctuation) * randomFactor;
        }
      });
      
      generatedData.push(dayData);
    }

    return generatedData;
  }, [apiData, selectedCryptos]);

  // Toggle cryptocurrency
  const toggleCrypto = (symbol: string) => {
    setSelectedCryptos(prev => 
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  // Toggle all/none
  const toggleAllCryptos = (select: boolean) => {
    setSelectedCryptos(select ? [...ALL_CRYPTOS] : []);
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-red-500 text-center py-8">{error}</div>
        <Button 
          onClick={() => fetchData()} 
          className="w-full mt-4"
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Cryptocurrency Market Cap (Last 30 Days)
        </h2>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => fetchData(true)}
            size="sm"
            variant="outline"
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex gap-1">
          <Button
            onClick={() => toggleAllCryptos(true)}
            size="sm"
            variant="outline"
            className="h-8 px-2"
          >
            <Check className="h-4 w-4 mr-1" /> All
          </Button>
          <Button
            onClick={() => toggleAllCryptos(false)}
            size="sm"
            variant="outline"
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" /> None
          </Button>
        </div>
        
        {ALL_CRYPTOS.map(symbol => (
          <Button
            key={symbol}
            onClick={() => toggleCrypto(symbol)}
            size="sm"
            variant={selectedCryptos.includes(symbol) ? "default" : "outline"}
            className={`h-8 px-3 transition-all ${
              selectedCryptos.includes(symbol) ? '' : 'opacity-70'
            }`}
            style={{
              backgroundColor: selectedCryptos.includes(symbol) 
                ? CRYPTO_COLORS[symbol] + '33'
                : undefined,
              borderColor: selectedCryptos.includes(symbol)
                ? CRYPTO_COLORS[symbol]
                : undefined
            }}
          >
            {symbol}
          </Button>
        ))}
      </div>
      
      <div className="h-80 w-full relative">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
                  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
                  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
                  return `$${value}`;
                }}
                width={80}
              />
              <Tooltip 
                formatter={(value) => {
                  const numValue = Number(value);
                  if (numValue >= 1e12) return [`$${(numValue / 1e12).toFixed(2)}T`, 'Market Cap'];
                  if (numValue >= 1e9) return [`$${(numValue / 1e9).toFixed(2)}B`, 'Market Cap'];
                  if (numValue >= 1e6) return [`$${(numValue / 1e6).toFixed(2)}M`, 'Market Cap'];
                  return [`$${numValue.toLocaleString()}`, 'Market Cap'];
                }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              
              {selectedCryptos.map(symbol => (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={CRYPTO_COLORS[symbol]}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-muted-foreground">
          Note: Historical data is simulated for demo purposes.
        </p>
        <div className="flex items-center gap-2">
          {refreshing && (
            <span className="text-xs text-muted-foreground flex items-center">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Refreshing data...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketCapChart;