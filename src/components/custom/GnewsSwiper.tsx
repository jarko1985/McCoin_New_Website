"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content: string;
}

const GnewsSwiper = () => {
  const params = useParams();
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgErrorSet, setImgErrorSet] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/${locale}/api/gnews`);
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

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Local News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col h-[500px] bg-[#020817] rounded-lg overflow-hidden border border-gray-700 p-4">
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

  if (error) return <div className="py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Top News</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        centeredSlides={false}
        allowTouchMove={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="news-swiper"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.url} className="pb-10">
            <Link
              href={`http://localhost:3000/${locale}/top-news/${encodeURIComponent(article.url)}?source=gnews`}
              className="flex flex-col h-full bg-[#07153b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-500"
              style={{ height: "100%" }}
            >
              {/* Image Section */}
              <div className="relative h-48 w-full bg-gray-700 shrink-0">
                {!imgErrorSet[article.url] ? (
                  <Image
                    src={article.image || "/placeholder-news.jpg"}
                    alt={article.title}
                    fill
                    onError={() =>
                      setImgErrorSet((prev) => ({ ...prev, [article.url]: true }))
                    }
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center text-sm text-white">
                    Image not available
                  </div>
                )}

                {/* ✅ Source Badge using shadcn */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-[#EC3B3B] text-white">
                    {article.source.name}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-5 min-h-[220px]">
                <span className="text-[#EC3B3B] text-xs font-semibold uppercase tracking-wider mb-2">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>

                <h2 className="text-lg text-white font-bold mb-2 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-[#8A939B] text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs text-[#8A939B]">
                  <span>By {article.source.name}</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GnewsSwiper;
