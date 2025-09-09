import { useTranslations, useLocale } from 'next-intl';

const Hero = () => {
  const t = useTranslations('MarketOverview.hero');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  return (
    <section>
      <h1
        className={`${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        } text-[#07153b] dark:text-white lg:text-3xl text-[1.5rem] font-semibold tracking-wider text-center relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#EC3B3B]`}
      >
        {t('title')}
      </h1>
      <figcaption
        className={`${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        } text-[#07153b] dark:text-white lg:text-[1rem] lg:ml-4 italic text-[0.875rem] font-semibold tracking-wider text-center`}
      >
      &quot;{t('subtitle')}&quot;
      </figcaption>
      <p
        className={`text-[#07153b]/80 dark:text-gray-400 mt-4 lg:text-[1rem] lg:text-base text-center lg:max-w-6xl ${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        }`}
      >
        {t('description1')}
      </p>
      <p
        className={`text-[#07153b]/80 dark:text-gray-400 mt-4 lg:text-[1rem] lg:text-base text-center lg:max-w-6xl ${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        }`}
      >
        {t('description2')}
      </p>
    </section>
  );
};

export default Hero;
