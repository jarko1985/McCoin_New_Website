"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
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
  
  return (
    <div className="py-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={48}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        centeredSlides={true}
        allowTouchMove={false}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="partner-swiper"
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-24 w-full flex items-center justify-center">
            {logo.type === 'image' ? (
  <Image
    src={logo.src}
    alt="Partner logo"
    width={160}
    height={64}
    className="object-contain max-h-[64px] w-auto grayscale hover:grayscale-0 transition-all duration-300"
  />
) : (
  <logo.Component
    className="h-16 w-auto grayscale brightness-150 hover:grayscale-0 transition-all duration-300"
  />
)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}