// components/testimonials.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const testimonialImages = [
  '/images/emp1.png',
  '/images/emp2.png',
  '/images/emp1.png',
  '/images/emp4.png',
];

export default function Testimonials() {
  const t = useTranslations('HomePage.Testimonials');

  return (
    <section className="dark:bg-[#07153b] bg-[#DAE6EA] py-16 px-4">
      <h1 className="dark:text-white text-[#07153b] lg:text-4xl text-xl font-semibold text-center mb-16">
        {t('title', { brand: 'McCoin' })}
      </h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 4000 }}
        loop
        modules={[Autoplay]}
        className="w-full max-w-7xl mx-auto"
      >
        {[
          { key: 'cameron', image: testimonialImages[0] },
          { key: 'sara', image: testimonialImages[1] },
          { key: 'liam', image: testimonialImages[2] },
          { key: 'emily', image: testimonialImages[3] },
        ].map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative flex flex-col justify-between h-[480px] bg-[#DAE6EA] border  dark:border-white border-[#07153b] rounded-xl pt-24 pb-6 px-6 text-center shadow-xl overflow-hidden">
              {/* Polygon triangle background */}
              <div
                className="absolute top-0 left-0 w-full h-64 bg-[#07153b]"
                style={{ clipPath: 'polygon(47.7% 47.7%, 100% 0%, 0% 0%)' }}
              />

              {/* Avatar centered at triangle bottom */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
                  <Image
                    src={testimonial.image}
                    alt={t(`testimonials.${testimonial.key}.name`)}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 mt-24 flex flex-col items-center">
                {/* Label + Stars */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ThumbsUp className="w-5 h-5 text-[#EC3B3B]" />
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EC3B3B] text-[#EC3B3B]" />
                  ))}
                </div>

                {/* Name, title, quote */}
                <h3 className="font-semibold text-lg text-[#07153b]">
                  {t(`testimonials.${testimonial.key}.name`)}
                </h3>
                <p className="text-sm text-[#07153b]/70 mb-4">
                  {t(`testimonials.${testimonial.key}.designation`)}
                </p>
                <p className="text-[#07153b] italic text-sm max-w-xs mx-auto">
                  "{t(`testimonials.${testimonial.key}.quote`)}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
