'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = document.cookie.includes('cookie_consent=true') || document.cookie.includes('cookie_consent=false');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptCookies = async () => {
    await fetch('/api/accept-cookies', { method: 'POST' });
    document.cookie = 'cookie_consent=true';
    setIsVisible(false);
  };

  const declineCookies = async () => {
    await fetch('/api/decline-cookies', { method: 'POST' });
    document.cookie = 'cookie_consent=false';
    setIsVisible(false);
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl rounded-xl border border-[#DAE6EA] bg-white p-6 text-[#07153b] shadow-xl z-50"
      >
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden>Cookie Consent</VisuallyHidden>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-[#DAE6EA] rounded">
            <Info className="text-[#07153b]" />
          </div>
          <div className="flex-1 text-sm">
            <p className="mb-1 font-medium">This website uses cookies to ensure you get the best experience on our website.</p>
            <Link href="#" className="text-[#07153b] underline font-medium">Learn more</Link>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="text-[#07153b] border-[#DAE6EA] bg-[#DAE6EA]"
            onClick={declineCookies}
          >
            Reject all
          </Button>
          <Button
            variant="outline"
            className="text-white bg-[#07153b]"
          >
            Adjust my preferences
          </Button>
          <Button
            className="bg-[#EC3B3B] text-white hover:bg-red-600"
            onClick={acceptCookies}
          >
            Accept all
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}