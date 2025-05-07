'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Play, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Podcast {
  id: string;
  title: string;
  description: string;
  webUrl: string;
  imageUrl: string;
  followers?: number;
  subscribers?: number;
}

export default function PodcastHero() {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`/${locale}/api/podcasts`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        const podcastsWithStats = data.map((podcast: Podcast) => ({
          ...podcast,
          followers: podcast.followers || Math.floor(Math.random() * 1000),
          subscribers: podcast.subscribers || Math.floor(Math.random() * 5000)
        }));
        setPodcasts(podcastsWithStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [locale]);

  if (isLoading) {
    return <div className="h-[50vh] flex items-center justify-center bg-gray-200">Loading...</div>;
  }

  if (error) {
    return <div className="h-[50vh] flex items-center justify-center bg-gray-200">Error: {error}</div>;
  }

  if (!podcasts.length) {
    return <div className="h-[50vh] flex items-center justify-center bg-gray-200">No podcasts found</div>;
  }

  return (
    <div className="w-full">
      {/* Background image with tint - full width */}
      <div 
        className="h-[50vh] w-full bg-cover bg-no-repeat bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${podcasts[activeSlideIndex]?.imageUrl})`,
          filter: 'brightness(0.5)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 h-[50vh] bg-gradient-to-t from-[#07153b]/30 to-[#07153b]/30" />
      
      {/* Content container - centered */}
      <div className="absolute inset-0 flex items-center justify-center h-[50vh]">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
            className="w-full max-w-6xl"
          >
            {podcasts.map((podcast) => (
              <SwiperSlide key={podcast.id}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Square image */}
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative aspect-square w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-xl">
                      <Image
                        src={podcast.imageUrl}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-[#EC3B3B] rounded-full">
                        PODCAST
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {podcast.title}
                    </h1>
                    
                    <p className="text-lg text-[#DAE6EA] mb-6">
                      {podcast.description.substring(0, 120)}...
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
                      <span className="text-[#DAE6EA]">{podcast.followers} followers</span>
                      <span className="hidden sm:block text-[#DAE6EA]">•</span>
                      <span className="text-[#DAE6EA]">{podcast.subscribers} subscribers</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                      <Button className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white px-6 py-4 rounded-full cursor-pointer">
                        <Play className="mr-2 h-4 w-4" /> PLAY EPISODE
                      </Button>
                      <Button variant="outline" className="text-[#07153b] hover:text-white hover:bg-[#07153b] px-6 py-4 rounded-full cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" /> SUBSCRIBE
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


      <div className="-mt-8 z-10 flex justify-center">
        <div className="swiper-pagination bottom-0" />
      </div>
    </div>
  );
}