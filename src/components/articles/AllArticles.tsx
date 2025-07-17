'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { NewsItem } from '@/types/Messari';
import Link from 'next/link';

export default function AllArticlesNews({ newsItems }: { newsItems: NewsItem[] }) {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-[#07153b] dark:text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#07153b] dark:bg-white rounded-sm"></span>
        All Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.slice(0, 6).map(news => (
          <Link key={news.id} href={`/${locale}/articles/${news.id}`} passHref>
            <div
              key={news.id}
              className="dark:bg-[#07153b] bg-[#DAE6EA] shadow-xl rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-600 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
                <Image
                  src={news.previewImage || '/placeholder-bitcoin.jpg'}
                  alt={news.title || 'Bitcoin news'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#07153b] bg:text-[#FFF] mb-2 line-clamp-2">
                  {news.title}
                </h3>

                {/* Content snippet */}
                <p className="text-[#07153b] dark:text-[#DAE6EA] mb-4 line-clamp-3">
                  {news.content?.slice(0, 120)}...
                </p>

                {/* Read More */}
                <Link
                  href={`/${locale}/articles/${news.id}`}
                  className="text-[#EC3B3B] font-medium mb-4 hover:underline"
                >
                  View More
                </Link>

                {/* Meta info */}
                <div className="flex flex-col justify-between items-start text-sm text-[#07153b] dark:text-[#DAE6EA] border-t pt-3">
                  <div>
                    <span>by {news.author?.name || 'Unknown'}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(news.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mt-2">
                    <p className="mr-2">Tags:</p>
                    {news.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-[#EC3B3B] rounded-xl">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
