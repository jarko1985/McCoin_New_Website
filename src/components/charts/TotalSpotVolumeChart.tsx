// components/TotalSpotVolumeChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const timeOptions = [
  { label: '24h', value: '1', interval: 'hourly' },
  { label: '7d', value: '7', interval: 'daily' },
  { label: '30d', value: '30', interval: 'daily' },
  { label: '1y', value: '365', interval: 'daily' },
];

export default function TotalSpotVolumeChart() {
  const [data, setData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeOptions[3]);
  const [latestVolume, setLatestVolume] = useState<number | null>(null);

  useEffect(() => {
    const fetchVolume = async () => {
      try {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/global/market_cap_chart?vs_currency=usd&days=${selectedRange.value}&interval=${selectedRange.interval}`,
          {
            headers: {
              'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
            },
          },
        );
        const json = await res.json();
        const points = json.market_cap_chart.volume;
        const formatted = points.map((d: [number, number]) => ({
          date: new Date(d[0]).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: selectedRange.value === '365' ? 'numeric' : undefined,
          }),
          volume: +(d[1] / 1e9).toFixed(2),
        }));
        setData(formatted);
        setLatestVolume(formatted[formatted.length - 1]?.volume ?? null);
      } catch (e) {
        console.error('Volume Chart Fetch Error', e);
      }
    };

    fetchVolume();
  }, [selectedRange]);

  return (
    <Card className="bg-[#050E27] text-[#DAE6EA] p-4 w-full my-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Total Crypto Spot Volume</h3>
          <AnimatePresence mode="wait">
            {latestVolume !== null && (
              <motion.div
                key={latestVolume}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-white mt-1"
              >
                ${latestVolume.toLocaleString()}B
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" stroke="#DAE6EA" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#DAE6EA"
            tickFormatter={val => `$${val.toFixed(0)}B`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#07153b', borderColor: '#DAE6EA' }}
            labelStyle={{ color: '#DAE6EA' }}
            formatter={value => [`$${(+value).toFixed(2)}B`, 'Volume']}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#00bfff"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
