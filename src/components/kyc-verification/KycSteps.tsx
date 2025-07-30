'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

type KYCSTEP = {
  title: string;
  description: string;
  videoURL?: string;
};

const KYC_STEPS: KYCSTEP[] = [
  {
    title: 'Start KYC Verification',
    description: 'Go to your dashboard and click "Verify Identity" to start the KYC process.',
    videoURL: '/videos/kyc1_1.mp4',
  },
  {
    title: 'Select Document Type',
    description:
      "Choose the document you want to use — a passport, driver's license, or national ID.",
    videoURL: '/videos/kyc1_2.mp4',
  },
  {
    title: 'Upload Your Document',
    description:
      'Take a clear photo or upload a scanned copy. Make sure all details are visible and nothing is cropped.',
    videoURL: '/videos/kyc1_3.mp4',
  },
  {
    title: 'Take a Selfie with Liveness Check',
    description:
      'Follow the instructions to take a quick selfie. This confirms you are a real person.',
    videoURL: '/videos/kyc1_4.mp4',
  },
  {
    title: 'Get Verified',
    description:
      "Your documents will be reviewed instantly. You'll usually get verified within minutes.",
    videoURL: '/videos/kyc1_5.mp4',
  },
];

export default function KycSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Calculate and update progress position
  const calculateProgress = () => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const activeItem = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

      if (activeItem) {
        const firstItem = container.querySelector(`[data-index="0"]`) as HTMLElement;
        const lastItem = container.querySelector(
          `[data-index="${KYC_STEPS.length - 1}"]`,
        ) as HTMLElement;

        if (firstItem && lastItem) {
          const firstItemCenter = firstItem.offsetLeft + firstItem.offsetWidth / 2;
          const lastItemCenter = lastItem.offsetLeft + lastItem.offsetWidth / 2;
          const activeItemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;

          const totalDistance = lastItemCenter - firstItemCenter;
          const currentDistance = activeItemCenter - firstItemCenter;
          const progressPercentage =
            totalDistance > 0 ? (currentDistance / totalDistance) * 100 : 0;

          setProgressWidth(Math.max(0, Math.min(100, progressPercentage)));
        }
      }
    }
  };

  // Auto-scroll the timeline container and update progress when activeIndex changes
  useEffect(() => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const activeItem = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

      if (activeItem) {
        const containerWidth = container.offsetWidth;
        const itemOffset = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;

        // Auto-scroll
        container.scrollTo({
          left: itemOffset - containerWidth / 2 + itemWidth / 2,
          behavior: 'smooth',
        });

        // Calculate progress with a small delay to ensure layout is stable
        setTimeout(calculateProgress, 100);
      }
    }
  }, [activeIndex]);

  // Recalculate progress on window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(calculateProgress, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  // Auto-play video when step changes or component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load(); // Reload the video source
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.log('Video autoplay prevented:', error);
              setIsPlaying(false);
            });
        }
      }
    }, 100); // Small delay to ensure video element is ready

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Handle play/pause functionality
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle video events
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => setIsPlaying(false);

  const activeEvent = KYC_STEPS[activeIndex];

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#07153B] dark:text-[#FFF] mb-12 text-center">
          KYC <span className="text-[#EC3B3B]"> Verification</span>
        </h2>
        <p className="text-center mb-8 text-[#07153B] dark:text-[#FFF]">
          Here are 5 clear and concise KYC steps using the Sumsub process, tailored for platforms
          like McCoin
        </p>

        {/* Timeline Navigation */}
        <div className="relative my-12">
          <div
            ref={timelineRef}
            className="flex overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex space-x-8 px-4">
              {KYC_STEPS.map((event, index) => (
                <motion.button
                  key={index}
                  data-index={index}
                  className={`flex flex-col items-center snap-center min-w-max cursor-pointer ${
                    index === activeIndex ? 'scale-110' : 'scale-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`h-4 w-4 rounded-full mb-2 ${
                      index === activeIndex
                        ? 'bg-[#EC3B3B] border-2 dark:border-[#FFF] border-[#07153B]'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  />
                  <motion.span
                    className={`text-sm font-medium text-center ${
                      index === activeIndex ? 'text-[#EC3B3B]' : 'dark:text-[#FFF] text-[#07153B]'
                    }`}
                  >
                    Step {index + 1}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 z-0">
            <motion.div
              className="h-full bg-[#07153B] dark:bg-[#EC3B3B]"
              initial={{ width: 0 }}
              animate={{
                width: `${progressWidth}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Active Event Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg bg-black">
            <video
              key={activeIndex}
              ref={videoRef}
              className="w-full h-full object-cover absolute inset-0"
              autoPlay
              playsInline
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onError={e => {
                console.log('Video failed to load:', e);
              }}
            >
              <source src={activeEvent.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
              }`}
              onClick={togglePlayPause}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-black/70 transition-colors">
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <motion.div
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h4
                className="text-xl font-semibold text-[#EC3B3B] pb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {activeEvent.title}
              </motion.h4>
              <p className="text-lg text-[#07153B] dark:text-[#FFF]">{activeEvent.description}</p>
            </motion.div>

            <div className="flex space-x-4 pt-4">
              <motion.button
                className="px-6 py-2 rounded-full bg-[#FFF] text-[#07153b] disabled:opacity-50 cursor-pointer border border-[#07153b] hover:bg-[#07153b] hover:text-white transition-colors"
                onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>
              <motion.button
                className="px-6 py-2 rounded-full bg-[#EC3B3B] text-white disabled:opacity-50 cursor-pointer hover:bg-[#EC3B3B]/90 transition-colors"
                onClick={() => setActiveIndex(prev => Math.min(KYC_STEPS.length - 1, prev + 1))}
                disabled={activeIndex === KYC_STEPS.length - 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
