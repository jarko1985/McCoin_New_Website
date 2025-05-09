'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  fullText: string;
}

export default function TypewriterEffect({ fullText }: TypewriterEffectProps) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, 120);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-[#DAE6EA] text-[0.725rem] lg:text-[1rem] text-center lg:mb-4 mb-2 text-wrap"
    >
      {displayText}
      <span className="animate-caret-blink">|</span>
    </motion.h1>
  );
}
