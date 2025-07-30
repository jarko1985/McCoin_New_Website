import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale' | 'rotate';
  stagger?: number;
  threshold?: number;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  variant = 'slideUp',
  stagger = 0,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        margin: `0px 0px -${threshold * 100}% 0px`,
      }}
      variants={variants[variant]}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Utility component for staggered children
export function StaggeredReveal({
  children,
  staggerDelay = 0.1,
  className = '',
  variant = 'slideUp',
}: {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
  variant?: ScrollRevealProps['variant'];
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal key={index} variant={variant} delay={index * staggerDelay}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
