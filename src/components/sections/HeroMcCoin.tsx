// src/app/components/HeroMcCoin.tsx
'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Dashboard from '../homepage/Dashboard';
import { getVerificationStatus } from '@/lib/verification';
import { X, User, Shield, Wallet, TrendingUp } from 'lucide-react';

type IconSpec = {
  id: string;
  x: number; // percent inside right panel
  y: number; // percent inside right panel
  size: number; // px
  delay?: number;
  hue?: number; // for glow color only
  src: string; // /images/icons/xxx.png
  alt: string;
};

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
  // parallax
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 12 });
  const smy = useSpring(my, { stiffness: 60, damping: 12 });
  const rotateX = useTransform(smy, [-200, 200], [6, -6]);
  const rotateY = useTransform(smx, [-200, 200], [-6, 6]);
  const shineX = useTransform(smx, [-200, 200], ['0%', '100%']);

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

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(e.clientX - (rect.left + rect.width / 2));
      my.set(e.clientY - (rect.top + rect.height / 2));
    },
    [mx, my],
  );

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // All icons visible and within bounds
  const icons: IconSpec[] = useMemo(() => {
    const centerX = 50; // Center of the image (50% from left)
    const centerY = 50; // Center of the image (50% from top)
    const radius = 55; // Distance from center to icons
    const totalIcons = 10; // Number of icons

    // Helper function to round to 2 decimal places for consistency
    const roundToTwo = (num: number) => Math.round(num * 100) / 100;

    return [
      // Calculate positions in a perfect circle around the image
      {
        id: 'btc',
        x: roundToTwo(centerX + radius * Math.cos((0 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((0 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.0,
        hue: 4,
        src: '/images/btc.png',
        alt: 'Bitcoin',
      },
      {
        id: 'eth',
        x: roundToTwo(centerX + radius * Math.cos((1 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((1 * 2 * Math.PI) / totalIcons) - 5), // Moved up by 5%
        size: 110,
        delay: 0.1,
        hue: 200,
        src: '/images/ether.png',
        alt: 'Ethereum',
      },
      {
        id: 'sol',
        x: roundToTwo(centerX + radius * Math.cos((2 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((2 * 2 * Math.PI) / totalIcons) - 5),
        size: 130,
        delay: 0.2,
        hue: 210,
        src: '/images/solana.png',
        alt: 'Solana',
      },
      {
        id: 'usdt',
        x: roundToTwo(centerX + radius * Math.cos((3 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((3 * 2 * Math.PI) / totalIcons) - 5), // Moved up by 5%
        size: 110,
        delay: 0.25,
        hue: 165,
        src: '/images/usdt.png',
        alt: 'Tether',
      },
      {
        id: 'bnb',
        x: roundToTwo(centerX + radius * Math.cos((4 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((4 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.3,
        hue: 48,
        src: '/images/bnb.png',
        alt: 'BNB',
      },
      {
        id: 'xrp',
        x: roundToTwo(centerX + radius * Math.cos((5 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((5 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.35,
        hue: 205,
        src: '/images/xrp.png',
        alt: 'XRP',
      },
      {
        id: 'ada',
        x: roundToTwo(centerX + radius * Math.cos((6 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((6 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.4,
        hue: 210,
        src: '/images/ada.png',
        alt: 'Cardano',
      },
      {
        id: 'doge',
        x: roundToTwo(centerX + radius * Math.cos((7 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((7 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.45,
        hue: 42,
        src: '/images/dodge.png',
        alt: 'Dogecoin',
      },
      {
        id: 'dot',
        x: roundToTwo(centerX + radius * Math.cos((8 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((8 * 2 * Math.PI) / totalIcons)),
        size: 110,
        delay: 0.5,
        hue: 330,
        src: '/images/lite.png',
        alt: 'Polkadot',
      },
      {
        id: 'avax',
        x: roundToTwo(centerX + radius * Math.cos((9 * 2 * Math.PI) / totalIcons)),
        y: roundToTwo(centerY + radius * Math.sin((9 * 2 * Math.PI) / totalIcons)),
        size: 100,
        delay: 0.55,
        hue: 356,
        src: '/images/avalanche.png',
        alt: 'avalanche',
      },
    ];
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
      className="relative overflow-hidden bg-gradient-to-br from-[#07153B] via-[#0A1F3D] to-[#07153B] min-h-screen"
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

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-12 sm:px-6 sm:py-16 md:gap-8 lg:gap-12 xl:grid-cols-2 xl:gap-16 xl:py-24"
      >
        {/* Left */}
        <div className="flex flex-col order-1">
          <div className="relative z-10 text-center xl:text-left">
            <h1
              className={`text-3xl font-extrabold  text-white sm:text-4xl md:text-5xl lg:text-6xl ${
                isArabic ? 'xl:text-right tracking-wide leading-20' : 'xl:text-left tracking-wide'
              } `}
            >
              {t('main_title')} <span className="text-[#EC3B3B]">{t('main_title_highlight')}</span>{' '}
              {t('main_title_suffix')}
            </h1>
            <p
              className={`${
                isArabic ? 'xl:text-right' : 'xl:text-left'
              } mt-4 text-base leading-relaxed text-[rgba(218,230,234,0.85)] sm:text-lg md:text-xl`}
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
                  className={`w-full rounded-2xl bg-[#0B1A40] px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-[15px] text-white outline-none ring-1 transition-all duration-200 placeholder:text-white/50 focus:ring-2 focus:ring-[rgba(236,59,59,.75)] ${
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
          </div>
          <div className="mt-8 xl:mt-12">
            <Dashboard />
          </div>
        </div>

        {/* Right */}
        <div className="relative overflow-visible order-2">
          {/* device frame + your image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
            <div className="relative rounded-[20px] sm:rounded-[28px] border border-white/10 bg-[#0B1A40] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10">
                <Image
                  src="/images/hero_bg1.png"
                  alt="McCoin trading platform preview"
                  width={1120}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[28px] ring-1 ring-white/10" />
            </div>
          </div>

          {/* Floating, draggable PNG icons */}
          <div className="pointer-events-none absolute inset-0 overflow-visible -mt-4 sm:-mt-8">
            {icons.map(c => (
              <motion.div
                key={c.id}
                className="absolute hidden sm:block"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: c.size,
                  height: c.size,
                  zIndex: 5,
                }}
                initial={{ y: 20, opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2, delay: c.delay, ease: 'easeOut' }}
              >
                <motion.div
                  className="pointer-events-auto relative"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.94 }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.12}
                  dragConstraints={{ left: -24, right: 24, top: -24, bottom: 24 }}
                  animate={{
                    rotate: [0, 1, 0, -1, 0],
                    scale: [1, 1.02, 1, 1.01, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: (c.delay || 0) * 2,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Glow behind the image */}
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={c.size}
                    height={c.size}
                    className="relative h-auto w-auto select-none"
                    draggable={false}
                    priority={c.id === 'btc'}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal type={showModal} />
    </section>
  );
}
