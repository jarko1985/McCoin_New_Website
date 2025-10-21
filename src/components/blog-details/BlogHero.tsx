"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlogHeroProps {
  title: string;
  image: string;
  author: string;
  publishDate: string;
  category: string;
  locale: string;
}

export default function BlogHero({ title, image, author, publishDate, category, locale }: BlogHeroProps) {
  const router = useRouter();

  const handleBackToBlogs = () => {
    router.push(`/${locale}/blog`);
  };
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        
        {/* Enhanced Floating decorations */}
        {/* Top decorations */}
        <div className="absolute top-8 right-12 w-24 h-24 bg-[#EC3B3B]/30 rounded-full blur-sm animate-float" />
        <div className="absolute top-20 right-32 w-16 h-16 bg-[#EC3B3B]/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-12 left-20 w-20 h-20 bg-[#DAE6EA]/25 rounded-full blur-md animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-32 left-8 w-12 h-12 bg-[#DAE6EA]/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Middle decorations */}
        <div className="absolute top-1/3 right-8 w-14 h-14 bg-gradient-to-br from-[#EC3B3B]/30 to-[#DAE6EA]/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-16 w-18 h-18 bg-[#EC3B3B]/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 right-24 w-10 h-10 bg-[#DAE6EA]/35 rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
        
        {/* Bottom decorations */}
        <div className="absolute bottom-24 left-12 w-22 h-22 bg-[#DAE6EA]/25 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 right-20 w-16 h-16 bg-[#EC3B3B]/30 rounded-full animate-float" style={{ animationDelay: '1.8s' }} />
        <div className="absolute bottom-32 left-32 w-14 h-14 bg-gradient-to-tr from-[#EC3B3B]/25 to-[#DAE6EA]/25 rounded-full blur-md animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-8 right-8 w-20 h-20 bg-[#DAE6EA]/20 rounded-full animate-float" style={{ animationDelay: '2.2s' }} />
        
        {/* Small accent decorations */}
        <div className="absolute top-24 right-48 w-6 h-6 bg-[#DAE6EA]/20 rounded-full animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-40 left-40 w-8 h-8 bg-[#DAE6EA]/15 rounded-full blur-sm animate-float" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-40 left-48 w-5 h-5 bg-[#EC3B3B]/40 rounded-full animate-float" style={{ animationDelay: '1.7s' }} />
      </div>

      {/* Back to Blogs Button */}
      <div className="xl:max-w-[70%] mx-auto mt-8 relative z-10">
        <div className="flex justify-start mb-4">
          <Button
            onClick={handleBackToBlogs}
            variant="ghost"
            className="flex items-center gap-2 px-6 py-3 text-[#DAE6EA] hover:text-white hover:bg-[#EC3B3B] transition-all duration-300 transform hover:scale-105 border border-[#DAE6EA]/20 hover:border-[#EC3B3B]/40 rounded-xl shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Blogs</span>
          </Button>
        </div>
      </div>

      {/* Blog Metadata */}
      <div className="xl:max-w-[70%] mx-auto relative z-10">
        <div className="bg-[#07153B] border border-[#DAE6EA]/20 rounded-2xl p-4 shadow-4xl">
          <div className="flex flex-wrap items-center gap-6 text-[#DAE6EA]/80 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#EC3B3B] rounded-full mr-3 animate-pulse" />
              <span className="text-sm">Written by <span className="text-[#EC3B3B] font-medium">{author}</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#DAE6EA] rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm">{publishDate}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-[#EC3B3B] to-[#DAE6EA] rounded-full mr-3 animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm text-[#DAE6EA]/90 font-medium">{category}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#DAE6EA] leading-tight slide-in-up">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
