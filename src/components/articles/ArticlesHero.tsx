import Image from "next/image";
import { RiArticleFill } from "react-icons/ri";
import { NewsItem } from "@/types/Messari";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function NewsHero({ news }: { news: NewsItem[] }) {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const topNews = news.slice(0, 3);

  return (
    <div className="relative w-full">
      {/* Hero Header */}
      <div className="relative h-96 w-full bg-gray-600">
        <Image
          src="/images/bitcoin_bg.avif"
          alt="News Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <h1 className="text-4xl text-white flex items-center font-semibold">
            <RiArticleFill color="gold" className="mr-2" />
            Articles
          </h1>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 grid grid-cols-1 md:grid-cols-3 gap-0">
          {topNews.map((item, idx) => (
            <Link key={item.id} href={`/${locale}/articles/${item.id}`} passHref>
            <div key={item.id || idx} className="bg-[#07153b] shadow-xl rounded-lg border
             border-slate-600 hover:-translate-y-2 transition-transform duration-400 group cursor-pointer">
              {item.previewImage && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}
              <div className="p-6 space-y-3">
                <h2 className="text-lg text-[#FFF] font-semibold line-clamp-2">{item.title}</h2>
                <p className="text-sm text-[#DAE6EA] line-clamp-3">{item.content}</p>
                <div className="text-xs text-[#DAE6EA] mt-2">
                  {new Date(item.published_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
