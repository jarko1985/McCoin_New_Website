'use client';
import Image from 'next/image';
import { NewsItem } from '@/types/Messari';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
export default function MarketAndTradingNews({ newsItems }: { newsItems: NewsItem[] }) {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const t = useTranslations('Articles.marketTradingNews');
  const tradingNews = newsItems.filter(
    item =>
      item.title.toLowerCase().includes('trade') ||
      item.content.toLowerCase().includes('trade') ||
      item.tags?.some(tag => tag.toLowerCase().includes('trade')),
  );
  const marketNews = newsItems.filter(
    item =>
      item.title.toLowerCase().includes('market') ||
      item.content.toLowerCase().includes('market') ||
      item.tags?.some(tag => tag.toLowerCase().includes('market')),
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-[#07153b] dark:text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#07153b] dark:bg-white rounded-sm"></span>
        {t('title')}
      </h2>

      {/* Top Row - 2 Larger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tradingNews.slice(0, 2).map(news => (
          <Link key={news.id} href={`/${locale}/articles/${news.id}`} passHref>
            <div
              key={news.id}
              className="bg-[#DAE6EA] dark:bg-[#07153b] shadow-xl overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300 border border-slate-400 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
                <Image
                  src={news.previewImage || '/placeholder-market.jpg'}
                  alt={news.title || 'Market news'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#07153b] dark:text-[#FFF] mb-3 line-clamp-2">
                  {news.title}
                </h3>

                {/* Content snippet */}
                <p className="text-[#07153b] dark:text-[#DAE6EA] mb-4 line-clamp-3">
                  {news.content?.slice(0, 150)}...
                </p>

                {/* Read More */}
                <span className="text-[#EC3B3B] font-medium mb-4 hover:underline cursor-pointer">
                  {t('viewMore')}
                </span>

                {/* Meta info */}
                <div className="flex flex-col justify-between items-start text-sm text-[#07153b] dark:text-[#DAE6EA] border-t pt-3">
                  <div>
                    <span>{t('by')} {news.author?.name || 'Unknown'}</span>
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
                    <p className="mr-2">{t('tags')}</p>
                    {news.tags?.slice(0, 3).map((tag, index) => (
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

      {/* Bottom Row - 3 Smaller Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {marketNews.slice(2, 5).map(news => (
          <Link key={news.id} href={`/${locale}/articles/${news.id}`} passHref>
            <div
              key={news.id}
              className="dark:bg-[#07153b] bg-[#DAE6EA] shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg border border-slate-400 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-video group-hover:scale-105 transition-all duration-500">
                <Image
                  src={news.previewImage || '/placeholder-market.jpg'}
                  alt={news.title || 'Market news'}
                  fill
                  className="object-contain h-fit"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-[#07153b] dark:text-[#FFF] mb-2 line-clamp-2">
                  {news.title}
                </h3>

                {/* Content snippet */}
                <p className="text-[#07153b] dark:text-[#DAE6EA] mb-3 text-sm line-clamp-2">
                  {news.content?.slice(0, 100)}...
                </p>

                {/* Read More */}
                <span className="text-[#EC3B3B] text-sm font-medium mb-3 hover:underline cursor-pointer">
                  {t('viewMore')}
                </span>

                {/* Meta info */}
                <div className="flex flex-col justify-between items-start text-xs text-[#07153b] dark:text-[#DAE6EA] border-t pt-2">
                  <div>
                    <span>{t('by')} {news.author?.name || 'Unknown'}</span>
                    <span className="mx-1">•</span>
                    <span>
                      {new Date(news.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mt-2">
                    <p className="mr-2">{t('tags')}</p>
                    {news.tags?.slice(0, 2).map((tag, index) => (
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
