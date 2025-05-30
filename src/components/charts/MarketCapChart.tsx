// app/components/MarketCapChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const timeOptions = [
  { label: '24h', value: '1', interval: 'hourly' },
  { label: '7d', value: '7', interval: 'daily' },
  { label: '30d', value: '30', interval: 'daily' },
  { label: '1y', value: '365', interval: 'daily' },
];

type MarketCapPoint = {
  date: string;
  marketCap: number;
  raw: number;
  timestamp: number;
};
type Dominance = {
  btc: number | null;
  eth: number | null;
  others: number | null;
};

export default function MarketCapChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeOptions[3]);
  const [latestCap, setLatestCap] = useState<number | null>(null);
  const [capChange, setCapChange] = useState<number | null>(null);
  const [history, setHistory] = useState({
    yesterday: null,
    lastWeek: null,
    lastMonth: null,
  });
  const [yearStats, setYearStats] = useState<{
    high: number | null;
    highDate: string | null;
    low: number | null;
    lowDate: string | null;
  }>({
    high: null,
    highDate: null,
    low: null,
    lowDate: null,
  });
  const [dominance, setDominance] = useState<Dominance>({
    btc: null,
    eth: null,
    others: null,
  });

  useEffect(() => {
    const fetchChart = async () => {
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
        const points = json.market_cap_chart.market_cap;
        const formatted = points.map((d: [number, number]) => ({
          date: new Date(d[0]).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: selectedRange.value === '365' ? 'numeric' : undefined,
          }),
          marketCap: +(d[1] / 1e12).toFixed(2),
          raw: d[1],
          timestamp: d[0],
        }));
        setChartData(formatted);

        // Latest value & change
        const len = formatted.length;
        const latest = formatted[len - 1];
        const prev = formatted[len - 2];
        setLatestCap(latest.marketCap);
        const change = ((latest.raw - prev.raw) / prev.raw) * 100;
        setCapChange(+change.toFixed(2));

        // Historical values
        const getAgoValue = (ago: number) => {
          const match = formatted.find((f: MarketCapPoint) => {
            const hoursAgo = (latest.timestamp - f.timestamp) / (1000 * 60 * 60);
            return Math.abs(hoursAgo - ago) < 2;
          });
          return match ? match.marketCap : null;
        };

        setHistory({
          yesterday: getAgoValue(24),
          lastWeek: getAgoValue(24 * 7),
          lastMonth: getAgoValue(24 * 30),
        });

        // Yearly high/low
        if (selectedRange.value === '365') {
          let high = formatted[0];
          let low = formatted[0];
          for (const d of formatted) {
            if (d.raw > high.raw) high = d;
            if (d.raw < low.raw) low = d;
          }
          setYearStats({
            high: +high.marketCap.toFixed(2),
            highDate: new Date(high.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            low: +low.marketCap.toFixed(2),
            lowDate: new Date(low.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          });
        }
      } catch (e) {
        console.error('Chart Fetch Error', e);
      }
    };
    fetchChart();
  }, [selectedRange]);
  useEffect(() => {
    const fetchDominance = async () => {
      try {
        const res = await fetch('https://pro-api.coingecko.com/api/v3/global', {
          headers: {
            'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
          },
        });
        const json = await res.json();
        const marketCapPercentage = json.data?.market_cap_percentage;
        const btc = marketCapPercentage?.btc ?? marketCapPercentage?.bitcoin;
        const eth = marketCapPercentage?.eth ?? marketCapPercentage?.ethereum;
        const others = btc && eth ? +(100 - btc - eth).toFixed(2) : null;
        setDominance({ btc, eth, others });
      } catch (e) {
        console.error('Dominance Fetch Error', e);
      }
    };

    fetchDominance();
  }, []);

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Market Cap Header */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-3">
        <Card className="bg-[#050E27] text-[#DAE6EA] p-4 flex-[0.25]">
          <h3 className="text-md mb-1 font-semibold">Crypto Market Cap</h3>
          <div className="text-3xl font-bold flex items-center gap-2">
            {latestCap !== null ? `$${latestCap}T` : '--'}
            {capChange !== null && (
              <span
                className={`text-sm font-semibold ${
                  capChange < 0 ? 'text-[#EC3B3B]' : 'text-green-400'
                }`}
              >
                {capChange < 0 ? '▼' : '▲'} {Math.abs(capChange)}% (24h)
              </span>
            )}
          </div>
        </Card>

        {/* Historical Values */}
        <Card className="bg-[#050E27] text-[#DAE6EA] p-4 flex-[0.25]">
          <h3 className="text-md mb-2 font-semibold">Market Cap Historical Values</h3>
          <div className="space-y-1">
            <p className="flex justify-between">
              <span>Yesterday</span>
              <span className="font-semibold">${history.yesterday ?? '--'}T</span>
            </p>
            <p className="flex justify-between">
              <span>Last Week</span>
              <span className="font-semibold">${history.lastWeek ?? '--'}T</span>
            </p>
            <p className="flex justify-between">
              <span>Last Month</span>
              <span className="font-semibold">${history.lastMonth ?? '--'}T</span>
            </p>
          </div>
        </Card>

        {/* Yearly Performance */}
        <Card className="bg-[#050E27] text-[#DAE6EA] p-4 flex-[0.25]">
          <h3 className="text-md mb-2 font-semibold">Market Cap Yearly Performance</h3>
          <div className="space-y-1">
            <p className="flex justify-between text-green-400">
              <span>Yearly High ({yearStats.highDate ?? '--'})</span>
              <span className="font-semibold">${yearStats.high ?? '--'}T</span>
            </p>
            <p className="flex justify-between text-[#EC3B3B]">
              <span>Yearly Low ({yearStats.lowDate ?? '--'})</span>
              <span className="font-semibold">${yearStats.low ?? '--'}T</span>
            </p>
          </div>
        </Card>
        <Card className="bg-[#050E27] text-[#DAE6EA] p-4 flex-[0.25]">
          <h3 className="text-md mb-2 font-semibold">Bitcoin Dominance</h3>
          <div className="space-y-1">
            <p className="flex justify-between text-yellow-400">
              <span>BTC</span>
              <span className="font-semibold">{dominance.btc?.toFixed(2) ?? '--'} %</span>
            </p>
            <p className="flex justify-between text-blue-400">
              <span>ETH</span>
              <span className="font-semibold">
                {dominance.eth !== null ? dominance.eth.toFixed(2) : '--'} %
              </span>
            </p>
            <p className="flex justify-between text-gray-400">
              <span>Others</span>
              <span className="font-semibold">
                {dominance.others !== null ? dominance.others.toFixed(2) : '--'} %
              </span>
            </p>
          </div>
        </Card>
      </div>
      {/* Chart Section */}
      <div className="bg-[#050E27] p-3 rounded-xl shadow-lg w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#DAE6EA] text-lg font-semibold">Crypto Market Cap Chart</h2>
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
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" stroke="#DAE6EA" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#DAE6EA"
              tickFormatter={val => `$${val.toFixed(2)}T`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#07153b', borderColor: '#DAE6EA' }}
              labelStyle={{ color: '#DAE6EA' }}
              formatter={value => [`$${(+value).toFixed(2)}T`, 'Market Cap']}
            />
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke="#00ff9c"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
