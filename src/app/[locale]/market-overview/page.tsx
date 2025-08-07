import CexDexSpotVolumeChart from '@/components/charts/CexSpotVolumeChart';
import DexSpotVolumeMarketShare from '@/components/charts/DexSpotVolumeChart';
import CryptoMarketCapChart from '@/components/charts/MarketCapChart';
import TotalSpotVolumeChart from '@/components/charts/TotalSpotVolumeChart';
import Disclaimer from '@/components/market-overview/Disclaimer';
import Hero from '@/components/market-overview/Hero';
import MarketAnalysis from '@/components/market-overview/MarketAnalysis';
import MarketStats from '@/components/market-overview/MarketStats';
import PricesTable from '@/components/market-overview/PricesTable';
import SpotMarketNewsSwiper from '@/components/market-overview/SpotMarketNewsSwiper';

const page = () => {
  return (
    <div className="container mx-auto xl:w-[70%] py-12 px-4 md:px-0">
      <Hero />
      <section className="mt-8">
        <MarketStats />
        <PricesTable />
        <MarketAnalysis />
        <CryptoMarketCapChart />
        <TotalSpotVolumeChart />
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

export default page;
