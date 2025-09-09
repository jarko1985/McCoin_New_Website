import { notFound } from 'next/navigation';
import Image from 'next/image';
import ShareBanner from '@/components/custom/ShareBanner';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale?: string;
    news_room_id: string;
  }>;
}

interface EventDetailsProps {
  id: number;
  imageUrl: string;
  title: string;
  venue: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: string;
}

// Function to get translated dummyEvents
async function getTranslatedDummyEvents(locale: string) {
  const t = await getTranslations({ locale, namespace: 'NewsRoom.dummyEvents' });
  
  return [
    {
      id: 1,
      title: t('event1.title'),
      startDate: new Date(2018, 3, 12), // April 12, 2018
      endDate: new Date(2018, 4, 10), // May 10, 2018
      venue: t('event1.venue'),
      price: t('event1.price'),
      description: t('event1.description'),
      imageUrl: '/images/event1.jpg',
    },
    {
      id: 2,
      title: t('event2.title'),
      startDate: new Date(2024, 5, 5), // June 5, 2024
      endDate: new Date(2024, 5, 7), // June 7, 2024
      venue: t('event2.venue'),
      price: t('event2.price'),
      description: t('event2.description'),
      imageUrl: '/images/event2.jpg',
    },
    {
      id: 3,
      title: t('event3.title'),
      startDate: new Date(2024, 6, 15), // July 15, 2024
      endDate: new Date(2024, 6, 17), // July 17, 2024
      venue: t('event3.venue'),
      price: t('event3.price'),
      description: t('event3.description'),
      imageUrl: '/images/event3.jpg',
    },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'NewsRoom.detailPage' });
  const dummyEvents = await getTranslatedDummyEvents(locale);
  
  const event = dummyEvents.find(event => event.id.toString() === resolvedParams.news_room_id) as
    | EventDetailsProps
    | undefined;

  return {
    title: event?.title || t('defaultTitle'),
    description: event?.description || t('defaultDescription'),
    openGraph: {
      title: event?.title || t('defaultTitle'),
      description: event?.description || t('defaultDescription'),
      images: ['/og-image.svg'],
      type: 'article',
      url: `https://mc-coin-new-website.vercel.app/${locale}/news-room/${resolvedParams.news_room_id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: event?.title || t('defaultTitle'),
      description: event?.description || t('defaultDescription'),
      images: ['/og-image.svg'],
    },
  };
}

const EventDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'NewsRoom.detailPage' });
  const dummyEvents = await getTranslatedDummyEvents(locale);
  
  const event = dummyEvents.find(event => event.id.toString() === resolvedParams.news_room_id) as
    | EventDetailsProps
    | undefined;

  if (!event) {
    notFound();
  }

  return (
    <section className="container py-12 xl:max-w-[70%] mx-auto px-4">
      <ShareBanner title={event.title} />
      <div className="bg-[#07153b] rounded-lg overflow-hidden shadow-lg border border-slate-500">
        <div className="relative h-96 w-full">
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" priority />
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 bg-[#EC3B3B] text-white text-sm rounded-full">
              {event.venue}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#EC3B3B] text-sm font-semibold">
              {event.startDate.toDateString()} - {event.endDate.toDateString()}
            </span>
            <span className="text-[#8A939B] text-sm">{event.price}</span>
          </div>

          <h1 className="text-3xl text-white font-bold mb-6">{event.title}</h1>

          <div className="prose prose-invert max-w-none text-[#DAE6EA]">
            <p className="text-lg mb-6">{event.description}</p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-500">
            <p className="text-[#8A939B]">{t('eventLocation')}: {event.venue}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
