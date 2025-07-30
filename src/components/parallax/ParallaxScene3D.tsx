import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxLayer3D {
  id: string;
  content: ReactNode;
  depth: number; // 0 (closest) to 10 (furthest)
  speed?: number;
  scale?: [number, number];
  opacity?: number[];
  blur?: number;
  className?: string;
}

interface ParallaxScene3DProps {
  layers: ParallaxLayer3D[];
  height?: string;
  perspective?: number;
  className?: string;
}

export default function ParallaxScene3D({
  layers,
  height = '100vh',
  perspective = 1000,
  className = '',
}: ParallaxScene3DProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Sort layers by depth (furthest first for proper z-index)
  const sortedLayers = [...layers].sort((a, b) => b.depth - a.depth);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
        perspective: `${perspective}px`,
      }}
    >
      {sortedLayers.map(layer => {
        // Calculate transforms based on depth
        const depthMultiplier = (10 - layer.depth) / 10; // 0.1 to 1
        const baseSpeed = layer.speed || depthMultiplier;

        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [`${baseSpeed * -20}%`, `${baseSpeed * 20}%`],
        );

        const z = useTransform(scrollYProgress, [0, 1], [layer.depth * -50, layer.depth * 50]);

        const scale = layer.scale
          ? useTransform(scrollYProgress, [0, 1], layer.scale)
          : useTransform(
              scrollYProgress,
              [0, 1],
              [1 - depthMultiplier * 0.1, 1 + depthMultiplier * 0.1],
            );

        const opacity = layer.opacity
          ? useTransform(
              scrollYProgress,
              layer.opacity.length === 2 ? [0, 1] : [0, 0.5, 1],
              layer.opacity,
            )
          : 1;

        const blur = layer.blur || Math.max(0, (layer.depth - 2) * 2);

        return (
          <motion.div
            key={layer.id}
            style={{
              y,
              z,
              scale,
              opacity,
              filter: blur > 0 ? `blur(${blur}px)` : 'none',
              zIndex: 10 - layer.depth,
            }}
            className={`absolute inset-0 will-change-transform ${layer.className || ''}`}
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
}

// Preset 3D scenes
export const Scene3DPresets = {
  FloatingCity: () =>
    [
      {
        id: 'bg-sky',
        depth: 10,
        content: (
          <div className="w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900" />
        ),
      },
      {
        id: 'stars',
        depth: 9,
        content: (
          <div className="w-full h-full">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              />
            ))}
          </div>
        ),
      },
      {
        id: 'mountains',
        depth: 7,
        content: (
          <div className="absolute bottom-0 w-full h-1/2">
            <svg viewBox="0 0 1200 600" className="w-full h-full">
              <polygon
                points="0,600 200,200 400,300 600,100 800,250 1000,150 1200,400 1200,600"
                fill="url(#mountainGradient)"
              />
              <defs>
                <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 69, 19, 0.3)" />
                  <stop offset="100%" stopColor="rgba(139, 69, 19, 0.8)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ),
      },
      {
        id: 'floating-islands',
        depth: 5,
        content: (
          <div className="w-full h-full">
            {[
              { top: '20%', left: '10%', size: '80px' },
              { top: '40%', right: '15%', size: '120px' },
              { top: '60%', left: '20%', size: '60px' },
            ].map((island, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-b from-green-400 to-green-800 rounded-full shadow-2xl"
                style={{
                  ...island,
                  width: island.size,
                  height: island.size,
                }}
              />
            ))}
          </div>
        ),
      },
      {
        id: 'clouds',
        depth: 3,
        opacity: [0.3, 0.7, 0.3],
        content: (
          <div className="w-full h-full">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full blur-sm"
                style={{
                  width: `${100 + Math.random() * 200}px`,
                  height: `${50 + Math.random() * 100}px`,
                  top: `${Math.random() * 70}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        ),
      },
    ] as ParallaxLayer3D[],

  UnderwaterScene: () =>
    [
      {
        id: 'deep-water',
        depth: 10,
        content: (
          <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900" />
        ),
      },
      {
        id: 'coral-reef',
        depth: 7,
        content: (
          <div className="absolute bottom-0 w-full h-2/3">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-t from-pink-500 to-orange-400 rounded-t-full"
                style={{
                  bottom: 0,
                  left: `${Math.random() * 90}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${100 + Math.random() * 200}px`,
                  transform: `rotate(${(Math.random() - 0.5) * 30}deg)`,
                }}
              />
            ))}
          </div>
        ),
      },
      {
        id: 'fish-school',
        depth: 4,
        content: (
          <div className="w-full h-full">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="absolute w-6 h-3 bg-yellow-400 rounded-full"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        ),
      },
      {
        id: 'bubbles',
        depth: 2,
        content: (
          <div className="w-full h-full">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute bg-white/30 rounded-full"
                style={{
                  width: `${5 + Math.random() * 15}px`,
                  height: `${5 + Math.random() * 15}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        ),
      },
    ] as ParallaxLayer3D[],
};
