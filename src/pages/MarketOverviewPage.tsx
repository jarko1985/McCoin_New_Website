import CexDexSpotVolumeChart from '@/components/charts/CexSpotVolumeChart';
import DexSpotVolumeMarketShare from '@/components/charts/DexSpotVolumeChart';
import CryptoMarketCapChart from '@/components/charts/MarketCapChart';
import TotalSpotVolumeChart from '@/components/charts/TotalSpotVolumeChart';
import Disclaimer from '@/components/market-overview/Disclaimer';
import Hero from '@/components/market-overview/Hero';
import SpotMarketNewsSwiper from '@/components/market-overview/SpotMarketNewsSwiper';
import TopGainersAndLosers from '@/components/market-overview/TopGainersAndLosers';
import React from 'react';

const MarketOverviewPage = () => {
  return (
    <div className="container mx-auto xl:w-[70%] py-12 px-4 md:px-0">
      <Hero />
      <section className="mt-8">
        <CryptoMarketCapChart />
        <TotalSpotVolumeChart />
        <TopGainersAndLosers />
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <CexDexSpotVolumeChart />
          <DexSpotVolumeMarketShare />
        </div>
        <SpotMarketNewsSwiper />
        <Disclaimer />
      </section>
    </div>
  );
};

export default MarketOverviewPage;
