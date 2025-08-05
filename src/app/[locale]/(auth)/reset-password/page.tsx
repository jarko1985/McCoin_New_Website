'use client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, Lock, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function ResetPasswordPage() {
  const t = useTranslations('resetPassword');
  const isArabic = useLocale() === 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams?.get('token');
  const email = searchParams?.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        setVerifying(false);
        setTokenValid(false);
        return;
      }

      try {
        const response = await fetch('/api/verify-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });

        const result = await response.json();
        setTokenValid(response.ok && result.valid);

        // Store the error message for better user feedback
        if (!response.ok && result.message) {
          localStorage.setItem('tokenErrorMessage', result.message);
        }
      } catch (error) {
        console.error('Token verification error:', error);
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token, email]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email,
          newPassword: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPasswordReset(true);
        toast.success(t('passwordResetSuccess') || 'Password reset successfully!');
      } else {
        toast.error(result.message || t('passwordResetFailed') || 'Failed to reset password');
      }
    } catch (err: any) {
      console.error('Reset password error:', err);
      toast.error(err.message || t('passwordResetFailed') || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while verifying token
  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07153B] text-white px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center space-y-4"
        >
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#EC3B3B]" />
          <p className="text-[#8CA3D5]">{t('verifyingToken') || 'Verifying reset token...'}</p>
        </motion.div>
      </div>
    );
  }

  // Show success state after password is reset
  if (passwordReset) {
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

            <h1 className="text-2xl font-bold text-white">
              {t('successTitle') || 'Password Reset Successfully'}
            </h1>

            <p className="text-[#8CA3D5] text-sm">
              {t('successMessage') ||
                'Your password has been reset successfully. You can now log in with your new password.'}
            </p>
          </div>

          <Link href={`/${isArabic ? 'ar' : 'en'}/login`} className="block w-full">
            <Button className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200">
              {t('continueToLogin') || 'Continue to Login'}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Show error state if token is invalid
  if (!tokenValid) {
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              {t('invalidTokenTitle') || 'Invalid or Expired Link'}
            </h1>

            <p className="text-[#8CA3D5] text-sm">
              {(() => {
                const storedMessage =
                  typeof window !== 'undefined' ? localStorage.getItem('tokenErrorMessage') : null;
                if (storedMessage) {
                  localStorage.removeItem('tokenErrorMessage');
                  return storedMessage;
                }
                return (
                  t('invalidTokenMessage') ||
                  'This password reset link is invalid or has expired. Please request a new one.'
                );
              })()}
            </p>
          </div>

          <Link href={`/${isArabic ? 'ar' : 'en'}/forgot-password`} className="block w-full">
            <Button className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200">
              {t('requestNewLink') || 'Request New Link'}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Show reset password form
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
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#EC3B3B]/20 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-[#EC3B3B]" />
          </div>

          <h1 className="text-2xl font-bold text-white">{t('title') || 'Set New Password'}</h1>

          <p className="text-[#8CA3D5] text-sm">
            {t('subtitle') || 'Please enter your new password below.'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">{t('newPassword') || 'New Password'}</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('newPasswordPlaceholder') || 'Enter new password'}
                {...register('password')}
                className="bg-[#050E27] border-slate-600 text-white placeholder:text-[#8CA3D5]"
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

          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
              {t('confirmPassword') || 'Confirm Password'}
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('confirmPasswordPlaceholder') || 'Confirm new password'}
                {...register('confirmPassword')}
                className="bg-[#050E27] border-slate-600 text-white placeholder:text-[#8CA3D5]"
              />
              <div
                className={`absolute ${
                  isArabic ? 'left-3' : 'right-3'
                } top-2.5 cursor-pointer text-white`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            className="w-full bg-[#EC3B3B] hover:bg-red-600 transition-all duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? t('resetting') || 'Resetting...' : t('resetButton') || 'Reset Password'}
          </Button>

          <div className="text-center">
            <Link
              href={`/${isArabic ? 'ar' : 'en'}/login`}
              className="text-[#8CA3D5] text-sm hover:text-white transition-colors"
            >
              {t('backToLogin') || 'Back to Login'}
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
