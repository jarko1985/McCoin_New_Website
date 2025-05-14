"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

interface RecentEpisodesProps {
  episodes: PodcastEpisode[];
}

export default function RecentEpisodes({ episodes }: RecentEpisodesProps) {
  if (!episodes?.length) return null;

  return (
    <section className="xl:max-w-[70%] mx-auto bg-[#07153b] px-4 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Recent Episodes
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8">
          {episodes.map((episode) => (
            <EpisodeItem key={episode.uuid} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EpisodeItem({ episode }: { episode: PodcastEpisode }) {
  const [imgError, setImgError] = useState(false);

  const handlePlay = () => {
    const audio = new Audio(episode.audioUrl);
    audio.play();
  };

  return (
    <div className="flex gap-4 bg-[#0b1d4b] p-4 rounded-lg shadow-lg hover:bg-[#102050] transition-colors duration-300">
      <div className="relative w-28 h-28 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={
            imgError || !episode.imageUrl
              ? "/images/fallback-image.jpeg"
              : episode.imageUrl
          }
          alt={episode.name || "Podcast episode"}
          fill
          onError={() => setImgError(true)}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between text-white w-full">
        <div>
          <p className="text-sm text-[#EC3B3B] font-semibold mb-1">
            {episode.podcastSeries?.name}
          </p>
          <h3 className="text-lg font-bold leading-snug mb-1">
            {episode.name}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2">
            {episode.description.replace(/\n/g, " ")}
          </p>
        </div>

        <div className="mt-3">
          <Button
            className="bg-[#EC3B3B] hover:bg-[#d12f2f] text-white"
            size="sm"
            onClick={handlePlay}
          >
            <Play className="mr-2 h-4 w-4" /> Play
          </Button>
        </div>
      </div>
    </div>
  );
}
