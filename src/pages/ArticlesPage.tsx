"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewsItem } from "@/types/Messari";
import NewsHero from "@/components/articles/ArticlesHero";
import DefiNews from "@/components/articles/DefiNews";
import BitcoinNews from "@/components/articles/BitcoinNews";
import MarketAndTradingNews from "@/components/articles/MarketAndTradingNews";
import AllArticlesNews from "@/components/articles/AllArticles";

export default function ArticlesPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale?.toString() || "en";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/${locale}/api/messari`);

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();
        setNews(data);
        
        // Set the first news item with an image as featured
        const firstWithImage = data.find((item: NewsItem) => item.previewImage);
        setFeaturedNews(firstWithImage || data[0]);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [locale]);

  if (error) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <NewsHero news={news}/>
    <DefiNews marketNews={news}/>
    <BitcoinNews newsItems={news}/>
    <MarketAndTradingNews newsItems={news}/>
    <AllArticlesNews newsItems={news}/>
    </>
  );
}