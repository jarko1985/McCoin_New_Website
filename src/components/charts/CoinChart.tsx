'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const timeOptions = [
  { label: '24h', value: '1' },
  { label: '7d', value: '7' },
  { label: '30d', value: '30' },
  { label: '1y', value: '365' },
];

export default function CoinChart({ coinId }: { coinId: string }) {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);
  const [range, setRange] = useState('1');
  const [changes, setChanges] = useState<any>(null);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch(
        `https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${range}`,
        {
          headers: {
            'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
          },
        },
      );
      const json = await res.json();
      const formatted = json.prices.map(([timestamp, price]: [number, number]) => ({
        time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price,
      }));
      setData(formatted);
    };

    const fetchChanges = async () => {
      const res = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}`, {
        headers: {
          'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
      });
      const json = await res.json();
      setChanges(json.market_data);
    };

    fetchChart();
    fetchChanges();
  }, [coinId, range]);

  return (
    <div className="bg-[#0e1c3d] p-4 rounded-xl text-white">
      {/* Timeframe Switch */}
      <div className="flex gap-2 mb-4">
        {timeOptions.map(opt => (
          <Button
            key={opt.value}
            variant={range === opt.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#DAE6EA', fontSize: 12 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fill: '#DAE6EA', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#1f2937', border: 'none' }} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#34d399"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Timeframe % Change Table */}
      {changes && (
        <div className="mt-6 bg-[#07153b] rounded-xl overflow-hidden border border-[#1f2e4a]">
          <div className="grid grid-cols-6 text-center text-sm font-medium text-white">
            {['1h', '24h', '7d', '14d', '30d', '1y'].map(label => (
              <div key={label} className="py-2 bg-[#0e1c3d] border-b border-[#1f2e4a]">
                {label}
              </div>
            ))}
            {[
              changes.price_change_percentage_1h_in_currency.usd,
              changes.price_change_percentage_24h_in_currency.usd,
              changes.price_change_percentage_7d_in_currency.usd,
              changes.price_change_percentage_14d_in_currency.usd,
              changes.price_change_percentage_30d_in_currency.usd,
              changes.price_change_percentage_1y_in_currency.usd,
            ].map((val, i) => (
              <div
                key={i}
                className={`py-2 ${
                  val > 0 ? 'text-green-400' : 'text-red-400'
                } text-sm font-semibold`}
              >
                {val?.toFixed(1)}%
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
