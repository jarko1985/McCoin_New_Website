'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {
  const t = useTranslations('verifyEmail');
  const isArabic = useLocale() === 'ar';
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>(
    'loading',
  );
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams?.get('token');
      const email = searchParams?.get('email');

      if (!token || !email) {
        setStatus('error');
        setMessage(t('invalid_link') || 'Invalid verification link');
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?token=${token}&email=${email}`);
        const data = await response.json();

        if (data.success) {
          if (data.alreadyVerified) {
            setStatus('already-verified');
            setMessage(t('already_verified') || 'Email already verified');
          } else {
            setStatus('success');
            setMessage(t('verification_success') || 'Email verified successfully');
            toast.success(t('verification_success') || 'Email verified successfully');
          }
        } else {
          setStatus('error');
          setMessage(data.message || t('verification_failed') || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(t('verification_error') || 'An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams, t]);

  const handleResendVerification = async () => {
    const email = searchParams?.get('email');
    if (!email) return;

    setIsResending(true);
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t('resend_success') || 'Verification email sent successfully');
      } else {
        toast.error(data.message || t('resend_error') || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error(t('resend_error') || 'Failed to send verification email');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-[#EC3B3B]" />
            <h1 className="text-2xl font-bold mb-2">{t('verifying') || 'Verifying Email...'}</h1>
            <p className="text-gray-400">
              {t('please_wait') || 'Please wait while we verify your email address'}
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-2xl font-bold mb-2 text-green-400">
              {t('success_title') || 'Email Verified!'}
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link href={`/${isArabic ? 'ar' : 'en'}/login`}>
              <Button className="bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200">
                {t('continue_to_login') || 'Continue to Login'}
              </Button>
            </Link>
          </div>
        );

      case 'already-verified':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h1 className="text-2xl font-bold mb-2 text-blue-400">
              {t('already_verified_title') || 'Already Verified'}
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link href={`/${isArabic ? 'ar' : 'en'}/login`}>
              <Button className="bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200">
                {t('go_to_login') || 'Go to Login'}
              </Button>
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold mb-2 text-red-400">
              {t('error_title') || 'Verification Failed'}
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="space-y-3">
              <Button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200"
              >
                {isResending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('resending') || 'Resending...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('resend_email') || 'Resend Verification Email'}
                  </div>
                )}
              </Button>
              <Link href={`/${isArabic ? 'ar' : 'en'}`}>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {t('back_to_home') || 'Back to Home'}
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        {renderContent()}
      </motion.div>
    </div>
  );
}
