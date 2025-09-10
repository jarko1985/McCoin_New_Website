'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
  FaShuffle,
  FaBackwardStep,
  FaForwardStep,
  FaPlay,
  FaPause,
  FaHeart,
  FaVolumeHigh,
} from 'react-icons/fa6';
import { FaMinus, FaTimes, FaWindowRestore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

import 'swiper/css';
import 'swiper/css/effect-cards';

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
  followers?: number;
  subscribers?: number;
}

interface PodcastMusicPlayerProps {
  open: boolean;
  onClose: () => void;
  episode: PodcastEpisode | null;
  allEpisodes?: PodcastEpisode[];
}

export default function PodcastMusicPlayer({
  open,
  onClose,
  episode,
  allEpisodes = [],
}: PodcastMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const t = useTranslations('Podcast.musicPlayer');

  // Convert single episode to tracks format, or use allEpisodes
  const tracks = useMemo(() => {
    if (allEpisodes.length > 0) {
      return allEpisodes.map(ep => ({
        artist: ep.podcastSeries.name,
        title: ep.name,
        duration: '0:00', // Will be updated when audio loads
        cover: ep.imageUrl,
        src: ep.audioUrl,
        description: ep.description,
        uuid: ep.uuid,
      }));
    } else if (episode) {
      return [
        {
          artist: episode.podcastSeries.name,
          title: episode.name,
          duration: '0:00',
          cover: episode.imageUrl,
          src: episode.audioUrl,
          description: episode.description,
          uuid: episode.uuid,
        },
      ];
    }
    return [];
  }, [episode, allEpisodes]);

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [episodeDurations, setEpisodeDurations] = useState<Record<number, number>>({});

  // Set initial episode index
  useEffect(() => {
    if (episode && tracks.length > 0) {
      const index = tracks.findIndex(track => track.uuid === episode.uuid);
      if (index !== -1) {
        setCurrent(index);
        if (swiperRef.current) {
          swiperRef.current.slideTo(index, 0);
        }
      }
    }
  }, [episode, tracks]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload durations for all episodes
  useEffect(() => {
    if (tracks.length > 0) {
      tracks.forEach((track, index) => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = track.src;
        audio.addEventListener('loadedmetadata', () => {
          setEpisodeDurations(prev => ({ ...prev, [index]: audio.duration || 0 }));
        });
      });
    }
  }, [tracks]);

  // Ensure audio element exists once on client
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
  }, []);

  // Load & optionally play when current index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    audio.src = tracks[current].src;
    audio.volume = volume;
    setIsLoaded(true);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [current, tracks]);

  // Attach audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      const audioDuration = audio.duration || 0;
      setDuration(audioDuration);
      setProgress(audio.currentTime || 0);
      // Store duration for current episode
      setEpisodeDurations(prev => ({ ...prev, [current]: audioDuration }));
    };
    const onTime = () => {
      if (!audio.paused) setProgress(audio.currentTime);
    };
    const onEnded = () => next();

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = async () => {
    if (!isLoaded) setIsLoaded(true);
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (_) {
      setIsPlaying(false);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  const next = () => {
    if (tracks.length > 1) {
      const newIndex = (current + 1) % tracks.length;
      setCurrent(newIndex);
      swiperRef.current?.slideTo(newIndex, 700);
    }
  };

  const prev = () => {
    if (tracks.length > 1) {
      const newIndex = (current - 1 + tracks.length) % tracks.length;
      setCurrent(newIndex);
      swiperRef.current?.slideTo(newIndex, 700);
    }
  };

  const shuffle = () => {
    if (tracks.length <= 1) return;
    let r = Math.floor(Math.random() * tracks.length);
    if (r === current) r = (r + 1) % tracks.length;
    setCurrent(r);
    swiperRef.current?.slideTo(r, 700);
  };

  const onSeek = (val: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val;
    setProgress(val);
  };

  const fmt = (secs: number) => {
    if (!Number.isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleClose = () => {
    pause();
    setIsMinimized(false);
    onClose();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isClient || !episode || tracks.length === 0) return null;

  return (
    <>
      <audio ref={audioRef} />

      {/* Minimized Player */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50 bg-[#07153b] border border-white/20 rounded-xl p-4 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <Image
                src={tracks[current].cover}
                alt={tracks[current].title}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">{tracks[current].title}</p>
                <p className="text-white/60 text-xs truncate">{tracks[current].artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggle}
                  className="text-white hover:text-[#EC3B3B] transition-colors"
                >
                  {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                </button>
                <button
                  onClick={toggleMinimize}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaWindowRestore size={14} />
                </button>
                <button
                  onClick={handleClose}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>
            {/* Mini Progress Bar */}
            <div className="mt-2">
              <input
                type="range"
                min={0}
                max={Math.max(1, duration)}
                value={progress}
                onChange={e => onSeek(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Player Modal */}
      {!isMinimized && open && (
        <div className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center bg-[#001124]">
          {/* Background image */}
          <div className="bg-[conic-gradient(at_top_left,_#07153B,_#0A1B44,_#0E2A6D,_#07153B)]" />

          {/* Main glass container */}
          <main className="group relative w-[90vw] h-[90vh] rounded-2xl overflow-hidden shadow-md">
            {/* floating circles */}
            <div className="pointer-events-none absolute size-[250px] -left-[5%] -top-[3%] rounded-full bg-[#5768af] transition-all duration-[5000ms] group-hover:left-[85%] group-hover:scale-110 group-hover:bg-[#a0acbd]" />
            <div className="pointer-events-none absolute size-[250px] -right-[5%] -bottom-[3%] rounded-full bg-[#ab4c72] transition-all duration-[5000ms] group-hover:right-[85%] group-hover:scale-110 group-hover:bg-[#bda5ad]" />

            {/* McCoin Exclusives Ribbon */}
            <div className="absolute top-0 left-0 z-30 w-32 h-32 overflow-hidden">
              <div className="bg-gradient-to-r from-[#EC3B3B] to-[#d63031] text-white text-xs font-bold py-2 px-1 transform translate-y-[25px] shadow-lg whitespace-nowrap">
                {t('mccoinExclusives')}
              </div>
            </div>

            {/* Header Controls */}
            <div className="absolute top-4 right-4 z-30 flex gap-2">
              <button
                onClick={toggleMinimize}
                className="text-white/70 hover:text-white transition-colors bg-black/20 rounded-full p-2"
              >
                <FaMinus size={16} />
              </button>
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors bg-black/20 rounded-full p-2"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* content */}
            <section className="absolute inset-0 z-10 text-[#e5e5e5] grid grid-cols-1 place-items-center bg-[rgba(53,54,72,0.2)] backdrop-blur-md border border-white/50 rounded-2xl [box-shadow:inset_0_0.5px_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.1)] overflow-y-auto p-8 md:p-10 pb-1 mc-scroll">
              {/* slider + playlist */}
              <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-[45%_55%] items-start gap-8">
                {/* Slider */}
                <div className="mx-auto w-[300px] sm:w-[270px] md:w-[300px]">
                  {tracks.length > 1 ? (
                    <Swiper
                      effect="cards"
                      grabCursor
                      speed={700}
                      initialSlide={current}
                      modules={[EffectCards]}
                      cardsEffect={{ perSlideOffset: 9, perSlideRotate: 3 }}
                      onSwiper={s => (swiperRef.current = s)}
                      onSlideChange={s => {
                        const idx = s.realIndex;
                        if (idx !== current) {
                          setCurrent(idx);
                          setTimeout(() => play(), 0);
                        }
                      }}
                      className="select-none"
                    >
                      {tracks.map((t, i) => (
                        <SwiperSlide key={i}>
                          <div className="grid grid-rows-[4fr_1fr] p-4 rounded-lg bg-[#d3d2d6] text-[#222224] [box-shadow:inset_0_0.5px_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.1)]">
                            <div className="mb-3 aspect-square overflow-hidden rounded">
                              <Image
                                src={t.cover}
                                alt={`${t.artist} cover`}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover pointer-events-none"
                              />
                            </div>
                            <h1 className="mx-auto w-max font-['Permanent_Marker',cursive] uppercase tracking-[2px] -rotate-3 text-sm sm:text-base">
                              {t.artist}
                            </h1>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    // Single episode display
                    <div className="grid grid-rows-[4fr_1fr] p-4 rounded-lg bg-[#d3d2d6] text-[#222224] [box-shadow:inset_0_0.5px_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.1)]">
                      <div className="mb-3 aspect-square overflow-hidden rounded">
                        <Image
                          src={tracks[0].cover}
                          alt={`${tracks[0].artist} cover`}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover pointer-events-none"
                        />
                      </div>
                      <h1 className="mx-auto w-max font-['Permanent_Marker',cursive] uppercase tracking-[2px] -rotate-3 text-sm sm:text-base">
                        {tracks[0].artist}
                      </h1>
                    </div>
                  )}
                </div>

                {/* Playlist / Episode Info */}
                <div className="w-full">
                  {tracks.length > 1 ? (
                    // Multiple episodes
                    tracks.map((t, i) => (
                      <button
                        key={i}
                        className={`grid w-full grid-cols-[15%_65%_15%_5%] items-center gap-2 border-b-2 border-[#6490f6] px-3 py-2 mb-4 text-left hover:bg-white/10 rounded ${
                          current === i ? 'bg-[rgba(149,153,186,0.4)]' : ''
                        }`}
                        onClick={() => {
                          setCurrent(i);
                          swiperRef.current?.slideTo(i, 700);
                          play();
                        }}
                      >
                        <div className="w-[70%] aspect-square overflow-hidden rounded">
                          <Image
                            src={t.cover}
                            alt=""
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="leading-tight">
                          <p className="font-medium">{t.artist}</p>
                          <p className="opacity-50 font-light">{t.title}</p>
                        </div>
                        <p className="justify-self-end">
                          {episodeDurations[i] ? fmt(episodeDurations[i]) : '0:00'}
                        </p>
                        <span
                          className="justify-self-end"
                          onClick={e => {
                            e.stopPropagation();
                            setLiked(prev => ({ ...prev, [i]: !prev[i] }));
                          }}
                        >
                          <FaHeart className={liked[i] ? 'text-white' : 'text-white/60'} />
                        </span>
                      </button>
                    ))
                  ) : (
                    // Single episode info
                    <div className="space-y-4">
                      <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">{tracks[0].title}</h2>
                        <p className="text-lg opacity-80 mb-4">{tracks[0].artist}</p>
                        {tracks[0].description && (
                          <p className="text-sm opacity-70 leading-relaxed">
                            {tracks[0].description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Episode Description */}
              {tracks[current]?.description && (
                <div className="w-full max-w-[74rem] mt-2 mb-24 px-4">
                  <div className="bg-[rgba(5,9,51,0.3)] backdrop-blur-md border border-white/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('aboutThisEpisode')}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {tracks[current].description}
                    </p>
                  </div>
                </div>
              )}

              {/* Player sticky */}
              <div className="sticky mt-2  bottom-0 left-0 z-20 w-full max-w-6xl rounded-xl border border-white/30 bg-[#07153b] backdrop-blur-md shadow-[2px_2px_10px_2px_rgba(0,0,0,0.25)] flex flex-col items-center px-4 pt-4 overflow-hidden">
                <div className="flex items-center justify-center gap-6 sm:gap-8">
                  {tracks.length > 1 && (
                    <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={shuffle}>
                      <FaShuffle />
                    </button>
                  )}
                  {tracks.length > 1 && (
                    <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={prev}>
                      <FaBackwardStep />
                    </button>
                  )}

                  <button
                    className="grid place-items-center size-11 rounded-full border-2 border-white/30 bg-[#e5e5e5] text-[#6490f6] shadow-[0_10px_20px_rgba(5,36,28,0.3)] text-xl"
                    onClick={toggle}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>

                  {tracks.length > 1 && (
                    <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={next}>
                      <FaForwardStep />
                    </button>
                  )}

                  <div className="relative ml-2 flex items-center">
                    <FaVolumeHigh className="text-white/90 text-[1.1rem]" />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      defaultValue={100}
                      onChange={e => setVolume(Number(e.target.value) / 100)}
                      className="mc-vol absolute left-7 top-[6px] w-[120px] hidden sm:block"
                    />
                  </div>
                </div>

                <div className="mt-6 flex w-full items-center justify-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(1, episodeDurations[current] || duration)}
                    value={
                      isPlaying && audioRef.current?.src === tracks[current]?.src ? progress : 0
                    }
                    onChange={e => onSeek(Number(e.target.value))}
                    className="mc-range w-[90%]"
                  />
                </div>
                <div className="mb-2 mt-4 text-xs opacity-70">
                  {isPlaying && audioRef.current?.src === tracks[current]?.src
                    ? fmt(progress)
                    : '0:00'}{' '}
                  / {episodeDurations[current] ? fmt(episodeDurations[current]) : fmt(duration)}
                </div>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* Global CSS for sliders & scrollbar (scoped by custom classes) */}
      <style jsx global>{`
        .mc-scroll::-webkit-scrollbar {
          width: 7px;
        }
        .mc-scroll::-webkit-scrollbar-track {
          box-shadow: inset 0 0 0.3rem rgb(79, 79, 79);
          border-radius: 40px;
          margin: 18px 0;
        }
        .mc-scroll::-webkit-scrollbar-thumb {
          box-shadow: inset 0 0 0.5rem rgb(116, 116, 116);
          background-color: #6490f6;
          border-radius: 40px;
        }

        .mc-range {
          -webkit-appearance: none;
          appearance: none;
          height: 5px;
          border-radius: 4px;
          background: linear-gradient(90deg, #e5e5e5, #c1daff, #6490f6, #c1daff, #e5e5e5);
          cursor: pointer;
        }
        .mc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #e5e5e5;
        }
        .mc-range::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #e5e5e5;
          border: none;
        }

        .mc-vol {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 4px;
          background: #6490f6;
          cursor: pointer;
        }
        .mc-vol::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e5e5e5;
        }
        .mc-vol::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e5e5e5;
          border: none;
        }
      `}</style>
    </>
  );
}
