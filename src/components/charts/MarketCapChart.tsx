// components/MarketCapChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface DataPoint {
  date: string;
  marketCap: number;
  volume: number;
}

const ranges = ['30d', '1y', 'all'] as const;

type Range = typeof ranges[number];

export default function MarketCapChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [range, setRange] = useState<Range>('30d');
  const [loading, setLoading] = useState(true);
  const locale = (useParams() as { locale?: string })?.locale ?? 'en'; 

  const fetchData = async (selectedRange: Range) => {
    setLoading(true);
    try {
      const res = await fetch(`/${locale}/api/crypto?range=${selectedRange}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [locale, range]);

  if (loading) {
    return (
      <div className="bg-[#07153b] rounded-xl p-6 shadow-md w-full">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-[320px] w-full" />
      </div>
    );
  }

  if (!data.length) return <div className="text-white">No chart data available</div>;

  const latest = data[data.length - 1];
  const totalVolume = (latest.volume || 0).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#07153b] rounded-xl p-6 shadow-md w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-lg font-semibold">Crypto Market Cap</h2>
          <div className="flex gap-6 mt-2">
            <div>
              <p className="text-[#DAE6EA] text-sm">Market Cap</p>
              <p className="text-white font-bold text-xl">
                ${(latest.marketCap / 1e12).toFixed(2)}T
              </p>
            </div>
            <div>
              <p className="text-[#DAE6EA] text-sm">Volume</p>
              <p className="text-white font-bold text-xl">${(latest.volume / 1e9).toFixed(2)}B</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-[#DAE6EA] text-sm">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => {
                if (r !== range) setRange(r);
              }}
              className={`px-3 py-1 rounded transition-all duration-200 ${
                r === range ? 'bg-[#EC3B3B] text-white' : 'hover:bg-[#EC3B3B]/10'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC3B3B" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#EC3B3B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#233251" />
          <XAxis dataKey="date" stroke="#DAE6EA" fontSize={12} />
          <YAxis stroke="#DAE6EA" fontSize={12} tickFormatter={v => `$${(v / 1e12).toFixed(1)}T`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#07153b', borderColor: '#EC3B3B' }}
            labelStyle={{ color: '#DAE6EA' }}
            itemStyle={{ color: '#EC3B3B' }}
            formatter={(value: number, name: string) =>
              name === 'volume'
                ? [`$${(value / 1e9).toFixed(2)}B`, 'Volume']
                : [`$${(value / 1e12).toFixed(2)}T`, 'Market Cap']
            }
          />
          <Bar dataKey="volume" barSize={20} fill="#DAE6EA44" />
          <Area
            type="monotone"
            dataKey="marketCap"
            stroke="#EC3B3B"
            fillOpacity={1}
            fill="url(#colorCap)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
