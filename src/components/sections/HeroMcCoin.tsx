// src/app/components/HeroMcCoin.tsx
'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Dashboard from '../homepage/Dashboard';
import { getVerificationStatus } from '@/lib/verification';
import { X, User, Shield, Wallet, TrendingUp } from 'lucide-react';
import StackCards from '../custom/StackCards';
import TrustpilotBadge from '../custom/TrustPilot';

// Modal Types
type ModalType = 'logged-in-not-verified' | 'not-logged-in' | 'logged-in-verified' | null;

export default function HeroMcCoin() {
  const t = useTranslations('HomePage.HeroMcCoin');

  // Email validation function
  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    if (!email.trim()) {
      return { isValid: false, error: t('email_required') };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: t('email_invalid') };
    }

    return { isValid: true };
  };
  // ref
  const ref = useRef<HTMLDivElement>(null);

  // Session and state management
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [isVerified, setIsVerified] = useState(false);

  // Check verification status
  useEffect(() => {
    const checkVerificationStatus = () => {
      const status = getVerificationStatus();
      setIsVerified(status === 'verified');
    };

    checkVerificationStatus();

    // Listen for verification status changes
    const handleVerificationChange = (e: CustomEvent) => {
      setIsVerified(e.detail === 'verified');
    };

    window.addEventListener('verificationStatusChanged', handleVerificationChange as EventListener);
    return () => {
      window.removeEventListener(
        'verificationStatusChanged',
        handleVerificationChange as EventListener,
      );
    };
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setEmailError(validation.error || 'Invalid email');
      return;
    }

    setBusy(true);

    try {
      // Determine user state and show appropriate modal
      const isAuthenticated = status === 'authenticated' && session;

      if (isAuthenticated && !isVerified) {
        // Case 1: User is logged in but not verified
        setShowModal('logged-in-not-verified');
      } else if (!isAuthenticated) {
        // Case 2: User is not logged in
        setShowModal('not-logged-in');
      } else if (isAuthenticated && isVerified) {
        // Case 3: User is logged in and verified
        setShowModal('logged-in-verified');
      }
    } catch (error) {
      console.error('Error handling submit:', error);
    } finally {
      setBusy(false);
    }
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleVerifyIdentity = () => {
    closeModal();
    router.push(`/${locale}/verify-your-account`);
  };

  const handleRegisterNow = () => {
    closeModal();
    router.push(`/${locale}/signup?email=${encodeURIComponent(email)}`);
  };

  const handleLogin = () => {
    closeModal();
    router.push(`/${locale}/login?email=${encodeURIComponent(email)}`);
  };

  const handleMyWallet = () => {
    closeModal();
    router.push(`/${locale}/dashboard/assets/overview`);
  };

  const handleTradeNow = () => {
    closeModal();
    router.push(`/${locale}/spot`);
  };

  // Modal Component
  const Modal = ({ type }: { type: ModalType }) => {
    if (!type) return null;

    const modalContent = {
      'logged-in-not-verified': {
        icon: <Shield className="w-12 h-12 text-[#EC3B3B]" />,
        title: t('modal.logged_in_not_verified.title'),
        message: t('modal.logged_in_not_verified.message'),
        buttons: [
          {
            text: t('modal.logged_in_not_verified.cancel'),
            onClick: closeModal,
            variant: 'secondary',
          },
          {
            text: t('modal.logged_in_not_verified.verify_identity'),
            onClick: handleVerifyIdentity,
            variant: 'primary',
          },
        ],
      },
      'not-logged-in': {
        icon: <User className="w-12 h-12 text-[#EC3B3B]" />,
        title: t('modal.not_logged_in.title'),
        message: t('modal.not_logged_in.message'),
        buttons: [
          { text: t('modal.not_logged_in.cancel'), onClick: closeModal, variant: 'secondary' },
          {
            text: t('modal.not_logged_in.register_now'),
            onClick: handleRegisterNow,
            variant: 'primary',
          },
          { text: t('modal.not_logged_in.login'), onClick: handleLogin, variant: 'outline' },
        ],
      },
      'logged-in-verified': {
        icon: <Wallet className="w-12 h-12 text-[#EC3B3B]" />,
        title: t('modal.logged_in_verified.title'),
        message: t('modal.logged_in_verified.message'),
        buttons: [
          { text: t('modal.logged_in_verified.cancel'), onClick: closeModal, variant: 'secondary' },
          {
            text: t('modal.logged_in_verified.my_wallet'),
            onClick: handleMyWallet,
            variant: 'primary',
          },
          {
            text: t('modal.logged_in_verified.trade_now'),
            onClick: handleTradeNow,
            variant: 'outline',
          },
        ],
      },
    };

    const content = modalContent[type];

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-br from-[#0B1A40] to-[#07153B] rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">{content.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{content.title}</h3>

              {/* Message */}
              <p className="text-[#DAE6EA]/80 text-sm leading-relaxed mb-6">{content.message}</p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                {content.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={`
                      px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                      ${
                        button.variant === 'primary'
                          ? 'bg-gradient-to-r from-[#EC3B3B] to-[#B22525] text-white hover:from-[#B22525] hover:to-[#8A1E1E] shadow-lg hover:shadow-xl'
                          : button.variant === 'outline'
                          ? 'border border-[#EC3B3B] text-[#EC3B3B] hover:bg-[#EC3B3B] hover:text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#DAE6EA] dark:bg-gradient-to-br from-[#07153B] via-[#0A1F3D] to-[#07153B] min-h-screen"
      suppressHydrationWarning
    >
      {/* soft accents */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(600px circle at 50% 50%, rgba(236,59,59,.18), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(700px circle at 50% 50%, rgba(218,230,234,.18), transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid xl:w-[80%] gap-6 px-4 py-8 sm:px-6 sm:py-2 md:gap-8 lg:gap-12 xl:gap-16">
        {/* Left */}
        <div className="flex flex-col xl:flex-row items-center">
          <div className="flex flex-col xl:mt-[6rem] relative z-10 flex-1">
            <h1
              className={`text-2xl xl:max-w-xl font-extrabold text-center  dark:text-white text-[#07153B] sm:text-3xl xl:text-4xl ${
                isArabic ? 'xl:text-right tracking-wide leading-20' : 'xl:text-left tracking-wide'
              } `}
            >
              {t('main_title')} <span className="text-[#EC3B3B]">{t('main_title_highlight')}</span>{' '}
            </h1>
            <p className="text-base leading-relaxed text-center xl:text-left  dark:text-[rgba(218,230,234,0.85)] text-[#07153B] sm:text-lg md:text-xl">
              {t('main_title_suffix')}
            </p>
            <p
              className={`${
                isArabic ? 'xl:text-right' : 'xl:text-left'
              } mt-4 text-center text-base leading-relaxed xl:max-w-xl  dark:text-[rgba(218,230,234,0.85)] text-[#07153B] sm:text-lg md:text-lg`}
            >
              {t('subtitle')}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto xl:mx-0 mt-6 xl:mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row"
            >
              <div className="flex-1">
                <label className="sr-only" htmlFor="hero-email">
                  Email
                </label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t('email_placeholder')}
                  className={`w-full rounded-2xl dark:bg-[#0B1A40] bg-[#DAE6EA] border placeholder:text-[0.875rem] border-slate-500 dark:border-white/10  px-4 py-3 sm:px-3 sm:py-4 text-sm sm:text-[15px] dark:text-white text-[#07153B] outline-none ring-1 transition-all duration-200 dark:placeholder:text-white/50 placeholder:text-[#07153B]/50 focus:ring-2 focus:ring-[rgba(236,59,59,.75)] ${
                    emailError ? 'ring-[#EC3B3B]' : 'ring-white/10'
                  }`}
                  aria-label="Email address"
                />
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-[#EC3B3B] text-left"
                  >
                    {emailError}
                  </motion.p>
                )}
              </div>
              <button
                type="submit"
                disabled={busy}
                className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 sm:py-4 font-semibold text-white transition"
                style={{
                  background: 'linear-gradient(135deg, #EC3B3B 0%, #B22525 100%)',
                  boxShadow: '0 12px 30px rgba(236,59,59,0.35)',
                }}
              >
                <span className="translate-y-0 transition-transform group-active:translate-y-[1px]">
                  {busy ? t('submitting') : t('join_now')}
                </span>
              </button>
            </form>
            <TrustpilotBadge />
          </div>
          <div className="relative z-10 2xl:w-[756px] 2xl:h-[526px] mx-auto mt-8 xl:mx-0 lg:w-[600px]  md:w-[500px] md:h-[300px] sm:w-[400px] sm:h-[200px] w-[300px] h-[200px] ">
            <Image
              src="/images/hero_bg_2.png"
              alt="McCoin Video"
              fill
              className="w-full h-full object-contain absolute z-0 top-0"
              priority
            />
          </div>
        </div>
      </div>
      <StackCards />
      {/* Modal */}
      <Modal type={showModal} />
    </section>
  );
}
