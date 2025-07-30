import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface HorizontalScrollParallaxProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  distance?: string | number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  offset?:
    | ['start end', 'end start']
    | ['start start', 'end start']
    | ['start center', 'end center']
    | ['start end', 'end center'];
  triggerOnce?: boolean;
}

export default function HorizontalScrollParallax({
  children,
  direction = 'right',
  distance = '100vw',
  speed = 1,
  className = '',
  style,
  offset = ['start end', 'end start'],
  triggerOnce = false,
}: HorizontalScrollParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Convert distance to string if it's a number
  const distanceStr = typeof distance === 'number' ? `${distance}px` : distance;

  // Calculate movement based on direction and speed
  const moveDistance = speed * 100; // Base percentage

  const x =
    direction === 'left'
      ? useTransform(scrollYProgress, [0, 1], [`${moveDistance}%`, `-${moveDistance}%`])
      : useTransform(scrollYProgress, [0, 1], [`-${moveDistance}%`, `${moveDistance}%`]);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        ...style,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Horizontal scroll carousel component
export function HorizontalCarousel({
  items,
  className = '',
  itemClassName = '',
  gap = 2,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  gap?: number;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate total width needed for all items
  const itemWidth = 300; // Base item width
  const totalWidth = items.length * (itemWidth + gap * 16); // gap in rem converted to px

  const x = useTransform(scrollYProgress, [0, 1], [0, -(totalWidth - window.innerWidth)]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className={`flex ${gap ? `gap-${gap}` : ''} will-change-transform`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${itemClassName}`}
            style={{ minWidth: itemWidth }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Staggered horizontal reveal
export function StaggeredHorizontalReveal({
  children,
  direction = 'right',
  staggerDelay = 0.2,
  className = '',
}: {
  children: ReactNode[];
  direction?: 'left' | 'right';
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <HorizontalScrollParallax
          key={index}
          direction={direction}
          speed={0.5 + index * 0.1}
          offset={['start end', 'end center']}
          style={{
            transitionDelay: `${index * staggerDelay}s`,
          }}
        >
          {child}
        </HorizontalScrollParallax>
      ))}
    </div>
  );
}

// Cinematic text reveal
export function CinematicTextReveal({
  text,
  className = '',
  letterDelay = 0.05,
}: {
  text: string;
  className?: string;
  letterDelay?: number;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const letters = text.split('');

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {letters.map((letter, index) => {
          const x = useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [index % 2 === 0 ? '-100px' : '100px', '0px', '0px'],
          );

          const opacity = useTransform(
            scrollYProgress,
            [0, 0.3 + index * letterDelay, 0.8],
            [0, 1, 1],
          );

          return (
            <motion.span
              key={index}
              style={{ x, opacity }}
              className="inline-block will-change-transform"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
