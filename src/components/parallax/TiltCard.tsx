import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  scale?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
}

export default function TiltCard({
  children,
  className = '',
  glareColor = 'rgba(255,255,255,0.1)',
  scale = 1.03,
  tiltMaxAngleX = 7,
  tiltMaxAngleY = 7,
}: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor={glareColor}
      glarePosition="all"
      glareBorderRadius="12px"
      transitionSpeed={1500}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {children}
      </motion.div>
    </Tilt>
  );
}
