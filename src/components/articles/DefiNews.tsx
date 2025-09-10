'use client';
import { NewsItem } from '@/types/Messari';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
export default function DefiNews({ marketNews }: { marketNews: NewsItem[] }) {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const t = useTranslations('Articles.defiNews');
  // Filter blockchain news and take first 11 items (2 featured + 9 regular)
  const blockchainNews = marketNews
    .filter(
      item =>
        item.title.toLowerCase().includes('blockchain') ||
        item.content.toLowerCase().includes('blockchain') ||
        item.tags?.some(tag => tag.toLowerCase().includes('blockchain')),
    )
    .slice(0, 11);

  const featuredCards = blockchainNews.slice(0, 2);
  const regularCards = blockchainNews.slice(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#07153b] dark:text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#07153b] dark:bg-white rounded-sm"></span>
        {t('title')}
      </h2>

      {/* Two Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredCards.map(item => (
          <Link key={item.id} href={`/${locale}/articles/${item.id}`} passHref>
            <div className="dark:bg-[#07153b] bg-[#DAE6EA] shadow-lg rounded-xl border border-slate-600/50 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer">
              {item.previewImage && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
              <div className="p-5 space-y-3">
                {item.tags?.[0] && (
                  <span className="text-xs px-3 py-1 bg-[#EC3B3B]/20 text-[#EC3B3B] rounded-full font-medium inline-block">
                    {item.tags[0].toUpperCase()}
                  </span>
                )}
                <h2 className="text-xl text-[#07153b] dark:text-[#FFF] font-bold line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-sm text-[#07153b] dark:text-[#DAE6EA]/80 line-clamp-3">
                  {item.content}
                </p>
                <div className="text-xs text-[#07153b] dark:text-[#DAE6EA]/60">
                  {new Date(item.published_at).toLocaleDateString()} • by{' '}
                  {item.author?.name || 'Unknown'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 3x3 Grid of Regular Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {regularCards.map(item => (
          <Link key={item.id} href={`/${locale}/articles/${item.id}`} passHref>
            <div className="dark:bg-[#07153b] bg-[#DAE6EA] shadow-md rounded-lg border border-slate-600/30 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer h-full">
              {item.previewImage && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                {item.tags?.[0] && (
                  <span className="text-[10px] px-2 py-0.5 bg-[#EC3B3B]/10 text-[#EC3B3B] rounded-full font-medium inline-block">
                    {item.tags[0].toUpperCase()}
                  </span>
                )}
                <h2 className="text-base text-[#07153b] dark:text-[#FFF] font-semibold line-clamp-2">
                  {item.title}
                </h2>
                <div className="text-xs text-[#07153b] dark:text-[#DAE6EA]/60">
                  {new Date(item.published_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
