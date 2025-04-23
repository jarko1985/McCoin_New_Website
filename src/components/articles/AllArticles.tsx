// components/BitcoinNews.tsx
import Image from "next/image";
import { NewsItem } from "@/types/Messari";

export default function AllArticlesNews({ newsItems }: { newsItems: NewsItem[] }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
        All Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.slice(0, 6).map((news) => (
          <div
            key={news.id}
            className="bg-white shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full aspect-video">
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
              <h3 className="text-xl font-bold text-[#07153b] mb-2 line-clamp-2">
                {news.title}
              </h3>

              {/* Content snippet */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {news.content?.slice(0, 120)}...
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
