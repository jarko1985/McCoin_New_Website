import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        y: [0, 10, 20],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
    >
      <span className="text-xs mb-1 text-white/60">Scroll</span>
      <div className="w-4 h-8 rounded-full border-2 border-white/30 flex justify-center p-1">
        <motion.div
          className="w-1 h-2 rounded-full bg-white/80"
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
