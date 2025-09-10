'use client';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NewsRoomHero() {
  const t = useTranslations('NewsRoom.hero');

  return (
    <div className="relative h-[30vh] w-full overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 3, 0],
              y: [0, -10, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <Newspaper className="h-16 w-16 mx-auto text-white mt-12 mb-4" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {t('title')}

            <span className="block text-sm italic">{t('titleSuffix')}</span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-300 mb-8">{t('subtitle')}</p>
        </motion.div>
      </div>
    </div>
  );
}
