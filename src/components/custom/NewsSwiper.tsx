"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { NewsData } from "../../../utils/data";
import { Badge } from "../ui/badge";
import Link from "next/link";

const NewsSwiper = () => {
  return (
    <div className="py-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={5000}
        centeredSlides={false}
        allowTouchMove={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="news-swiper"
      >
        {NewsData.map((el) => (
          <SwiperSlide key={el.id} className="pb-10">
            <Link href={`/news-room/${el.id}`} className="flex flex-col h-full bg-[#07153b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-500">
              <div className="relative h-48 w-full">
                <Image 
                  src={el.imgSRC} 
                  alt={el.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Badge className="absolute top-2 right-2 bg-[#EC3B3B] text-white">{el.difficutly}</Badge>
              </div>
              
             
              <div className="flex flex-col flex-grow p-5">
                <span className="text-[#EC3B3B] text-xs font-semibold uppercase tracking-wider mb-2">
                  {el.category}
                </span>
                <h2 className="text-lg text-white font-bold mb-3 line-clamp-2">
                  {el.title}
                </h2>
                <p className="text-[#8A939B] text-sm mb-4 line-clamp-3">
                  {el.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-xs text-[#8A939B]">
                  <span>By {el.author}</span>
                  <div className="flex items-center space-x-3">
                    <span>{el.date}</span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {el.ret}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsSwiper;