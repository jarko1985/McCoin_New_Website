'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSearchParams } from 'next/navigation';

// Create schema function that accepts translations
const createFormSchema = (t: any) =>
  z.object({
    email: z.string().email(t('validations.email_invalid')),
    password: z.string().min(1, t('validations.password_required')),
  });

export default function LoginPage() {
  const t = useTranslations('signIn');
  const isArabic = useLocale() === 'ar';
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(createFormSchema(t)) });

  // Countdown timer for rate limit
  useEffect(() => {
    if (retryAfter && retryAfter > 0) {
      const timer = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev === null || prev <= 1) {
            setRateLimited(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [retryAfter]);

  // Check for NextAuth error parameters and pre-fill email
  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      console.log('NextAuth error detected:', error);
      switch (error) {
        case 'Configuration':
          toast.error(t('errors.auth_service_error'));
          break;
        case 'AccessDenied':
          toast.error(t('errors.access_denied'));
          break;
        case 'Verification':
          toast.error(t('errors.verification_required'));
          break;
        default:
          toast.error(t('errors.auth_error_generic'));
      }
    }

    // Pre-fill email from URL parameter
    const emailParam = searchParams?.get('email');
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [searchParams, setValue, t]);

  const onSubmit = async (data: any) => {
    // Prevent submission if rate limited
    if (rateLimited) {
      toast.error(t('rate_limit.form_disabled'));
      return;
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setRecaptchaError(t('recaptcha_required') || 'Please complete the reCAPTCHA challenge.');
      toast.error(t('recaptcha_required') || 'Please complete the reCAPTCHA challenge.');
      return;
    }
    setRecaptchaError(null);

    try {
      setLoading(true);

      // First check user status to see if 2FA is required
      const statusResponse = await fetch('/api/check-user-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: data.email, 
          password: data.password,
          recaptchaToken,
        }),
      });

      // Check for rate limit error (429)
      if (statusResponse.status === 429) {
        const rateLimitData = await statusResponse.json();
        const retrySeconds = rateLimitData.retryAfter || 900; // Default to 15 minutes
        
        setRateLimited(true);
        setRetryAfter(retrySeconds);
        
        toast.error(
          t('rate_limit.message'),
          {
            duration: 5000,
            icon: '⏱️',
          }
        );
        
        // Show countdown toast
        toast(
          t('rate_limit.retry_after', { seconds: retrySeconds }),
          {
            duration: retrySeconds * 1000,
            icon: '⏳',
          }
        );
        
        setLoading(false);
        return;
      }

      const statusData = await statusResponse.json();

      // Check if the first API call returned an error
      if (!statusResponse.ok) {
        // Handle errors from the first API call
        if (statusData.error === 'email_not_verified') {
          toast.error(t('email_not_verified'));
          setTimeout(() => {
            toast.success(t('resend_verification_hint'));
          }, 3000);
        } else if (statusData.error === 'recaptcha_verification_failed') {
          toast.error(statusData.message || t('recaptcha_required') || 'reCAPTCHA verification failed');
          setRecaptchaToken(null);
          setRecaptchaError(statusData.message || 'reCAPTCHA verification failed');
        } else if (statusData.error === 'invalid_credentials') {
          toast.error(t('invalid_credentials'));
        } else {
          toast.error(statusData.message || t('login_failed'));
        }
        setLoading(false);
        return;
      }

      // If we get here, the first API call succeeded
      if (statusData.needs2FA) {
        // User has 2FA enabled, redirect to 2FA verification page
        const locale = isArabic ? 'ar' : 'en';
        const params = new URLSearchParams({
          email: data.email,
          password: data.password,
        });
        router.push(`/${locale}/verify-2fa?${params.toString()}`);
        return;
      }

      // Use NextAuth signIn - validation will be handled in the authorize callback
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log('NextAuth signIn result:', {
        ok: result?.ok,
        error: result?.error,
        status: result?.status,
        url: result?.url,
        allProperties: Object.keys(result || {}),
      });

      if (result?.error) {
        console.error('NextAuth error:', result.error);

        // Check what specific error occurred to provide better messaging
        if (result.error === 'CredentialsSignin') {
          // The first API call already validated credentials successfully
          // If NextAuth fails here, it's likely a session/configuration issue
          // Use the statusData from the first call if available
          if (statusData.error === 'email_not_verified') {
            toast.error(t('email_not_verified'));
            setTimeout(() => {
              toast.success(t('resend_verification_hint'));
            }, 3000);
          } else {
            toast.error(t('invalid_credentials'));
          }
        } else {
          toast.error(t('errors.auth_service_error_generic'));
        }
      } else if (result?.ok) {
        // Success
        toast.success(t('login_success'));
        const locale = isArabic ? 'ar' : 'en';
        
        // Check for callbackUrl parameter
        const callbackUrl = searchParams?.get('callbackUrl');
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push(`/${locale}`);
        }
      } else {
        toast.error(t('login_failed'));
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err.message || t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex md:flex-row flex-col items-center justify-center bg-[#07153B] text-white px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md md:h-[600px] p-6 space-y-6 shadow-2xl backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, #1A0A2E 0%, #2A1A4A 100%)',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(149, 117, 205, 0.15)',
        }}
      >
        {/* Back button */}
        {isArabic ? (
          <Link
            href={`/${isArabic ? 'ar' : 'en'}`}
            className="flex items-center text-sm text-[#8CA3D5] hover:text-white transition-colors"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <FaArrowRight className="ml-1 w-4 h-4" />
            {t('back')}
          </Link>
        ) : (
          <Link
            href={`/${isArabic ? 'ar' : 'en'}`}
            className="flex items-center text-sm text-[#8CA3D5] hover:text-white transition-colors"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <FaArrowLeft className="mr-1 w-4 h-4" />
            {t('back')}
          </Link>
        )}

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {t('title4_1')} McC<span className="text-[#EC3B3B]">o</span>in
          </h1>
          {/* <h1 className="text-3xl font-bold text-white">{t('title6')}</h1> */}
          <p className="text-sm text-[#8CA3D5]">{t('title5')}</p>
        </div>

        {/* Coin grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* KNO */}
          <div className="bg-[#050E27] rounded-xl p-4 backdrop-blur-sm shadow-2xl border border-slate-600">
            <div className="flex flex-col gap-3 mb-3">
              <Image src="/images/knc.svg" alt="knc" width={32} height={32} />
              <p className="text-white font-medium">KNO</p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-white text-lg font-semibold">0.74</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                10.03% <ArrowUp className="w-4 h-4" />
              </p>
            </div>
          </div>

          {/* LUNA */}
          <div className="bg-[#050E27] rounded-xl p-4 backdrop-blur-sm shadow-2xl border border-slate-600">
            <div className="flex flex-col gap-3 mb-3">
              <Image src="/images/luna.svg" alt="luna" width={32} height={32} />
              <p className="text-white font-medium">LUNA</p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-white text-lg font-semibold">0.6345</p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                10.02% <ArrowDown className="w-4 h-4" />
              </p>
            </div>
          </div>

          {/* DIA */}
          <div className="bg-[#050E27] rounded-xl p-4 backdrop-blur-sm shadow-2xl border border-slate-600">
            <div className="flex flex-col gap-3 mb-3">
              <Image src="/images/dia.svg" alt="dia" width={32} height={32} />
              <p className="text-white font-medium">DIA</p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-white text-lg font-semibold">0.32423</p>
              <p className="text-red-400 text-sm flex items-center gap-1">
                10.03% <ArrowDown className="w-4 h-4" />
              </p>
            </div>
          </div>

          {/* CVX */}
          <div className="bg-[#050E27] rounded-xl p-4 backdrop-blur-sm shadow-2xl border border-slate-600">
            <div className="flex flex-col gap-3 mb-3">
              <Image src="/images/cvx.svg" alt="cvx" width={32} height={32} />
              <p className="text-white font-medium">CVX</p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-white text-lg font-semibold">0.74</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                10.03% <ArrowUp className="w-4 h-4" />
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full h-[600px] max-w-md pt-12 px-6 space-y-6 bg-[#050E27] shadow-xl"
      >
        <div>
          <Image src="/images/login_pic.svg" alt="logo" width={40} height={40} />
          <h2 className="text-2xl mt-2">
            {t('title1')} <span className="text-[#EC3B3B]">{t('title2')}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label>{t('email_label')}</label>
            <Input 
              type="email" 
              placeholder={t('email')} 
              {...register('email')} 
              disabled={rateLimited}
              className={rateLimited ? 'opacity-50 cursor-not-allowed' : ''}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>{t('password_label')}</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                {...register('password')}
                disabled={rateLimited}
                className={rateLimited ? 'opacity-50 cursor-not-allowed' : ''}
              />
              <div
                className={`absolute ${
                  isArabic ? 'left-3' : 'right-3'
                } top-2.5 cursor-pointer text-white`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          <div
            className={`flex gap-x-1 ${isArabic ? 'justify-start' : 'justify-start'}`}
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <p>{t('forgotPassword1_1')}</p>
            <p>{t('forgotPassword1_2')}</p>
            <Link
              href={`/${isArabic ? 'ar' : 'en'}/forgot-password`}
              className="text-[#EC3B3B] text-sm underline"
            >
               {t('forgotPassword1_3')}
            </Link>
          </div>

          {/* reCAPTCHA */}
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-center">
              {RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token: string | null) => {
                    setRecaptchaToken(token);
                    setRecaptchaError(null);
                  }}
                  onExpired={() => {
                    setRecaptchaToken(null);
                    setRecaptchaError(t('recaptcha_required') || 'reCAPTCHA expired. Please verify again.');
                  }}
                  onError={() => {
                    setRecaptchaToken(null);
                    setRecaptchaError('reCAPTCHA error. Please try again.');
                  }}
                />
              ) : (
                <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-3 text-center">
                  <p className="text-yellow-400 text-sm">
                    reCAPTCHA not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                  </p>
                </div>
              )}
            </div>
            {recaptchaError && (
              <p className="text-red-400 text-sm text-center">{recaptchaError}</p>
            )}
          </div>

          {/* Rate limit warning */}
          {rateLimited && retryAfter !== null && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-center">
              <p className="text-red-400 text-sm font-medium mb-1">
                {t('rate_limit.title')}
              </p>
              <p className="text-red-300 text-xs">
                {t('rate_limit.countdown', { seconds: retryAfter })}
              </p>
            </div>
          )}

          <Button
            className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading || rateLimited || !recaptchaToken}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : rateLimited ? (
              t('rate_limit.countdown', { seconds: retryAfter || 0 })
            ) : (
              t('button')
            )}
          </Button>

          <p className="text-center text-sm text-[#DAE6EA]">
            {/* {t('noAccount')} */}
            <Link href={`/${isArabic ? 'ar' : 'en'}/signup`} className="text-[#EC3B3B] underline">
              {t('registerNow')}
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
