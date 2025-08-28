'use client';

import Image from 'next/image';

interface PodcastSeries {
  uuid: string;
  name: string;
  imageUrl: string;
}

interface FeaturedSeriesProps {
  series: PodcastSeries[];
}

export default function FeaturedSeries({ series }: FeaturedSeriesProps) {
  if (!series?.length) return null;

  return (
    <section className="xl:max-w-[70%] mx-auto px-4 xl:py-12 py-8">
      <h2 className="text-2xl md:text-3xl text-center lg:text-left font-semibold text-[#FFF] mb-8">
        Featured Series
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center justify-center">
        {series.map(item => (
          <div
            key={item.uuid}
            className="flex-none w-[200px] h-[200px] rounded-lg overflow-hidden shadow-md bg-white"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={200}
              height={200}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
