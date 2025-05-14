'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PodcastHero from '@/components/podcasts/PodcastHero';
import FeaturedSeries from '@/components/podcasts/FeaturedSeries';
import RecentEpisodes from '@/components/podcasts/RecentEpisodes';
import AllSeries from '@/components/podcasts/AllSeries';
import AnimatedLogo from '@/components/custom/AnimatedLogo';

interface PodcastEpisode {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  podcastSeries: {
    uuid: string;
    name: string;
    genres: string[];
  };
  publishedAt?: string;
}

interface PodcastSeries {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  rssUrl: string;
  genres: string[];
}

interface PodcastData {
  featuredEpisodes: PodcastEpisode[];
  featuredSeries: PodcastSeries[];
  recentEpisodes: PodcastEpisode[];
  allSeries: PodcastSeries[];
}

const PodcastPage = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const [allPodcast, setAllPodcast] = useState<PodcastData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/${locale}/api/podcasts`);
        const data = await res.json();
        setAllPodcast(data);
      } catch (err) {
        console.error('Failed to fetch podcast data', err);
      }
    };
    fetchData();
  }, [locale]);

  if (!allPodcast) {
    return (
      <div className='h-screen'>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
          <AnimatedLogo />
          <p className="text-white font-semibold text-lg animate-pulse mt-4">
            Loading....
          </p>
        </div>
        </div>
    );
  }

  return (
    <div className="relative">
      <PodcastHero featuredEpisodes={allPodcast.featuredEpisodes} />
      <FeaturedSeries series={allPodcast.featuredSeries} />
      <RecentEpisodes episodes={allPodcast.recentEpisodes} />
      <AllSeries series={allPodcast.allSeries} />
    </div>
  );
};

export default PodcastPage;
