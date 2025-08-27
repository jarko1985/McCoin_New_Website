'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type TimelineEvent = {
  date: string; // Format like "Jan 2015" or "15 May 2018"
  title: string;
  description: string;
  image?: string; // URL or path to image
};

const getHistoryData = (t: any): TimelineEvent[] => [
  {
    date: t('history.timeline.event1.date'),
    title: t('history.timeline.event1.title'),
    description: t('history.timeline.event1.description'),
    image: '/images/bitcoin.jpg',
  },
  {
    date: t('history.timeline.event2.date'),
    title: t('history.timeline.event2.title'),
    description: t('history.timeline.event2.description'),
    image: '/images/bitcoin2.jpg',
  },
  {
    date: t('history.timeline.event3.date'),
    title: t('history.timeline.event3.title'),
    description: t('history.timeline.event3.description'),
    image: '/images/bitcoin3.jpg',
  },
  {
    date: t('history.timeline.event4.date'),
    title: t('history.timeline.event4.title'),
    description: t('history.timeline.event4.description'),
    image: '/images/bitcoin4.jpg',
  },
  {
    date: t('history.timeline.event5.date'),
    title: t('history.timeline.event5.title'),
    description: t('history.timeline.event5.description'),
    image: '/images/bitcoin5.jpg',
  },
  {
    date: t('history.timeline.event6.date'),
    title: t('history.timeline.event6.title'),
    description: t('history.timeline.event6.description'),
    image: '/images/bitcoin6.jpg',
  },
  {
    date: t('history.timeline.event7.date'),
    title: t('history.timeline.event7.title'),
    description: t('history.timeline.event7.description'),
    image: '/images/bitcoin7.jpg',
  },
];

export function OurHistory() {
  const t = useTranslations('aboutPage');
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const OUR_HISTORY = getHistoryData(t);

  // Auto-scroll the timeline container when activeIndex changes
  useEffect(() => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const activeItem = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

      if (activeItem) {
        const containerWidth = container.offsetWidth;
        const itemOffset = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;

        container.scrollTo({
          left: itemOffset - containerWidth / 2 + itemWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const activeEvent = OUR_HISTORY[activeIndex];

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#07153B] dark:text-[#FFF] mb-12 text-center">
          {t('history.title')}{' '}
          <span className="text-[#EC3B3B]">{t('history.title_highlight')}</span>
        </h2>

        {/* Timeline Navigation */}
        <div className="relative mb-12">
          <div
            ref={timelineRef}
            className="flex overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex space-x-8 px-4">
              {OUR_HISTORY.map((event, index) => (
                <motion.button
                  key={index}
                  data-index={index}
                  className={`flex flex-col items-center snap-center min-w-max cursor-pointer ${
                    index === activeIndex ? 'scale-110' : 'scale-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`h-4 w-4 rounded-full mb-2 ${
                      index === activeIndex
                        ? 'bg-[#EC3B3B] border-2 dark:border-[#FFF] border-[#07153B]'
                        : 'bg-[#FFF]'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  />
                  <motion.span
                    className={`text-sm font-medium ${
                      index === activeIndex ? 'text-[#EC3B3B]' : 'dark:text-[#FFF] text-[#07153B]'
                    }`}
                  >
                    {event.date}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 z-0">
            <motion.div
              className="h-full bg-[#07153B] dark:bg-[#EC3B3B] "
              initial={{ width: 0 }}
              animate={{
                width: `${(activeIndex / (OUR_HISTORY.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Active Event Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <motion.img
              key={activeIndex}
              src={activeEvent.image || '/images/default-history.jpg'}
              alt={activeEvent.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07153b]/80 to-transparent flex items-end p-6">
              <motion.h3
                className="text-2xl font-bold text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeEvent.title}
              </motion.h3>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h4
                className="text-xl font-semibold text-[#EC3B3B] pb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeEvent.title}
              </motion.h4>
              <p className="text-lg text-[text-[#07153B]] dark:text-[#FFF]">
                {activeEvent.description}
              </p>
            </motion.div>

            <div className="flex space-x-4 pt-4">
              <motion.button
                className="px-6 py-2 rounded-full bg-[#FFF] text-[#07153b] disabled:opacity-50 cursor-pointer"
                onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('history.navigation.previous')}
              </motion.button>
              <motion.button
                className="px-6 py-2 rounded-full bg-[#EC3B3B] text-white disabled:opacity-50 cursor-pointer"
                onClick={() => setActiveIndex(prev => Math.min(OUR_HISTORY.length - 1, prev + 1))}
                disabled={activeIndex === OUR_HISTORY.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('history.navigation.next')}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
