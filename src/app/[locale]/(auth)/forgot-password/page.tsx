'use client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Create schema function that accepts translations
const createFormSchema = (t: any) =>
  z.object({
    email: z.string().email(t('validations.email_invalid')),
  });

export default function ForgotPasswordPage() {
  const t = useTranslations('forgotPassword');
  const isArabic = useLocale() === 'ar';
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createFormSchema(t)) });

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else if (resendCountdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, canResend]);

  const startCountdown = () => {
    setResendCountdown(60); // 1 minute
    setCanResend(false);
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      setLoading(true);

      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sentEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        startCountdown();
        toast.success(t('emailSent'));
      } else {
        toast.error(result.message || t('emailNotFound'));
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      toast.error(err.message || t('errorSending'));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmailSent(true);
        setSentEmail(data.email);
        startCountdown();
        toast.success(t('emailSent'));
      } else {
        toast.error(result.message || t('emailNotFound'));
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      toast.error(err.message || t('errorSending'));
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07153B] text-white px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md p-8 space-y-6 shadow-2xl backdrop-blur-sm rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #1A0A2E 0%, #2A1A4A 100%)',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(149, 117, 205, 0.15)',
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-white">{t('emailSentTitle')}</h1>

            <p className="text-[#8CA3D5] text-sm">{t('emailSentMessage')}</p>

            <p className="text-[#EC3B3B] font-medium text-sm break-all">{sentEmail}</p>

            <p className="text-[#8CA3D5] text-xs">{t('checkSpam')}</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleResend}
              variant="outline"
              disabled={!canResend || loading}
              className="w-full border-[#EC3B3B] text-[#EC3B3B] hover:bg-[#EC3B3B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {!canResend
                ? `${t('resendIn')} ${resendCountdown}s`
                : loading
                ? t('sending')
                : t('sendAnother')}
            </Button>

            {canResend && (
              <Button
                onClick={() => {
                  setEmailSent(false);
                  setSentEmail('');
                  setResendCountdown(0);
                  setCanResend(true);
                }}
                variant="outline"
                className="w-full border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white"
              >
                {t('tryDifferentEmail')}
              </Button>
            )}

            <Link href={`/${isArabic ? 'ar' : 'en'}/login`} className="block w-full">
              <Button className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200">
                {t('backToLogin')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07153B] text-white px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md p-8 space-y-6 shadow-2xl backdrop-blur-sm rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #1A0A2E 0%, #2A1A4A 100%)',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(149, 117, 205, 0.15)',
        }}
      >
        {/* Back button */}
        {isArabic ? (
          <Link
            href={`/${isArabic ? 'ar' : 'en'}/login`}
            className="flex items-center text-sm text-[#8CA3D5] hover:text-white transition-colors"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <FaArrowRight className="ml-1 w-4 h-4" />
            {t('backToLogin')}
          </Link>
        ) : (
          <Link
            href={`/${isArabic ? 'ar' : 'en'}/login`}
            className="flex items-center text-sm text-[#8CA3D5] hover:text-white transition-colors"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <FaArrowLeft className="mr-1 w-4 h-4" />
            {t('backToLogin')}
          </Link>
        )}

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#EC3B3B]/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-[#EC3B3B]" />
          </div>

          <h1 className="text-2xl font-bold text-white">{t('title')}</h1>

          <p className="text-[#8CA3D5] text-sm">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">{t('emailLabel')}</label>
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              {...register('email')}
              className="bg-[#050E27] border-slate-600 text-white placeholder:text-[#8CA3D5]"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <Button
            className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? t('sending') : t('sendButton')}
          </Button>

          <div className="text-center">
            <Link
              href={`/${isArabic ? 'ar' : 'en'}/login`}
              className="text-[#8CA3D5] text-sm hover:text-white transition-colors"
            >
              {t('rememberPassword')}{' '}
              <span className="text-[#EC3B3B] underline">{t('signIn')}</span>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
