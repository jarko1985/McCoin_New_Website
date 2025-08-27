import React from 'react';
import RotatingIcons from '../custom/RotatingIcons';
import { useTranslations, useLocale } from 'next-intl';

const About = () => {
  const t = useTranslations('aboutPage.about');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  return (
    <section
      id="about"
      className={`xl:mx-auto py-4 md:py-10 xl:w-[70%] bg-[#DAE6EA] dark:bg-[#050e27]! border border-slate-500  mx-4 px-4 lg:px-8 z-10 rounded-lg`}
    >
      <h2
        className={`text-xl md:text-2xl lg:text-3xl text-[#050e27] dark:text-[#DAE6EA] font-[600] pb-8  bg-[#DAE6EA] dark:bg-[#050e27]! ${
          isArabic ? 'text-right' : 'text-left'
        }`}
      >
        {t('title')}
      </h2>
      <p
        className={`text-sm lg:text-lg text-[#050e27] dark:text-[#DAE6EA] pb-5 bg-[#DAE6EA]  dark:bg-[#050e27]! ${
          isArabic ? 'text-right' : 'text-left'
        }`}
      >
        {t('content.paragraph1')}
        <br />
        <br />
        {t('content.paragraph2')}
        <br />
        <br />
        {t('content.paragraph3')}
        <br />
        <br />
        {t('content.paragraph4')}
        <br />
        <br />
        {t('content.paragraph5')}
        <br />
        <br />
        {t('content.paragraph6')}
      </p>
      <RotatingIcons />
    </section>
  );
};

export default About;
