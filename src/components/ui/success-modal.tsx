'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Home, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedTick = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative w-10 h-10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-2 bg-white rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Check className="w-6 h-6 text-green-600" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] ?? 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#07153B] to-[#1A0A2E] border border-slate-600 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <AnimatedTick />
                  <span className="text-xl">Thank You for Reaching Out!</span>
                </DialogTitle>
              </DialogHeader>

              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-[#DAE6EA] text-center leading-relaxed">
                  We've received your message and our team will get back to you as soon as possible.
                  You can expect a reply within 24–48 hours.
                </p>

                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <p className="text-[#DAE6EA] text-sm leading-relaxed">
                    In the meantime, feel free to explore our{' '}
                    <Link
                      href={`/${locale}/faqs`}
                      className="text-[#EC3B3B] hover:text-[#FF6B6B] underline transition-colors"
                    >
                      FAQ
                    </Link>{' '}
                    or continue browsing our website.
                  </p>
                  <p className="text-[#DAE6EA] text-sm mt-2">
                    Your inquiry is important to us, and we're committed to assisting you promptly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 bg-transparent border-[#EC3B3B] text-[#EC3B3B] hover:bg-[#EC3B3B] hover:text-white transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-[#EC3B3B] hover:bg-[#FF6B6B] text-white transition-all duration-300"
                >
                  <Link href={`/${locale}`}>
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
