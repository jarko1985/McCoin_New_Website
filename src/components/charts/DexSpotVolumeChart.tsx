// components/DexSpotVolumeMarketShare.tsx
'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

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
  const [data, setData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeOptions[3]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllVolumes = async () => {
      try {
        setLoading(true);
        const btcRes = await fetch(
          'https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
          {
            headers: {
              'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
            },
          },
        );
        const btcJson = await btcRes.json();
        const btcUsd = btcJson.bitcoin.usd;

        const fetches = await Promise.all(
          dexIds.map(async id => {
            const res = await fetch(
              `https://pro-api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${selectedRange.value}`,
              {
                headers: {
                  accept: 'application/json',
                  'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
                },
              },
            );
            const json = await res.json();
            return {
              id,
              data: Array.isArray(json)
                ? json.map(([ts, vol]: [number, string]) => [ts, parseFloat(vol) * btcUsd])
                : [],
            };
          }),
        );

        const results: Record<string, [number, number][]> = {};
        fetches.forEach(({ id, data }) => {
          results[id] = data.filter(
            (item: any) =>
              Array.isArray(item) &&
              item.length === 2 &&
              typeof item[0] === 'number' &&
              typeof item[1] === 'number',
          ) as [number, number][];
        });

        const timestamps = results[dexIds[0]].map(entry => entry[0]);
        const merged = timestamps.map((ts, idx) => {
          const entry: any = {
            date: new Date(ts).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: selectedRange.value === '365' ? 'numeric' : undefined,
            }),
          };

          let total = 0;
          for (const id of dexIds) {
            const volume = results[id][idx]?.[1] ?? 0;
            entry[id] = volume;
            total += volume;
          }

          for (const id of dexIds) {
            entry[id] = +((entry[id] / total) * 100).toFixed(2);
          }

          entry.others = +(100 - dexIds.reduce((sum, id) => sum + entry[id], 0)).toFixed(2);

          return entry;
        });

        setData(merged);
        setLoading(false);
      } catch (e) {
        console.error('DEX Market Share Error', e);
        setLoading(false);
      }
    };

    fetchAllVolumes();
  }, [selectedRange]);

  return (
    <Card className="bg-[#050E27] text-[#DAE6EA] p-4 w-full shadow-lg hover:shadow-2xl transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">DEX Spot Volume (Market Share)</h3>
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
        <Skeleton className="w-full h-[400px] rounded-xl" />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
