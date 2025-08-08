'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import TwoFASetupModal from './TwoFASetupModal';
import TwoFADisableModal from './TwoFADisableModal';

export default function PreferencesTab() {
  const t = useTranslations('dashboard.preferences');
  const { setTheme, theme } = useTheme();
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';

  useEffect(() => {
    fetch2FAStatus();
  }, []);

  const fetch2FAStatus = async () => {
    try {
      console.log('Fetching 2FA status...');
      const response = await fetch('/api/2fa/status');
      console.log('2FA status response:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('2FA status data:', data);
        setTwoFactorEnabled(data.twoFactorEnabled);
      } else {
        const errorData = await response.json();
        console.error('2FA status error:', errorData);
      }
    } catch (error) {
      console.error('Failed to fetch 2FA status:', error);
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  const handle2FAToggle = async (checked: boolean) => {
    if (checked) {
      setShowSetupModal(true);
    } else {
      setShowDisableModal(true);
    }
  };

  const handle2FASuccess = () => {
    fetch2FAStatus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-[#081935] border-[0.5px] rounded-md border-[#DAE6EA]">
        <CardHeader>
          <CardTitle className="text-white text-xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <Label className="text-[#DAE6EA]">{t('currency')}</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-[#0f294d] text-white w-full sm:w-32 px-3">
                    <SelectValue placeholder={t('selectCurrency')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#081935] text-white min-w-[8rem]">
                    <SelectItem value="USD">{t('currencies.USD')}</SelectItem>
                    <SelectItem value="EUR">{t('currencies.EUR')}</SelectItem>
                    <SelectItem value="AED">{t('currencies.AED')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <Label className="text-[#DAE6EA]">{t('language')}</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-[#0f294d] text-white w-full sm:w-32 px-3">
                    <SelectValue placeholder={t('selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#081935] text-white min-w-[8rem]">
                    <SelectItem value="English" dir={isArabic ? 'rtl' : 'ltr'}>
                      {t('languages.English')}
                    </SelectItem>
                    <SelectItem
                      value="Arabic"
                      dir={isArabic ? 'rtl' : 'ltr'}
                      className={isArabic ? 'text-right' : ''}
                    >
                      {t('languages.Arabic')}
                    </SelectItem>
                    <SelectItem
                      value="French"
                      dir={isArabic ? 'rtl' : 'ltr'}
                      className={isArabic ? 'text-right' : ''}
                    >
                      {t('languages.French')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <Label className="text-[#DAE6EA]">{t('darkMode')}</Label>
                <button
                  onClick={() => handleDarkModeToggle(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EC3B3B] focus:ring-offset-2 ${
                    darkMode ? 'bg-[#EC3B3B]' : 'bg-slate-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <Label className="text-[#DAE6EA]">{t('twoFactorAuth')}</Label>
                  <p className="text-sm text-gray-400 mt-1">{t('twoFactorAuthDesc')}</p>
                </div>
                <button
                  onClick={() => handle2FAToggle(!twoFactorEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EC3B3B] focus:ring-offset-2 ${
                    twoFactorEnabled ? 'bg-[#EC3B3B]' : 'bg-slate-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TwoFASetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        onSuccess={handle2FASuccess}
      />

      <TwoFADisableModal
        isOpen={showDisableModal}
        onClose={() => setShowDisableModal(false)}
        onSuccess={handle2FASuccess}
      />
    </motion.div>
  );
}
