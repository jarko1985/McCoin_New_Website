// components/NewsSwiper.tsx
'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/autoplay';

type Article = {
  title: string;
  content: string;
  description: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  url: string;
};

const categories = [
  { id: 'bitcoin', name: 'Bitcoin News', query: 'bitcoin' },
  { id: 'crypto', name: 'Crypto News', query: 'cryptocurrency' },
  { id: 'trading', name: 'Spot Trading', query: 'spot+trading' },
];

export default function SpotMarketNewsSwiper() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${activeCategory.query}&lang=en&country=us&apikey=d60900866e493f5903e17572327dc6bb`,
        );
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[#050E27] py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-[#DAE6EA] mb-8 text-center"
        >
          Market News
        </motion.h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map(category => (
            <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={activeCategory.id === category.id ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  activeCategory.id === category.id
                    ? 'bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90'
                    : 'bg-transparent text-[#DAE6EA] border-[#DAE6EA] hover:bg-[#DAE6EA]/10'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EC3B3B]"></div>
          </div>
        )}

        {/* News Swiper */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="py-4"
            >
              {articles.map((article, index) => (
                <SwiperSlide key={index}>
                  <motion.div whileHover={{ y: -5 }} className="h-full">
                    <Card className="h-full flex flex-col bg-[#050E27] border border-[#1a2a4a] shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {article.image && (
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={e => {
                              (e.target as HTMLImageElement).src = '/placeholder-news.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-[#DAE6EA] line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-[#DAE6EA]/80">
                          {formatDate(article.publishedAt)} · {article.source.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-[#DAE6EA]/90 line-clamp-3">
                          {article.description || article.content.substring(0, 200)}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full bg-transparent text-[#EC3B3B] border-[#EC3B3B] hover:bg-[#EC3B3B]/10"
                          >
                            Read More
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#DAE6EA] text-lg">No news articles found for this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
