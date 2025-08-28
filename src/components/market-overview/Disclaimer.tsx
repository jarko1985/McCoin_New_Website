import { useTranslations } from 'next-intl';

const Disclaimer = () => {
  const t = useTranslations('MarketOverview.disclaimer');

  return (
    <section className="pt-12">
      <h2 className="text-[#050E27] dark:text-white text-lg lg:text-2xl font-semibold mb-4">
        {t('title')}
      </h2>
      <p className="text-[#050E27] dark:text-gray-400 lg:text-base text-sm">{t('content1')}</p>
      <p className=" text-[#050E27] dark:text-gray-400 lg:text-base text-sm">{t('content2')}</p>
    </section>
  );
};

export default Disclaimer;
