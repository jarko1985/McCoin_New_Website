"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[];
  description: string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string | null;
  language: string;
  country: string[];
  category: string[];
  sentiment: string;
  sentiment_stats: string;
  ai_tag: string;
  ai_region: string;
  ai_org: string;
  duplicate: boolean;
}

const NewsDataSection = () => {
  const params = useParams();
  const { locale } = useParams() as { locale?: string };
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgErrorSet, setImgErrorSet] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/${locale}/api/newsdata`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, [locale]);

  const handleImageError = (articleId: string) => {
    setImgErrorSet(prev => ({ ...prev, [articleId]: true }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Local News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col h-[500px] bg-[#020817] rounded-lg overflow-hidden border border-gray-700 p-4"
            >
              <Skeleton className="h-48 w-full mb-4 rounded" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-5/6 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="mt-auto flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Local News</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="news-swiper"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.article_id} className="h-auto">
            <div className="flex flex-col h-[500px] bg-[#020817] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
              {/* Image */}
              <div className="relative h-48 w-full shrink-0">
                {article.image_url && !imgErrorSet[article.article_id] ? (
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(article.article_id)}
                  />
                ) : (
                  <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center p-4">
                      <p>No Image Available</p>
                    </div>
                  </div>
                )}
                <Badge className="absolute top-2 right-2 bg-[#EC3B3B] text-white">
                  {article.source_name}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  {article.source_icon && (
                    <Image
                      src={article.source_icon}
                      alt={article.source_name}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  )}
                  <span>{article.source_name}</span>
                </div>
                <Link href={`/${locale}/top-news/${article.article_id}?source=newsdata`}>
               
                <h2 className="text-lg text-white font-bold mb-3 line-clamp-2">
                  
                    {article.title}
                 
                </h2>
                </Link>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 mb-4">
                  {article.category?.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-xs text-gray-400 border-gray-600"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatDate(article.pubDate).date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(article.pubDate).time}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsDataSection;
