'use client';
import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { ManageCookiesModal } from './ManageCookiesModal';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';

export const CookieConsent = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const { consent, acceptAll, rejectAll, isInitialized } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInitialized && !localStorage.getItem('cookie-consent-dismissed')) {
      setIsVisible(true);
    }
  }, [isInitialized]);

  const handleAccept = async () => {
    acceptAll();
    localStorage.setItem('cookie-consent-dismissed', 'true');
    setIsVisible(false);
    await saveConsentToAPI({ essential: true, performance: true, advertisement: true });
  };

  const handleReject = async () => {
    rejectAll();
    localStorage.setItem('cookie-consent-dismissed', 'true');
    setIsVisible(false);
    await saveConsentToAPI({ essential: true, performance: false, advertisement: false });
  };

  const saveConsentToAPI = async (consent: Record<string, boolean>) => {
    try {
      const response = await fetch(`/${locale}/api/cookie-consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consent }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save cookie consent');
      }
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-[#07153b] p-6 rounded-lg shadow-lg border border-white z-50">
      <h3 className="font-bold text-lg mb-2 text-white">Personalize your experience</h3>
      <p className="text-[#DAE6EA] mb-4">
        Cookies help us to optimize our services and your experience. We use the information as part of our EU-wide activities.{' '}
        <a href="/privacy-policy" className="font-bold text-white hover:underline cursor-pointer">
          Cookie policys
        </a>
      </p>
      <div className="flex space-x-3">
        <Button
          onClick={handleAccept}
          className="bg-white hover:bg-green-500 text-[#07153b] px-4 py-2 rounded-md cursor-pointer hover:text-white"
        >
          Accept all
        </Button>
        <Button
          onClick={handleReject}
          className="bg-white hover:bg-red-500 text-[#07153b] px-4 py-2 rounded-md cursor-pointer hover:text-white"
        >
          Reject all
        </Button>
      </div>

      <ManageCookiesModal />
    </div>
  );
};