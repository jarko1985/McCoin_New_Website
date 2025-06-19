'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const timeOptions = [
  { label: '24h', value: '1', interval: 'hourly' },
  { label: '7d', value: '7', interval: 'daily' },
  { label: '30d', value: '30', interval: 'daily' },
  { label: '1y', value: '365', interval: 'daily' },
];

const exchangeIds = ['binance', 'gdax', 'bybit', 'okx', 'crypto_com'];

const exchangeLabels: Record<string, string> = {
  binance: 'Binance',
  gdax: 'Coinbase',
  bybit: 'Bybit',
  okx: 'OKX',
  crypto_com: 'Crypto.com',
};

export default function CexSpotVolumeChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const [data, setData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeOptions[3]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllVolumes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/${locale}/api/cex-spot-volume?days=${selectedRange.value}`);
        const json = await res.json();
        const results = json.results;

        interface VolumeEntry {
          [key: string]: [number, number][];
        }

        interface ChartDataEntry {
          date: string;
          [key: string]: number | string;
        }

        const timestamps: number[] = results[exchangeIds[0]].map(
          (entry: [number, number]) => entry[0],
        );
        const merged = timestamps.map((ts, idx) => {
          const entry: any = {
            date: new Date(ts).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: selectedRange.value === '365' ? 'numeric' : undefined,
            }),
          };

          let total = 0;
          for (const id of exchangeIds) {
            const volume = results[id][idx]?.[1] ?? 0;
            entry[id] = volume;
            total += volume;
          }

          for (const id of exchangeIds) {
            entry[id] = +((entry[id] / total) * 100).toFixed(2);
          }

          entry.others = +(100 - exchangeIds.reduce((sum, id) => sum + entry[id], 0)).toFixed(2);

          return entry;
        });

        setData(merged);
        setLoading(false);
      } catch (e) {
        console.error('CEX Market Share Error', e);
        setLoading(false);
      }
    };

    fetchAllVolumes();
  }, [selectedRange]);

  return (
    <Card
      className="bg-[#DAE6EA] dark:bg-[#050E27] text-[#050E27] dark:text-[#DAE6EA] p-4 w-full shadow-xl
     hover:shadow-2xl transition duration-300 dark:border-none border 
     dark:border-transparent border-slate-400"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          CEX Spot Volume (Market Share)
          {loading && <Loader2 className="animate-spin h-4 w-4 text-[#050E27] dark:text-white" />}
        </h3>
        <div className="flex gap-2">
          {timeOptions.map(opt => (
            <Button
              key={opt.value}
              size="sm"
              variant={selectedRange.value === opt.value ? 'default' : 'secondary'}
              onClick={() => setSelectedRange(opt)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Skeleton className="w-full h-[400px] rounded-xl">
            <h2 className="text-[#1F2937] dark:text-white text-center pt-5">Loading...</h2>
          </Skeleton>
        </motion.div>
      ) : (
        <motion.div
          key="chart"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={400} className="rounded-xl">
            <AreaChart data={data} stackOffset="expand">
              <XAxis
                dataKey="date"
                stroke={isDark ? '#DAE6EA' : '#1F2937'}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={isDark ? '#DAE6EA' : '#1F2937'}
                tick={{ fontSize: 12 }}
                tickFormatter={val => `${val}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#07153b', borderColor: '#DAE6EA' }}
                labelStyle={{ color: '#DAE6EA' }}
                formatter={(val: number, name: string) => [
                  `${val.toFixed(2)}%`,
                  exchangeLabels[name] || 'Others',
                ]}
              />
              {exchangeIds.map((id, idx) => (
                <Area
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stackId="volume"
                  stroke="none"
                  fill={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
                  className="rounded-xl"
                />
              ))}
              <Area
                className="rounded-xl"
                type="monotone"
                dataKey="others"
                stackId="volume"
                stroke="none"
                fill="#999999"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </Card>
  );
}
