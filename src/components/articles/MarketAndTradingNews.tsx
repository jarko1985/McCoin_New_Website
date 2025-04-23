// components/MarketAndTradingNews.tsx
import Image from "next/image";
import { NewsItem } from "@/types/Messari";

export default function MarketAndTradingNews({
  newsItems,
}: {
  newsItems: NewsItem[];
}) {

   const tradingNews =  newsItems.filter(item => 
    item.title.toLowerCase().includes('trade') || 
    item.content.toLowerCase().includes('trade') ||
    item.tags?.some(tag => tag.toLowerCase().includes('trade'))
  );     
  const marketNews = newsItems.filter(item => 
    item.title.toLowerCase().includes('market') || 
    item.content.toLowerCase().includes('market') ||
    item.tags?.some(tag => tag.toLowerCase().includes('market'))
  );     

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
        Market & Trading
      </h2>

      {/* Top Row - 2 Larger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tradingNews.slice(0,2).map((news) => (
          <div
            key={news.id}
            className="bg-white shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={news.previewImage || "/placeholder-market.jpg"}
                alt={news.title || "Market news"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-[#07153b] mb-3 line-clamp-2">
                {news.title}
              </h3>

              {/* Content snippet */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {news.content?.slice(0, 150)}...
              </p>

              {/* Read More */}
              <button className="text-[#EC3B3B] font-medium mb-4 hover:underline">
                View More
              </button>

              {/* Meta info */}
              <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                <div>
                  <span>by {news.author?.name || "Unknown"}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(news.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>1.5k views</span>
                  <span>•</span>
                  <span>64 comments</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row - 3 Smaller Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {marketNews.slice(2,5).map((news) => (
          <div
            key={news.id}
            className="bg-white shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={news.previewImage || "/placeholder-market.jpg"}
                alt={news.title || "Market news"}
                fill
                className="object-contain h-fit"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-[#07153b] mb-2 line-clamp-2">
                {news.title}
              </h3>

              {/* Content snippet */}
              <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                {news.content?.slice(0, 100)}...
              </p>

              {/* Read More */}
              <button className="text-[#EC3B3B] text-sm font-medium mb-3 hover:underline">
                View More
              </button>

              {/* Meta info */}
              <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2">
                <div>
                  <span>by {news.author?.name || "Unknown"}</span>
                  <span className="mx-1">•</span>
                  <span>
                    {new Date(news.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>856 views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
