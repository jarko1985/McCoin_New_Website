'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PodcastSeries {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  rssUrl: string;
  genres: string[];
}

interface AllSeriesProps {
  series: PodcastSeries[];
}

export default function AllSeries({ series }: AllSeriesProps) {
  if (!series?.length) return null;

  return (
    <section className="xl:max-w-[70%] mx-auto bg-[#07153b] px-4 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          All Series
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((item) => (
            <SeriesCard key={item.uuid} series={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SeriesCard({ series }: { series: PodcastSeries }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-[#0b1d4b] hover:bg-[#102050] rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      <div className="relative w-full h-48">
        <Image
          src={
            imgError || !series.imageUrl
              ? '/images/fallback-image.jpeg'
              : series.imageUrl
          }
          alt={series.name}
          fill
          onError={() => setImgError(true)}
          className="object-cover"
        />
      </div>
      <div className="p-4 text-white">
        <h3 className="text-lg font-bold mb-1">{series.name}</h3>
        <p className="text-sm text-white/80 line-clamp-3">
          {series.description.replace(/\n/g, ' ')}
        </p>
      </div>
    </div>
  );
}
