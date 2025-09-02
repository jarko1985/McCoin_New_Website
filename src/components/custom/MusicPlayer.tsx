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

import 'swiper/css';
import 'swiper/css/effect-cards';

// --- Data (covers + songs) ---
const tracks = [
  {
    artist: 'Syn Cole',
    title: 'Feel Good',
    duration: '3:01',
    cover: 'https://github.com/user-attachments/assets/d80e6b68-b67a-4e27-86ee-e00581883d5c',
    src: 'https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/SynCole-FeelGood.mp3',
  },
  {
    artist: 'Clarx & Harddope',
    title: 'Castle',
    duration: '2:38',
    cover: 'https://github.com/user-attachments/assets/9240f7ff-1b8e-4e62-a2d1-df78b285c7e0',
    src: 'https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/HarddopeClarx-Castle.mp3',
  },
  {
    artist: 'Neffex',
    title: 'Play Dead',
    duration: '3:31',
    cover: 'https://github.com/user-attachments/assets/6e5ba953-49c5-4634-a1c5-4caf310cba86',
    src: 'https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/PlayDead-NEFFEX.mp3',
  },
  {
    artist: 'Patrick Patrikios',
    title: 'Know Myself',
    duration: '3:23',
    cover: 'https://github.com/user-attachments/assets/a2ca0dfd-e53f-4e79-b8b0-288847e59b9a',
    src: 'https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/KnowMyself-PatrickPatrikios.mp3',
  },
  {
    artist: 'Besomorph & Coopex',
    title: 'Redemption',
    duration: '2:37',
    cover: 'https://github.com/user-attachments/assets/b286d7ff-52a1-452d-9cd9-5920c937b16e',
    src: 'https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/BesomorphCoopex-Redemption.mp3',
  },
];

export default function McMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [current, setCurrent] = useState(2); // start like the demo
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState<Record<number, boolean>>({ 3: true }); // pre-like item like sample

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
    if (!audio) return;
    audio.src = tracks[current].src;
    audio.volume = volume;
    setIsLoaded(true);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [current]);

  // Attach audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setProgress(audio.currentTime || 0);
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

  const next = () => setCurrent(i => (i + 1) % tracks.length);
  const prev = () => setCurrent(i => (i - 1 + tracks.length) % tracks.length);
  const shuffle = () => {
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

  const bgUrl = useMemo(
    () => 'https://github.com/user-attachments/assets/47953c98-49f4-4a40-8b2f-36543a0dd1a3',
    [],
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#001124]">
      {/* Background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      {/* Main glass container */}
      <main className="group relative w-[90vw] h-[90vh] rounded-2xl overflow-hidden shadow-md">
        {/* floating circles */}
        <div className="pointer-events-none absolute size-[250px] -left-[5%] -top-[3%] rounded-full bg-[#5768af] transition-all duration-[5000ms] group-hover:left-[85%] group-hover:scale-110 group-hover:bg-[#a0acbd]" />
        <div className="pointer-events-none absolute size-[250px] -right-[5%] -bottom-[3%] rounded-full bg-[#ab4c72] transition-all duration-[5000ms] group-hover:right-[85%] group-hover:scale-110 group-hover:bg-[#bda5ad]" />

        {/* content */}
        <section className="absolute inset-0 z-10 text-[#e5e5e5] grid grid-cols-1 place-items-center bg-[rgba(53,54,72,0.2)] backdrop-blur-md border border-white/50 rounded-2xl [box-shadow:inset_0_0.5px_0_1px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.1)] overflow-y-auto p-8 md:p-10 mc-scroll">
          {/* slider + playlist */}
          <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-[45%_55%] items-center gap-8">
            {/* Slider */}
            <div className="mx-auto w-[300px] sm:w-[270px] md:w-[300px]">
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
                    // auto play when user slides
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
            </div>

            {/* Playlist */}
            <div className="w-full">
              {tracks.map((t, i) => (
                <button
                  key={i}
                  className={`grid w-full grid-cols-[15%_65%_15%_5%] items-center gap-2 border-b-2 border-[#6490f6] px-3 py-2 mb-4 text-left hover:bg-white/10 rounded ${
                    current === i ? 'bg-[rgba(149,153,186,0.4)]' : ''
                  }`}
                  onClick={() => {
                    // Click on playlist item must sync the Swiper
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
                  <p className="justify-self-end">{t.duration}</p>
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
              ))}
            </div>
          </div>

          {/* Player sticky */}
          <div className="sticky bottom-0 left-0 z-20 mt-2 w-full max-w-6xl rounded-xl border border-white/30 bg-[rgba(5,9,51,0.4)] backdrop-blur-md shadow-[2px_2px_10px_2px_rgba(0,0,0,0.25)] flex flex-col items-center px-4 py-2 overflow-hidden">
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={shuffle}>
                <FaShuffle />
              </button>
              <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={prev}>
                <FaBackwardStep />
              </button>

              <button
                className="grid place-items-center size-11 rounded-full border-2 border-white/30 bg-[#e5e5e5] text-[#6490f6] shadow-[0_10px_20px_rgba(5,36,28,0.3)] text-xl"
                onClick={toggle}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button className="text-[1.35rem] sm:text-[1.5rem]" onClick={next}>
                <FaForwardStep />
              </button>

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
                max={Math.max(1, duration)}
                value={progress}
                onChange={e => onSeek(Number(e.target.value))}
                className="mc-range w-[90%]"
              />
            </div>
            <div className="mb-2 text-xs opacity-70">
              {fmt(progress)} / {fmt(duration)}
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}
