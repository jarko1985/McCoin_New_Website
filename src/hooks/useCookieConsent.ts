'use client';

import { useState, useEffect } from 'react';
import { CookieConsent, CookieType } from '@/types/cookies';
import { COOKIE_CONSENT_KEY } from '@/constants';

const defaultConsent: CookieConsent = {
  essential: true,
  performance: false,
  advertisement: false
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
    setIsInitialized(true);
  }, []);

  // Save consent to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    }
  }, [consent, isInitialized]);

  const updateConsent = (type: CookieType, value: boolean) => {
    setConsent(prev => ({ ...prev, [type]: value }));
  };

  const acceptAll = () => {
    setConsent({
      essential: true,
      performance: true,
      advertisement: true
    });
  };

  const rejectAll = () => {
    setConsent({
      essential: true,
      performance: false,
      advertisement: false
    });
  };

  return {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    isInitialized
  };
};