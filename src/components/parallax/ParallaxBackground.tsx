import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface BackgroundElement {
  id: string;
  size: string;
  color: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  speed: number;
  blur?: string;
  opacity?: number;
  rotate?: boolean;
  scale?: [number, number];
}

interface ParallaxBackgroundProps {
  elements?: BackgroundElement[];
  className?: string;
}

const defaultElements: BackgroundElement[] = [
  {
    id: 'bg1',
    size: 'w-[60vw] h-[60vw]',
    color: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10',
    position: { top: '10%', right: '10%' },
    speed: 0.2,
    blur: 'blur-[120px]',
    opacity: 0.6,
    rotate: true,
    scale: [0.8, 1.2],
  },
  {
    id: 'bg2',
    size: 'w-[40vw] h-[40vw]',
    color: 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15',
    position: { bottom: '20%', left: '15%' },
    speed: 0.4,
    blur: 'blur-[100px]',
    opacity: 0.4,
    rotate: true,
    scale: [1.1, 0.9],
  },
  {
    id: 'bg3',
    size: 'w-[35vw] h-[35vw]',
    color: 'bg-gradient-to-r from-amber-500/8 to-orange-500/8',
    position: { top: '60%', right: '20%' },
    speed: 0.6,
    blur: 'blur-[80px]',
    opacity: 0.3,
    rotate: false,
    scale: [0.9, 1.1],
  },
  {
    id: 'bg4',
    size: 'w-[25vw] h-[25vw]',
    color: 'bg-gradient-to-r from-emerald-500/12 to-teal-500/12',
    position: { top: '30%', left: '5%' },
    speed: 0.3,
    blur: 'blur-[90px]',
    opacity: 0.5,
    rotate: true,
    scale: [1.0, 1.3],
  },
];

export default function ParallaxBackground({
  elements = defaultElements,
  className = '',
}: ParallaxBackgroundProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map(element => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [`-${element.speed * 50}%`, `${element.speed * 50}%`],
        );

        const scale = element.scale
          ? useTransform(scrollYProgress, [0, 1], element.scale)
          : undefined;

        const rotate = element.rotate ? useTransform(scrollYProgress, [0, 1], [0, 360]) : undefined;

        const opacity = useTransform(
          scrollYProgress,
          [0, 0.2, 0.8, 1],
          [0, element.opacity || 0.5, element.opacity || 0.5, 0],
        );

        return (
          <motion.div
            key={element.id}
            style={{
              y,
              scale,
              rotate,
              opacity,
              ...element.position,
            }}
            className={`absolute ${element.size} ${element.color} ${element.blur} rounded-full will-change-transform`}
          />
        );
      })}
    </div>
  );
}

// Preset configurations for different moods
export const backgroundPresets = {
  cosmic: [
    {
      id: 'cosmic1',
      size: 'w-[70vw] h-[70vw]',
      color: 'bg-gradient-to-r from-purple-600/15 to-indigo-600/15',
      position: { top: '5%', right: '5%' },
      speed: 0.15,
      blur: 'blur-[140px]',
      opacity: 0.7,
      rotate: true,
      scale: [0.7, 1.3],
    },
    {
      id: 'cosmic2',
      size: 'w-[45vw] h-[45vw]',
      color: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20',
      position: { bottom: '15%', left: '10%' },
      speed: 0.3,
      blur: 'blur-[110px]',
      opacity: 0.5,
      rotate: false,
      scale: [1.2, 0.8],
    },
  ] as BackgroundElement[],

  ocean: [
    {
      id: 'ocean1',
      size: 'w-[55vw] h-[55vw]',
      color: 'bg-gradient-to-r from-blue-500/12 to-cyan-400/12',
      position: { top: '20%', left: '20%' },
      speed: 0.25,
      blur: 'blur-[100px]',
      opacity: 0.6,
      rotate: true,
      scale: [0.9, 1.1],
    },
    {
      id: 'ocean2',
      size: 'w-[38vw] h-[38vw]',
      color: 'bg-gradient-to-r from-teal-500/15 to-blue-600/15',
      position: { bottom: '25%', right: '15%' },
      speed: 0.4,
      blur: 'blur-[85px]',
      opacity: 0.4,
      rotate: false,
      scale: [1.1, 0.9],
    },
  ] as BackgroundElement[],
};
