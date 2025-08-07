'use client';
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const timeOptions = [
  { label: '24h', value: '1', interval: 'hourly' },
  { label: '7d', value: '7', interval: 'daily' },
  { label: '30d', value: '30', interval: 'daily' },
  { label: '1y', value: '365', interval: 'daily' },
];

type Dominance = {
  btc: number | null;
  eth: number | null;
  others: number | null;
};
type MarketCapPoint = {
  date: string;
  marketCap: number;
  raw: number;
  timestamp: number;
};

const MarketStats = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const t = useTranslations('marketOverview.marketStats');
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
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-3">
      <Card className="bg-[#DAE6EA] dark:bg-[#050E27] text-[#050E27] dark:text-[#DAE6EA] p-4 flex-[0.25] shadow-2xl! border border-slate-400 darK:border-slate-400 dark:border">
        <h3 className="text-md mb-1 font-semibold">{t('cryptoMarketCapTitle')}</h3>
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
      <Card className="bg-[#DAE6EA] dark:bg-[#050E27] text-[#050E27] dark:text-[#DAE6EA] p-4 flex-[0.25] shadow-2xl! border border-slate-400 darK:border-slate-400 dark:border">
        <h3 className="text-md mb-2 font-semibold">{t('marketCapHistoricalTitle')}</h3>
        <div className="space-y-1">
          <p className="flex justify-between">
            <span>{t('yesterday')}</span>
            <span className="font-semibold">${history.yesterday ?? '--'}T</span>
          </p>
          <p className="flex justify-between">
            <span>{t('lastWeek')}</span>
            <span className="font-semibold">${history.lastWeek ?? '--'}T</span>
          </p>
          <p className="flex justify-between">
            <span>{t('lastMonth')}</span>
            <span className="font-semibold">${history.lastMonth ?? '--'}T</span>
          </p>
        </div>
      </Card>

      {/* Yearly Performance */}
      <Card className="bg-[#DAE6EA] dark:bg-[#050E27] text-[#050E27] dark:text-[#DAE6EA] p-4 flex-[0.25] shadow-2xl! border border-slate-400 darK:border-slate-400 dark:border">
        <h3 className="text-md mb-2 font-semibold">{t('marketCapYearlyTitle')}</h3>
        <div className="space-y-1">
          <p className="flex justify-between text-green-400">
            <span>
              {t('yearlyHigh')} ({yearStats.highDate ?? '--'})
            </span>
            <span className="font-semibold">${yearStats.high ?? '--'}T</span>
          </p>
          <p className="flex justify-between text-[#EC3B3B]">
            <span>
              {t('yearlyLow')} ({yearStats.lowDate ?? '--'})
            </span>
            <span className="font-semibold">${yearStats.low ?? '--'}T</span>
          </p>
        </div>
      </Card>
      <Card className="bg-[#DAE6EA] dark:bg-[#050E27] text-[#050E27] dark:text-[#DAE6EA] p-4 flex-[0.25] shadow-2xl! border border-slate-400 darK:border-slate-400 dark:border">
        <h3 className="text-md mb-2 font-semibold">{t('bitcoinDominanceTitle')}</h3>
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
            <span>{t('others')}</span>
            <span className="font-semibold">
              {dominance.others !== null ? dominance.others.toFixed(2) : '--'} %
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MarketStats;
