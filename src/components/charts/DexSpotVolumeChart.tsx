// components/DexSpotVolumeMarketShare.tsx
'use client';

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

const dexIds = ['uniswap', 'curve', 'pancakeswap', 'sushiswap'];

const dexLabels: Record<string, string> = {
  uniswap: 'Uniswap',
  curve: 'Curve',
  pancakeswap: 'PancakeSwap',
  sushiswap: 'SushiSwap',
};

export default function DexSpotVolumeMarketShare() {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const [data, setData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeOptions[3]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllVolumes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/${locale}/api/dex-spot-volume?days=${selectedRange.value}`);
        const json = await res.json();

        if (!json.results || !json.results['uniswap'] || !Array.isArray(json.results['uniswap'])) {
          console.error('DEX results are missing or malformed:', json);
          setData([]);
          setLoading(false);
          return;
        }

        const results = json.results;
        const timestamps = results['uniswap'].map((d: [number, number]) => d[0]);

        const merged = timestamps.map((ts: number, idx: number) => {
          const entry: any = {
            date: new Date(ts).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: selectedRange.value === '365' ? 'numeric' : undefined,
            }),
          };

          let total = 0;
          for (const id of dexIds) {
            const vol = results[id]?.[idx]?.[1] ?? 0;
            entry[id] = vol;
            total += vol;
          }

          for (const id of dexIds) {
            entry[id] = total > 0 ? +((entry[id] / total) * 100).toFixed(2) : 0;
          }

          entry.others = +(100 - dexIds.reduce((sum, id) => sum + entry[id], 0)).toFixed(2);

          return entry;
        });

        setData(merged);
      } catch (e) {
        console.error('DEX Market Share Error', e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVolumes();
  }, [selectedRange]);

  return (
    <Card className="bg-[#050E27] text-[#DAE6EA] p-4 w-full shadow-lg hover:shadow-2xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          DEX Spot Volume (Market Share)
          {loading && <Loader2 className="animate-spin h-4 w-4 text-white" />}
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
            <h2 className="text-white text-center pt-5">Loading...</h2>
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
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} stackOffset="expand">
              <XAxis dataKey="date" stroke="#DAE6EA" tick={{ fontSize: 12 }} />
              <YAxis stroke="#DAE6EA" tick={{ fontSize: 12 }} tickFormatter={val => `${val}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#07153b', borderColor: '#DAE6EA' }}
                labelStyle={{ color: '#DAE6EA' }}
                formatter={(val: number, name: string) => [
                  `${val.toFixed(2)}%`,
                  dexLabels[name] || 'Others',
                ]}
              />
              {dexIds.map((id, idx) => (
                <Area
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stackId="volume"
                  stroke="none"
                  fill={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
                />
              ))}
              <Area
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
