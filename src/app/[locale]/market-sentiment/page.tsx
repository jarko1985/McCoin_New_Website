import FearAndGreed from '@/components/charts/FearAndGreed';
import CryptoHeatMap from '@/components/widgets/CryptoHeatMap';
import TradingViewMarketOverview from '@/components/widgets/MarketOverview';
import { FiAlertCircle } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
const page = () => {
  const t = useTranslations('MarketSentiment.page');
  
  return <>
   <main className="container mx-auto xl:w-[70%] pt-12 px-4 xl:px-0">
      <h2 className="text-3xl font-bold text-[#07153B] dark:text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#07153B] dark:bg-white rounded-sm"></span>
        {t('title')}
      </h2>
      <p className="text-lg text-[#07153B] dark:text-gray-300 mb-8">
        {t('description')}
      </p>

      <FearAndGreed />
      <TradingViewMarketOverview />

      <CryptoHeatMap />
      <div className="mt-12 text-[#07153B] dark:text-white">
        <FiAlertCircle className="inline text-yellow-400 mr-2" size={20} />
        {t('disclaimer.title')}
        <div className="text-[#07153B] dark:text-white pt-4">
          <p>
            {t('disclaimer.content.0')}
          </p>
          <p>
            {t('disclaimer.content.1')}
          </p>
          <p>
            {t('disclaimer.content.2')}
          </p>
        </div>
      </div>
    </main>
  </>;
};

export default page;
