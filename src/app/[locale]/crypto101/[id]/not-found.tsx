'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';

export default function PostNotFound() {
  const params = useParams();
  const locale = params?.locale || 'en';

  return (
    <div className="min-h-screen bg-[#07153b] text-[#DAE6EA] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-[#EC3B3B] mb-4">404</h1>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Post Not Found</h2>
            {/* Animated crypto symbols */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {['₿', 'Ξ', '⛓'].map((symbol, i) => (
                <motion.span
                  key={i}
                  className="absolute text-[#DAE6EA] opacity-20"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    rotate: 0,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    transition: {
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    },
                  }}
                  style={{
                    fontSize: '2rem',
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 10}%`,
                  }}
                >
                  {symbol}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl text-[#DAE6EA]/80 mb-6">
            The crypto post you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-lg text-[#DAE6EA]/60">
            Don't worry, there's plenty of other crypto knowledge to explore!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href={`/${locale}/crypto101`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-[#EC3B3B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#EC3B3B]/90 transition-all duration-300"
            >
              <BookOpen size={20} />
              <span>Back to Crypto101</span>
            </motion.button>
          </Link>

          <Link href={`/${locale}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-[#DAE6EA]/10 border border-[#DAE6EA]/20 text-[#DAE6EA] px-6 py-3 rounded-lg font-semibold hover:bg-[#DAE6EA]/20 transition-all duration-300"
            >
              <Home size={20} />
              <span>Go Home</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-4">You might be interested in:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Bitcoin Basics', 'Blockchain Technology', 'DeFi Guide', 'Crypto Wallets'].map(
              (topic, index) => (
                <Link key={topic} href={`/${locale}/crypto101`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block bg-[#EC3B3B]/20 text-[#EC3B3B] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#EC3B3B]/30 transition-colors cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {topic}
                  </motion.span>
                </Link>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
