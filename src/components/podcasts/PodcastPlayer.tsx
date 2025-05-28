"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaMinus,
  FaTimes,
  FaWindowRestore,
} from "react-icons/fa";

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

export default function PodcastPlayerModal({
  open,
  onClose,
  episode,
}: PodcastPlayerModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!audioRef.current || !episode) return;

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    audio.src = episode.audioUrl;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [episode]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Playback failed:", e));
    }
  };

  const handleForward = () => {
    if (audioRef.current) audioRef.current.currentTime += 10;
  };

  const handleBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= 10;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleClose = () => {
    onClose();
    audioRef.current?.pause();
  }

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isClient || !episode) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      {!isMinimized ? (
        <Dialog
          open={open}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        >
          <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto bg-[#07153b] p-0 rounded-xl">
            <DialogTitle className="hidden" />
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <DialogTitle className="text-white">{episode.name}</DialogTitle>
              <div className="flex gap-2">
                <button
                  onClick={toggleMinimize}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaMinus size={16} />
                </button>
                <button
                  onClick={onClose}
                  
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col text-white"
            >
              <div className="relative w-full h-48 sm:h-60 md:h-72">
                <Image
                  src={episode.imageUrl || "/images/fallback-image.jpeg"}
                  alt={episode.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-[#EC3B3B] mb-1">
                  {episode.podcastSeries.name}
                </p>
                <h2 className="text-2xl font-bold mb-2 break-words">{episode.name}</h2>
                <p className="text-white/80 text-sm whitespace-pre-wrap break-words mb-6">
                  {episode.description}
                </p>

                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleTimeChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white">
                      {isMuted ? (
                        <FaVolumeMute size={20} />
                      ) : (
                        <FaVolumeUp size={20} />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleBackward}
                      className="text-white p-2 hover:bg-white/10 rounded-full"
                    >
                      <FaStepBackward size={20} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="bg-[#EC3B3B] text-white p-3 rounded-full hover:bg-[#EC3B3B]/90"
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <button
                      onClick={handleForward}
                      className="text-white p-2 hover:bg-white/10 rounded-full"
                    >
                      <FaStepForward size={20} />
                    </button>
                  </div>

                  <div className="w-24" />
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="fixed bottom-4 left-4 z-40 w-[320px] h-16 bg-[#07153b] rounded-full shadow-lg px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image
                src={episode.imageUrl || "/images/fallback-image.jpeg"}
                alt={episode.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-white truncate">
                {episode.name}
              </p>
              <p className="text-xs text-white/50 truncate">
                {episode.podcastSeries.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="text-white p-2 hover:bg-white/10 rounded-full"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>
            <button
              onClick={toggleMinimize}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Expand"
            >
              <FaWindowRestore size={16} />
            </button>
            <button
              onClick={() => {
                onClose();
                setIsMinimized(false);
                audioRef.current?.pause();
                audioRef.current = null;
              }}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
