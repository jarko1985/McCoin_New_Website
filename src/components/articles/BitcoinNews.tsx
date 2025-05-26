// components/BitcoinNews.tsx
import Image from "next/image";
import { NewsItem } from "@/types/Messari";

export default function BitcoinNews({ newsItems }: { newsItems: NewsItem[] }) {
    const bitcoinNews = newsItems.filter(item => 
        item.title.toLowerCase().includes('bitcoin') || 
        item.content.toLowerCase().includes('bitcoin') ||
        item.tags?.some(tag => tag.toLowerCase().includes('bitcoin'))
      );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
        Bitcoin and other cryptos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bitcoinNews.slice(0,6).map((news) => (
          <div
            key={news.id}
            className="bg-[#07153b] shadow-xl rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-600 group cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
              <Image
                src={news.previewImage || "/placeholder-bitcoin.jpg"}
                alt={news.title || "Bitcoin news"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-[#FFF] mb-2 line-clamp-2">
                {news.title}
              </h3>

              {/* Content snippet */}
              <p className="text-[#DAE6EA] mb-4 line-clamp-3">
                {news.content?.slice(0, 120)}...
              </p>

              {/* Read More */}
              <button className="text-[#EC3B3B] font-medium mb-4 hover:underline">
                View More
              </button>

              {/* Meta info */}
              <div className="flex justify-between items-center text-sm text-[#DAE6EA] border-t pt-3">
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
                  <span>1.2k views</span>
                  <span>•</span>
                  <span>42 comments</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
