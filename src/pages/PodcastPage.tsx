"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PodcastHero from "@/components/podcasts/PodcastHero";
import FeaturedSeries from "@/components/podcasts/FeaturedSeries";

interface PodcastSeries {
  uuid: string;
  name: string;
  imageUrl: string;
}

interface PodcastData {
  featuredEpisodes: any[];
  featuredSeries: PodcastSeries[];
  recentEpisodes: any[];
  allSeries: PodcastSeries[];
}

const PodcastPage = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [allPodcast, setAllPodcast] = useState<PodcastData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/${locale}/api/podcasts`);
        const data = await res.json();
        setAllPodcast(data);
      } catch (err) {
        console.error("Failed to fetch podcast data", err);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <div className="relative">
      {allPodcast?.featuredEpisodes && (
        <PodcastHero featuredEpisodes={allPodcast.featuredEpisodes} />
      )}
      {allPodcast?.featuredSeries && (
        <FeaturedSeries series={allPodcast.featuredSeries} />
      )}
    </div>
  );
};

export default PodcastPage;
