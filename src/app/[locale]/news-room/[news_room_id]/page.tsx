import { notFound } from 'next/navigation';
import { NewsData } from '../../../../../utils/data';
import Image from 'next/image';
import ShareBanner from '@/components/custom/ShareBanner';
import type { StaticImageData } from 'next/image';

// Update the PageProps interface to use Promise for params
interface PageProps {
  params: Promise<{
    locale?: string;
    news_room_id: string
  }>
}

interface NewDetailsProps {
  id: string;
  imgSRC: StaticImageData;
  title: string;
  author: string;
  description: string;
  category: string;
  difficutly: string;
  date: string;
  ret: string;
}

export async function generateMetadata({ params }: PageProps) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;
  const newsItem = NewsData.find(item => item.id.toString() === resolvedParams.news_room_id) as NewDetailsProps | undefined;
  
  return {
    title: newsItem?.title || 'News',
    description: newsItem?.description || 'News details',
  };
}

const NewsDetailsPage = async({ params }: PageProps) => {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;
  const newsItem = NewsData.find(item => item.id.toString() === resolvedParams.news_room_id) as NewDetailsProps | undefined;
  
  if (!newsItem) {
    notFound();
  }

  return (
    <section className="container py-12 xl:max-w-[70%] mx-auto px-4">
      <ShareBanner title= {newsItem.title}/>
      <div className="bg-[#07153b] rounded-lg overflow-hidden shadow-lg border border-slate-500">
        <div className="relative h-96 w-full">
          <Image
            src={newsItem.imgSRC}
            alt={newsItem.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 bg-[#EC3B3B] text-white text-sm rounded-full">
              {newsItem.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#EC3B3B] text-sm font-semibold">
              Difficulty: {newsItem.difficutly}
            </span>
            <span className="text-[#8A939B] text-sm">
              {newsItem.date} • {newsItem.ret} reads
            </span>
          </div>

          <h1 className="text-3xl text-white font-bold mb-6">
            {newsItem.title}
          </h1>

          <div className="prose prose-invert max-w-none text-[#DAE6EA]">
            <p className="text-lg mb-6">{newsItem.description}</p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-500">
            <p className="text-[#8A939B]">Written by {newsItem.author}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsDetailsPage;
