// app/components/MarketCapChart.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const t = useTranslations('MarketOverview.charts');
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
          `/${locale}/api/market-cap?days=${selectedRange.value}&interval=${selectedRange.interval}`,
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
        const res = await fetch(`/${locale}/api/global-dominance`);
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
      <div className="bg-[#DAE6EA] dark:bg-[#050E27] p-3 rounded-xl shadow-xl w-full dark:border-none border dark:border-transparent border-slate-400">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#050E27] dark:text-[#DAE6EA] text-lg font-semibold">
            {t('cryptoMarketCapChart')}
          </h2>
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
            <XAxis
              dataKey="date"
              stroke={isDark ? '#DAE6EA' : '#1F2937'}
              tick={{ fontSize: 12, fill: isDark ? '#DAE6EA' : '#1F2937' }}
            />
            <YAxis
              stroke={isDark ? '#DAE6EA' : '#1F2937'}
              tick={{ fontSize: 12, fill: isDark ? '#DAE6EA' : '#1F2937' }}
              tickFormatter={val => `$${val.toFixed(2)}T`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#07153b' : '#F9FAFB',
                borderColor: isDark ? '#DAE6EA' : '#CBD5E1',
              }}
              labelStyle={{
                color: isDark ? '#DAE6EA' : '#1F2937',
              }}
              formatter={value => [`$${(+value).toFixed(2)}T`, 'Market Cap']}
            />
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke={isDark ? '#00ff9c' : '#10B981'}
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
