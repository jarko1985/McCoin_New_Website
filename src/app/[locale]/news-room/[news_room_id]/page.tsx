import { notFound } from 'next/navigation';
import { dummyEvents } from '../../../../../utils/data';
import Image from 'next/image';
import ShareBanner from '@/components/custom/ShareBanner';

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

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const event = dummyEvents.find(event => event.id.toString() === resolvedParams.news_room_id) as EventDetailsProps | undefined;

  return {
    title: event?.title || 'Event',
    description: event?.description || 'Event details',
  };
}

const EventDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const event = dummyEvents.find(event => event.id.toString() === resolvedParams.news_room_id) as EventDetailsProps | undefined;

  if (!event) {
    notFound();
  }

  return (
    <section className="container py-12 xl:max-w-[70%] mx-auto px-4">
      <ShareBanner title={event.title} />
      <div className="bg-[#07153b] rounded-lg overflow-hidden shadow-lg border border-slate-500">
        <div className="relative h-96 w-full">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
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
            <span className="text-[#8A939B] text-sm">
              {event.price}
            </span>
          </div>

          <h1 className="text-3xl text-white font-bold mb-6">
            {event.title}
          </h1>

          <div className="prose prose-invert max-w-none text-[#DAE6EA]">
            <p className="text-lg mb-6">{event.description}</p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-500">
            <p className="text-[#8A939B]">Event Location: {event.venue}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
