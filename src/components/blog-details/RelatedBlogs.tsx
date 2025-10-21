"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { blogPosts } from '../../../utils/data';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RelatedBlogsProps {
  currentBlogId: number;
  category: string;
}

export default function RelatedBlogs({ currentBlogId, category }: RelatedBlogsProps) {
  const router = useRouter();
  
  // Use the same blog data from the main blog page
  const filteredBlogs = blogPosts
    .filter(blog => blog.id !== currentBlogId)
    .slice(0, 6);

  const handleBlogClick = (blogId: number) => {
    router.push(`/en/blog/${blogId}`);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#DAE6EA] mb-4 slide-in-up">
              Related Articles
            </h3>
            <p className="text-[#DAE6EA]/70 text-lg max-w-2xl mx-auto">
              Discover more insights and stay updated with our latest content
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
                bulletClass: 'swiper-pagination-bullet-custom',
                bulletActiveClass: 'swiper-pagination-bullet-active-custom',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="pb-16"
            >
              {filteredBlogs.map((blog, index) => (
                <SwiperSlide key={blog.id}>
                  <Card 
                    className="group bg-[#07153B] border border-[#DAE6EA]/20 hover:border-[#EC3B3B]/40 transition-all duration-500 transform hover:scale-105 hover:shadow-4xl hover:shadow-black/50 overflow-hidden cursor-pointer fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleBlogClick(blog.id)}
                  >
                      <div className="relative overflow-hidden">
                        <Image 
                          src={blog.image} 
                          alt={blog.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 shadow-lg">
                            {blog.category.charAt(0).toUpperCase() + blog.category.slice(1).replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="w-8 h-8 bg-[#DAE6EA]/20 rounded-full flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-[#DAE6EA]" />
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-[#DAE6EA]/70 text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          {blog.publishDate}
                        </div>
                        
                        <h4 className="text-lg font-bold text-[#DAE6EA] mb-3 line-clamp-2 group-hover:text-[#EC3B3B] transition-colors duration-300">
                          {blog.title}
                        </h4>
                        
                        <p className="text-[#DAE6EA]/80 text-sm leading-relaxed line-clamp-3">
                          {blog.description}
                        </p>
                      </CardContent>
                    </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#DAE6EA]/10 hover:bg-[#DAE6EA]/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm">
              <ArrowRight className="h-5 w-5 text-[#DAE6EA] rotate-180" />
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#DAE6EA]/10 hover:bg-[#DAE6EA]/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm">
              <ArrowRight className="h-5 w-5 text-[#DAE6EA]" />
            </div>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(218, 230, 234, 0.3);
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: #EC3B3B;
          transform: scale(1.2);
        }
        
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          display: none;
        }
        
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
