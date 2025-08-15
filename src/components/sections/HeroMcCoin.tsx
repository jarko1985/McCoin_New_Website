// src/app/components/HeroMcCoin.tsx
'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Dashboard from '../homepage/Dashboard';

const BG = '#07153B'; // page background
const BRAND = '#EC3B3B'; // primary red
const PALE = '#DAE6EA'; // light accent

type IconSpec = {
  id: string;
  x: number; // percent inside right panel
  y: number; // percent inside right panel
  size: number; // px
  delay?: number;
  hue?: number; // for glow color only
  src: string; // /images/icons/xxx.png
  alt: string;
};

export default function HeroMcCoin() {
  // parallax
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 12 });
  const smy = useSpring(my, { stiffness: 60, damping: 12 });
  const rotateX = useTransform(smy, [-200, 200], [6, -6]);
  const rotateY = useTransform(smx, [-200, 200], [-6, 6]);
  const shineX = useTransform(smx, [-200, 200], ['0%', '100%']);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(e.clientX - (rect.left + rect.width / 2));
      my.set(e.clientY - (rect.top + rect.height / 2));
    },
    [mx, my],
  );

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // All icons visible and within bounds
  const icons: IconSpec[] = useMemo(() => {
    const centerX = 50; // Center of the image (50% from left)
    const centerY = 50; // Center of the image (50% from top)
    const radius = 55; // Distance from center to icons
    const totalIcons = 10; // Number of icons

    // Helper function to round to 2 decimal places for consistency
    const roundToTwo = (num: number) => Math.round(num * 100) / 100;

    return [
      // Calculate positions in a perfect circle around the image
      {
        id: 'btc',
        x: roundToTwo(centerX + radius * Math.cos((0 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((0 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.0,
        hue: 4,
        src: '/images/btc.png',
        alt: 'Bitcoin',
      },
      {
        id: 'eth',
        x: roundToTwo(centerX + radius * Math.cos((1 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((1 * 2 * Math.PI) / totalIcons) - 5), // Moved up by 5%
        size: 110,
        delay: 0.1,
        hue: 200,
        src: '/images/ether.png',
        alt: 'Ethereum',
      },
      {
        id: 'sol',
        x: roundToTwo(centerX + radius * Math.cos((2 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((2 * 2 * Math.PI) / totalIcons) - 5),
        size: 130,
        delay: 0.2,
        hue: 210,
        src: '/images/solana.png',
        alt: 'Solana',
      },
      {
        id: 'usdt',
        x: roundToTwo(centerX + radius * Math.cos((3 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((3 * 2 * Math.PI) / totalIcons) - 5), // Moved up by 5%
        size: 110,
        delay: 0.25,
        hue: 165,
        src: '/images/usdt.png',
        alt: 'Tether',
      },
      {
        id: 'bnb',
        x: roundToTwo(centerX + radius * Math.cos((4 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((4 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.3,
        hue: 48,
        src: '/images/bnb.png',
        alt: 'BNB',
      },
      {
        id: 'xrp',
        x: roundToTwo(centerX + radius * Math.cos((5 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((5 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.35,
        hue: 205,
        src: '/images/xrp.png',
        alt: 'XRP',
      },
      {
        id: 'ada',
        x: roundToTwo(centerX + radius * Math.cos((6 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((6 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.4,
        hue: 210,
        src: '/images/ada.png',
        alt: 'Cardano',
      },
      {
        id: 'doge',
        x: roundToTwo(centerX + radius * Math.cos((7 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((7 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.45,
        hue: 42,
        src: '/images/dodge.png',
        alt: 'Dogecoin',
      },
      {
        id: 'dot',
        x: roundToTwo(centerX + radius * Math.cos((8 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((8 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.5,
        hue: 330,
        src: '/images/lite.png',
        alt: 'Polkadot',
      },
      {
        id: 'avax',
        x: roundToTwo(centerX + radius * Math.cos((9 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((9 * 2 * Math.PI) / totalIcons)),
        size: 100,
        delay: 0.55,
        hue: 356,
        src: '/images/avalanche.png',
        alt: 'avalanche',
      },
    ];
  }, []);

  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Please enter a valid email.');
    setBusy(true);
    try {
      // TODO: connect to your API/newsletter/auth flow
      await new Promise(r => setTimeout(r, 800));
      alert("Thanks! We'll be in touch shortly.");
      setEmail('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#07153B] via-[#0A1F3D] to-[#07153B] min-h-screen"
      suppressHydrationWarning
    >
      {/* soft accents */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(600px circle at 50% 50%, rgba(236,59,59,.18), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(700px circle at 50% 50%, rgba(218,230,234,.18), transparent 60%)',
        }}
      />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-12 sm:px-6 sm:py-16 md:gap-8 lg:gap-12 xl:grid-cols-2 xl:gap-16 xl:py-24"
      >
        {/* Left */}
        <div className="flex flex-col order-1">
          <div className="relative z-10 text-center xl:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-left">
              Invest in <span className="text-[#EC3B3B]">McCoin</span> Way to Trade
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[rgba(218,230,234,0.85)] sm:text-lg md:text-xl xl:text-left">
              The global crypto currency exchange
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto xl:mx-0 mt-6 xl:mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row"
            >
              <label className="sr-only" htmlFor="hero-email">
                Email
              </label>
              <input
                id="hero-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-2xl bg-[#0B1A40] px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-[15px] text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-[rgba(236,59,59,.75)]"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={busy}
                className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 sm:py-4 font-semibold text-white transition"
                style={{
                  background: 'linear-gradient(135deg, #EC3B3B 0%, #B22525 100%)',
                  boxShadow: '0 12px 30px rgba(236,59,59,0.35)',
                }}
              >
                <span className="translate-y-0 transition-transform group-active:translate-y-[1px]">
                  {busy ? 'Submitting…' : 'Join Now'}
                </span>
              </button>
            </form>
          </div>
          <div className="mt-8 xl:mt-12">
            <Dashboard />
          </div>
        </div>

        {/* Right */}
        <div className="relative overflow-visible order-2">
          {/* device frame + your image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
            <div className="relative rounded-[20px] sm:rounded-[28px] border border-white/10 bg-[#0B1A40] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10">
                <Image
                  src="/images/hero_bg1.png"
                  alt="McCoin trading platform preview"
                  width={1120}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[28px] ring-1 ring-white/10" />
            </div>
          </div>

          {/* Floating, draggable PNG icons */}
          <div className="pointer-events-none absolute inset-0 overflow-visible -mt-4 sm:-mt-8">
            {icons.map(c => (
              <motion.div
                key={c.id}
                className="absolute hidden sm:block"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: c.size,
                  height: c.size,
                  zIndex: 5,
                }}
                initial={{ y: 20, opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2, delay: c.delay, ease: 'easeOut' }}
              >
                <motion.div
                  className="pointer-events-auto relative"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.94 }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.12}
                  dragConstraints={{ left: -24, right: 24, top: -24, bottom: 24 }}
                  animate={{
                    rotate: [0, 1, 0, -1, 0],
                    scale: [1, 1.02, 1, 1.01, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: (c.delay || 0) * 2,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Glow behind the image */}
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={c.size}
                    height={c.size}
                    className="relative h-auto w-auto select-none"
                    draggable={false}
                    priority={c.id === 'btc'}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
