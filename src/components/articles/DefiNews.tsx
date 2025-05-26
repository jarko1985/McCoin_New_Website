// components/NewsLayout.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { NewsItem } from "@/types/Messari";

export default function DefiNews({ marketNews }: { marketNews: NewsItem[] }) {
  const blockchainNews = marketNews.filter(item => 
    item.title.toLowerCase().includes('blockchain') || 
    item.content.toLowerCase().includes('blockchain') ||
    item.tags?.some(tag => tag.toLowerCase().includes('blockchain'))
  );

  const featuredCardNews = blockchainNews[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
        Defi and Blockchain
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Main Column (70%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Featured Card */}
          <Card className="shadow-lg flex flex-col md:flex-row overflow-hidden px-0 py-6 rounded-lg! bg-[#07153b] border! border-slate-600! group cursor-pointer">
            <div className="relative w-full md:w-1/3 aspect-video group-hover:scale-105 transition-all duration-500">
              <Image
                src={featuredCardNews?.previewImage || "/placeholder-news.jpg"}
                alt={featuredCardNews?.title || "Featured news"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="w-full md:w-2/3 p-6">
              <CardHeader>
                <span className="text-sm text-[#EC3B3B] font-semibold">
                  {featuredCardNews?.tags?.[0]?.toUpperCase() || "MARKET NEWS"}
                </span>
                <CardTitle className="text-2xl text-[#FFF]">
                  {featuredCardNews?.title}
                </CardTitle>
                <CardDescription className="text-[#DAE6EA]">
                  {featuredCardNews?.content?.slice(0, 200)}...
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-[#DAE6EA]">
                  <span>
                    {new Date(featuredCardNews?.published_at).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>by {featuredCardNews?.author?.name || "Unknown"}</span>
                </div>
                <div className="flex space-x-2">
                  <span className="text-sm text-[#DAE6EA]">0</span>
                  <span className="text-sm text-[#DAE6EA]">1581</span>
                </div>
              </CardFooter>
            </div>
          </Card>

          {/* Grid of 4 smaller cards in 2x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blockchainNews.slice(1,7).map((news) => (
              <Card
                key={news.id}
                className="border border-slate-600 shadow-sm flex flex-row h-full overflow-hidden px-0 rounded-lg group cursor-pointer bg-[#07153b]"
              >
                <div className="w-1/3 flex items-stretch">
                  <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
                    <Image
                      src={news.previewImage || "/placeholder-news.jpg"}
                      alt={news.title || "News image"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-2/3 flex flex-col justify-between p-4">
                  <div>
                    <span className="text-xs text-[#EC3B3B] font-semibold">
                      {news.tags?.[0]?.toUpperCase() || "NEWS"}
                    </span>
                    <CardTitle className="text-lg text-[#FFF] line-clamp-2">
                      {news.title}
                    </CardTitle>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#DAE6EA]">
                      {new Date(news.published_at).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <span className="text-sm text-[#DAE6EA]">0</span>
                      <span className="text-sm text-[#DAE6EA]">1581</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Side Column (30%) */}
        <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {marketNews.slice(0, 6).map((news) => (
          <Card key={news.id} className="border border-slate-600 shadow-xl overflow-hidden p-0 rounded-lg md:h-full gap-0 group cursor-pointer bg-[#07153b]">
            {/* Image at top - fills width completely */}
            <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
              <Image
                src={news.previewImage || "/placeholder-news.jpg"}
                alt={news.title || "News image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Content below image */}
            <CardHeader className="space-y-1 p-2">
              <CardTitle className="text-[12px] text-[#FFF] line-clamp-2">
                {news.title}
              </CardTitle>
            </CardHeader>
        
            <CardFooter className="p-2">
              <span className="text-sm text-[#DAE6EA]">
                {new Date(news.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
}
