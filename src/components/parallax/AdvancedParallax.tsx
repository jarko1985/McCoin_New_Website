import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface AdvancedParallaxProps {
  children: ReactNode;
  speed?: number;
  scale?: [number, number];
  rotate?: [number, number];
  opacity?: number[];
  x?: [string, string];
  y?: [string, string];
  className?: string;
  style?: React.CSSProperties;
  offset?:
    | ['start end', 'end start']
    | ['start start', 'end start']
    | ['start center', 'end center'];
  transformOrigin?: string;
}

export default function AdvancedParallax({
  children,
  speed = 0.5,
  scale,
  rotate,
  opacity,
  x,
  y,
  className = '',
  style,
  offset = ['start end', 'end start'],
  transformOrigin = 'center',
}: AdvancedParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Create transforms based on props
  const transforms: { [key: string]: MotionValue<any> } = {};

  if (y || speed !== 0.5) {
    transforms.y = y
      ? useTransform(scrollYProgress, [0, 1], y)
      : useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  }

  if (x) {
    transforms.x = useTransform(scrollYProgress, [0, 1], x);
  }

  if (scale) {
    transforms.scale = useTransform(scrollYProgress, [0, 1], scale);
  }

  if (rotate) {
    transforms.rotate = useTransform(scrollYProgress, [0, 1], rotate);
  }

  if (opacity) {
    const inputRange =
      opacity.length === 2
        ? [0, 1]
        : opacity.length === 3
        ? [0, 0.5, 1]
        : Array.from({ length: opacity.length }, (_, i) => i / (opacity.length - 1));
    transforms.opacity = useTransform(scrollYProgress, inputRange, opacity);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        ...transforms,
        transformOrigin,
        ...style,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
