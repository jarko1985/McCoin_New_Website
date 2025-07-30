import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface RollingParallaxProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  rollSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
  offset?:
    | ['start end', 'end start']
    | ['start start', 'end start']
    | ['start center', 'end center'];
  size?: number; // Used to calculate realistic rolling rotation
}

export default function RollingParallax({
  children,
  direction = 'right',
  speed = 1,
  rollSpeed = 1,
  className = '',
  style,
  offset = ['start end', 'end start'],
  size = 100, // Default size for rotation calculation
}: RollingParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Calculate movement distance
  const moveDistance = speed * 200; // Base movement in pixels

  // Movement transforms based on direction
  const transforms: { [key: string]: any } = {};

  switch (direction) {
    case 'left':
      transforms.x = useTransform(
        scrollYProgress,
        [0, 1],
        [`${moveDistance}px`, `-${moveDistance}px`],
      );
      // Realistic rolling: negative rotation for leftward movement
      transforms.rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(moveDistance * rollSpeed * 360) / (Math.PI * size)],
      );
      break;
    case 'right':
      transforms.x = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${moveDistance}px`, `${moveDistance}px`],
      );
      // Realistic rolling: positive rotation for rightward movement
      transforms.rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, (moveDistance * rollSpeed * 360) / (Math.PI * size)],
      );
      break;
    case 'up':
      transforms.y = useTransform(
        scrollYProgress,
        [0, 1],
        [`${moveDistance}px`, `-${moveDistance}px`],
      );
      transforms.rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(moveDistance * rollSpeed * 360) / (Math.PI * size)],
      );
      break;
    case 'down':
      transforms.y = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${moveDistance}px`, `${moveDistance}px`],
      );
      transforms.rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, (moveDistance * rollSpeed * 360) / (Math.PI * size)],
      );
      break;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        ...transforms,
        ...style,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Preset rolling objects
export const RollingObjects = {
  Ball: ({ size = 60, color = 'bg-gradient-to-r from-cyan-400 to-blue-500', ...props }: any) => (
    <RollingParallax size={size} {...props}>
      <div className={`rounded-full ${color} shadow-lg`} style={{ width: size, height: size }} />
    </RollingParallax>
  ),

  Wheel: ({ size = 80, spokes = 8, ...props }: any) => (
    <RollingParallax size={size} {...props}>
      <div
        className="relative border-4 border-white/30 rounded-full bg-white/5 backdrop-blur-sm"
        style={{ width: size, height: size }}
      >
        {/* Spokes */}
        {Array.from({ length: spokes }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-white/40"
            style={{
              height: size * 0.4,
              top: '50%',
              left: '50%',
              transformOrigin: 'top',
              transform: `translate(-50%, -50%) rotate(${(360 / spokes) * i}deg)`,
            }}
          />
        ))}
        {/* Center hub */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full"
          style={{ width: size * 0.2, height: size * 0.2 }}
        />
      </div>
    </RollingParallax>
  ),

  Gear: ({ size = 70, teeth = 12, ...props }: any) => (
    <RollingParallax size={size} {...props}>
      <div className="relative">
        {/* Gear teeth */}
        <div
          className="relative bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
          style={{ width: size, height: size }}
        >
          {Array.from({ length: teeth }, (_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-amber-400 to-orange-500"
              style={{
                width: size * 0.1,
                height: size * 0.15,
                top: -size * 0.05,
                left: '50%',
                transformOrigin: `50% ${size * 0.55}px`,
                transform: `translateX(-50%) rotate(${(360 / teeth) * i}deg)`,
              }}
            />
          ))}
          {/* Center */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full border-2 border-white/30"
            style={{ width: size * 0.3, height: size * 0.3 }}
          />
        </div>
      </div>
    </RollingParallax>
  ),
};
