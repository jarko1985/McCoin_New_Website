'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function PodcastBanner() {
  const t = useTranslations('HomePage.PodcastBanner');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  return (
    <section
      className={`xl:max-w-[70%] lg:mx-auto mx-5  px-4 xl:px-0 flex pb-6 lg:pb-0  flex-col lg:flex-row-reverse items-center justify-around relative shadow-xl border dark:border-white/30 border-[#07153b] rounded-lg`}
    >
      {/* Image container with relative layout */}
      <div className="relative w-[320px] h-[380px]">
        {/* Man Image */}
        <Image
          data-aos="fade-right"
          src="/images/man_resized.png"
          alt="Podcast Host"
          width={320}
          height={380}
          className="z-10"
        />

        {/* Mic Image sliding down to mouth level (beside, not overlapping) */}
        <div data-aos="fade-down" className={`absolute top-12 right-0`}>
          <Image src="/images/mic_resized.png" alt="Microphone" width={90} height={90} />
        </div>
      </div>

      {/* Text and Button */}
      <div
        data-aos="fade-left"
        className={`text-center lg:text-left max-w-xl space-y-6 px-8 ${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        }`}
      >
        <h2 className="text-4xl font-bold dark:text-[#DAE6EA] text-[#07153b]">
          {t('title', { brand: 'McCoin' })}
        </h2>
        <p className="dark:text-[#DAE6EA]/80 text-[#07153b] text-lg">{t('description')}</p>
        <Button
          className="bg-[#EC3B3B] cursor-pointer text-white dark:hover:bg-[#DAE6EA]  dark:hover:text-[#07153b] hover:border hover:border-[#EC3B3B] shadow-sm"
          onClick={() => (window.location.href = '/podcasts')}
        >
          {t('button')}
        </Button>
      </div>
    </section>
  );
}
