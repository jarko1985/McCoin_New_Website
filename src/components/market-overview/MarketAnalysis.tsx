'use client';
import { useState, useEffect } from 'react';
import TopMovers from '@/components/market-overview/TopMovers';
import MarketStatsTables from '@/components/market-overview/MarketStatsTables';
import { useTranslations } from 'next-intl';
import {
  CoinData,
  getTopCoins,
  getTopGainers,
  getTopLosers,
  getTopByVolume,
  getTopByMarketCap,
} from '@/../utils/coingecko';

const MarketAnalysis = () => {
  const t = useTranslations('marketOverview');
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTopCoins(100);
        setCoins(data);
        setError(null);
      } catch (err) {
        setError(t('fetchError'));
        console.error('Error fetching market data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [t]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#07153b] text-white p-6 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07153b] text-white p-6 flex items-center justify-center">
        <div className="text-slate-400">{t('loading')}</div>
      </div>
    );
  }

  const gainers = getTopGainers(coins);
  const losers = getTopLosers(coins);
  const volumeLeaders = getTopByVolume(coins);
  const marketCapLeaders = getTopByMarketCap(coins);
  return (
    <div>
      <h1 className="text-center text-3xl text-[#FFF] font-semibold mb-4">
        {t('marketAnalysisTitle')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <TopMovers title={t('topGainers')} type="gainers" data={gainers} />

        {/* Top Losers */}
        <TopMovers title={t('topLosers')} type="losers" data={losers} />

        {/* Value Leaders */}
        <TopMovers title={t('valueLeaders')} type="volume" data={volumeLeaders} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Market Cap */}
        <MarketStatsTables title={t('marketCap')} type="market-cap" data={marketCapLeaders} />

        {/* Market Volume */}
        <MarketStatsTables title={t('marketVolume')} type="top-search" data={volumeLeaders} />
      </div>
    </div>
  );
};

export default MarketAnalysis;
