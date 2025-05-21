// components/testimonials.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Cameron Lehner",
    designation: "Global Research Strategist",
    image: "/images/emp1.png",
    quote:
      "McCoin's trading platform is remarkably intuitive. I was impressed with how seamless the onboarding experience was.",
  },
  {
    name: "Sara Mitchell",
    designation: "Marketing Director",
    image: "/images/emp2.png",
    quote:
      "The customer service at McCoin is unmatched. They responded instantly and were incredibly helpful in guiding us through the platform.",
  },
  {
    name: "Liam Scott",
    designation: "Product Manager",
    image: "/images/emp1.png",
    quote:
      "We use McCoin daily for trading. The real-time data and transparent interface have made decision-making faster and more confident.",
  },
  {
    name: "Emily Stone",
    designation: "UX Lead",
    image: "/images/emp4.png",
    quote:
      "McCoin is clearly built with the user in mind. The platform is smooth, secure, and incredibly easy to navigate even for beginners.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#07153b] py-16 px-4">
      <h1 className="text-white lg:text-4xl text-xl font-semibold text-center mb-16">
        What <span className="text-[#EC3B3B]">McCoin</span> Users Say
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
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative flex flex-col justify-between h-[480px] bg-[#DAE6EA] border border-white rounded-xl pt-24 pb-6 px-6 text-center shadow-xl overflow-hidden">
              {/* Polygon triangle background */}
              <div
                className="absolute top-0 left-0 w-full h-64 bg-[#07153b]"
                style={{ clipPath: "polygon(47.7% 47.7%, 100% 0%, 0% 0%)" }}
              />

              {/* Avatar centered at triangle bottom */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
                  <Image
                    src={t.image}
                    alt={t.name}
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
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#EC3B3B] text-[#EC3B3B]"
                    />
                  ))}
                </div>

                {/* Name, title, quote */}
                <h3 className="font-semibold text-lg text-[#07153b]">
                  {t.name}
                </h3>
                <p className="text-sm text-[#07153b]/70 mb-4">
                  {t.designation}
                </p>
                <p className="text-[#07153b] italic text-sm max-w-xs mx-auto">
                  "{t.quote}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
