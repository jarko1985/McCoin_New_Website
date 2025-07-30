import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?:
    | ['start end', 'end start']
    | ['start start', 'end start']
    | ['start center', 'end center'];
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
  offset = ['start end', 'end start'],
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
