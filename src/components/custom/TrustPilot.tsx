'use client';

import { motion } from 'framer-motion';

type Props = {
  score?: number;
  reviews?: number;
  className?: string;
};

const TP_GREEN = '#00B67A';
const TP_DARK = '#009E6A';

export default function TrustpilotBadge({ score = 4.9, reviews = 848, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={[
        'relative overflow-hidden rounded-md dark:bg-[#07153B] bg-white xl:mt-8 mt-4 mx-auto xl:mx-0 hidden xl:block',
        'shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/10',
        'px-4 py-3 w-fit',
        'hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] transition-shadow',
        className,
      ].join(' ')}
      aria-label="Trustpilot rating"
    >
      {/* glossy overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft glass bloom */}
        {/* diagonal shine sweep */}
        <div className="absolute -inset-x-20 -top-16 h-16 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-tp-shine" />
      </div>

      {/* Row 1: logo + wordmark */}
      <div className="flex items-center gap-2">
        <TrustpilotStar className="h-5 w-5" />
        <span className="select-none text-[18px] font-semibold tracking-tight dark:text-white text-[#111]">
          Trustpilot
        </span>
      </div>

      {/* Row 2: five green boxed stars */}
      <div className="mt-2 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="relative h-[24px] w-[24px] rounded-[3px] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.08)]"
            style={{
              background: `linear-gradient(180deg, ${TP_GREEN} 0%, ${TP_DARK} 100%)`,
            }}
            aria-hidden
          >
            <StarGlyph className="absolute inset-0 m-auto h-[14px] w-[14px] text-white" />
            {/* tiny inner gloss on each box */}
            <div className="pointer-events-none absolute inset-0 rounded-[3px] bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_60%)]" />
          </div>
        ))}
      </div>

      {/* Row 3: caption */}
      <div className="mt-2 text-[13px] dark:text-white text-[#222]">
        <span className="text-black/90 dark:text-white">TrustScore</span>{' '}
        <span className="font-semibold dark:text-white">{score}</span>{' '}
        <span className="text-black/30 dark:text-white">|</span>{' '}
        <span className="text-black/70 dark:text-white">{reviews} reviews</span>
      </div>
    </motion.div>
  );
}

/* Trustpilot 5-point star (logo at left) */
function TrustpilotStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5l2.8 6.1 6.7.6-5 4.3 1.5 6.6L12 16.9 6 20.1l1.5-6.6-5-4.3 6.7-.6L12 2.5z"
        fill={TP_GREEN}
      />
    </svg>
  );
}

/* White star glyph inside each green box */
function StarGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3l2.6 5.6 6.1.5-4.6 3.9 1.4 5.9L12 15.9 6.5 19l1.4-5.9L3.3 9.1l6.1-.5L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}
