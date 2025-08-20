import Image from 'next/image';
import { Button } from '../ui/button';
import RED_GLOBE from '@/../public/images/red_globe.png';
import { useLocale, useTranslations } from 'next-intl';

const TradeNow = () => {
  const t = useTranslations('HomePage.TradeNow');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  return (
    <section className="relative dark:bg-[#050E27] bg-[#DAE6EA] border border-[#050E27] rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between xl:max-w-[70%] lg:mx-auto mx-5 px-6 lg:px-12 py-12 gap-8 my-12">
      <div
        className={`z-10 lg:px-16 text-center lg:text-left max-w-lg ${
          isArabic ? 'lg:text-right' : 'lg:text-left'
        }`}
      >
        <h1
          data-aos="fade-right"
          className="dark:text-[#DAE6EA] text-[#050E27] font-semibold text-2xl sm:text-3xl lg:text-4xl leading-snug mb-6"
        >
          {t('title', { brand: 'Mccoin' })}
        </h1>
        <Button
          data-aos="fade-right"
          className="bg-[#EC3B3B] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#d53131] transition cursor-pointer"
        >
          {t('button')}
        </Button>
      </div>
      <div
        className={`absolute ${isArabic ? 'left-10' : 'right-10'} w-[35%] h-full hidden lg:block`}
      >
        <Image
          src={RED_GLOBE}
          alt="Red Globe"
          fill
          className="object-cover object-top-left"
          priority
          data-aos="fade-left"
        />
      </div>
    </section>
  );
};

export default TradeNow;
