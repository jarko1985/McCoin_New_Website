// components/RetroCinemaSwiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

const images = [
  '/images/scr1.png',
  '/images/scr2.png',
  '/images/scr3.png',
  '/images/scr4.png',
];

export default function RetroCinemaSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Swiper
        modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: idx === activeIndex ? 1 : 0.4,
                  scale: idx === activeIndex ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={cn(
                  'rounded-xl  overflow-hidden transition-all duration-500',
                  idx === activeIndex
                    ? ''
                    : 'border border-[#07153b] blur-sm'
                )}
              >
                <Image
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  width={500}
                  height={200}
                  className="object-contain w-[500px] h-[300px]"
                />
                <div className="pointer-events-none absolute inset-0 z-10">
                  <Image
                    src="/images/tablet_frame.png"
                    alt="Cinema frame"
                    fill
                    className="object-cover w-full"
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
