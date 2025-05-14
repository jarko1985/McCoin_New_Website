
"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}

interface PodcastPlayerModalProps {
  open: boolean;
  onClose: () => void;
  episode: PodcastEpisode | null;
}

export default function PodcastPlayerModal({ open, onClose, episode }: PodcastPlayerModalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !episode) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-[#07153b] p-0 overflow-hidden">
        
        <DialogTitle>

        </DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col text-white"
        >
          {/* Image */}
          <div className="relative w-full h-60">
            <Image
              src={episode.imageUrl || "/images/fallback-image.jpeg"}
              alt={episode.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-[#EC3B3B] mb-1">{episode.podcastSeries.name}</p>
            <h2 className="text-2xl font-bold mb-2">{episode.name}</h2>
            <p className="text-white/80 text-sm whitespace-pre-line mb-6">
              {episode.description}
            </p>

            {/* Audio Player */}
            <audio
              controls
              className="w-full rounded-lg bg-white text-black"
              src={episode.audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
