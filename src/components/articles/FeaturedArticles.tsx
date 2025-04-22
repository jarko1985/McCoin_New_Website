import { NewsItem } from "@/types/Messari";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { format } from "date-fns";

export function FeaturedArticles({ news }: { news: NewsItem }) {
  return (
    <div className="mb-12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {news.previewImage && (
          <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden">
            <Image
              src={news.previewImage}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full text-white" >
              Featured
            </span>
            <span className="text-sm text-white">
              {format(new Date(news.published_at), "MMM d, yyyy")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{news.title}</h2>
          <p className="text-gray-200 mb-6 line-clamp-3">
            {news.content}
          </p>
          <Button asChild>
            <Link
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              Read Full Story
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}