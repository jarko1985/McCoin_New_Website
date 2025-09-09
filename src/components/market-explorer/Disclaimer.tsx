import { useTranslations } from 'next-intl';

const Disclaimer = () => {
  const t = useTranslations('MarketExplorer.disclaimer');

  return (
    <section className="pt-12 xl:max-w-[70%] mx-auto">
      <h2 className="text-[#050E27] dark:text-white text-lg lg:text-2xl font-semibold mb-4 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#EC3B3B]">
        {t('title')}
      </h2>
      <p className="text-[#050E27] dark:text-gray-400 lg:text-base text-sm">{t('content1')}</p>
      <p className=" text-[#050E27] dark:text-gray-400 lg:text-base text-sm">{t('content2')}</p>
    </section>
  );
};

export default Disclaimer;
