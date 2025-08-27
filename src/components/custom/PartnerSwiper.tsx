'use client';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image, { StaticImageData } from 'next/image';
import BINANCE from '@/../public/images/binance1.png';
import CHAINALYSYS from '@/../public/images/Chainalysis-logo.png';
import HEXTRUST from '@/components/custom/HexTrustLogo';
import SUMSUB from '@/components/custom/SumsubLogo';
import { JSX } from 'react';

type LogoItem =
  | { type: 'image'; src: StaticImageData }
  | { type: 'component'; Component: (props: React.SVGProps<SVGSVGElement>) => JSX.Element };

export default function PartnerSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const logos: LogoItem[] = [
    { type: 'image', src: BINANCE },
    { type: 'image', src: CHAINALYSYS },
    { type: 'component', Component: HEXTRUST },
    { type: 'component', Component: SUMSUB },
    { type: 'image', src: BINANCE },
    { type: 'image', src: CHAINALYSYS },
    { type: 'component', Component: HEXTRUST },
    { type: 'component', Component: SUMSUB },
  ];

  // 🔄 Force swiper to update after mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    }, 100); // delay slightly to wait for DOM readiness

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="py-2 sm:py-12 relative overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/6 sm:w-1/4 h-full bg-gradient-to-r dark:from-[#07153b] dark:via-[#07153b]/80 to-transparent z-10 pointer-events-none" />
        <div className="flex-1" />
        <div className="w-1/6 sm:w-1/4 h-full bg-gradient-to-l dark:from-[#07153b] dark:via-[#07153b]/80 to-transparent z-10 pointer-events-none" />
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        centeredSlides
        allowTouchMove={false}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        onSwiper={swiper => (swiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 80 },
          480: { slidesPerView: 2, spaceBetween: 48 },
          640: { slidesPerView: 2, spaceBetween: 56 },
          768: { slidesPerView: 3, spaceBetween: 60 },
          1024: { slidesPerView: 6, spaceBetween: 64 },
        }}
        className="partner-swiper"
        style={
          {
            '--swiper-navigation-size': '24px',
          } as React.CSSProperties
        }
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-32 sm:h-24 w-full flex items-center justify-center px-1 sm:px-2">
              {logo.type === 'image' ? (
                <Image
                  src={logo.src}
                  alt="Partner logo"
                  width={160}
                  height={64}
                  className="object-contain max-h-[64px] sm:max-h-[64px] min-w-[100px] sm:min-w-[120px] w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <logo.Component className="h-16 sm:h-16 min-w-[100px] sm:min-w-[120px] w-auto grayscale brightness-150 hover:grayscale-0 transition-all duration-300" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
