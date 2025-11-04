'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, User, LogOut, Cog, ChevronDown, ChevronUp, Gift, Activity, Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const t = useTranslations('dashboard');
  const [spotExpanded, setSpotExpanded] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && session;
  const pathname = usePathname() || '/';
  const locale = useLocale();

  const isActive = (path: string) => pathname === `/${locale}${path}`;

  useEffect(() => {
    // Check verification status from localStorage
    const checkVerificationStatus = () => {
      const status = localStorage.getItem('userVerificationStatus');
      setIsVerified(status === 'verified');
    };

    checkVerificationStatus();

    // Listen for storage changes (for cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userVerificationStatus') {
        setIsVerified(e.newValue === 'verified');
      }
    };

    // Listen for custom verification status change events (same tab)
    const handleVerificationChange = (e: CustomEvent) => {
      setIsVerified(e.detail === 'verified');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('verificationStatusChanged', handleVerificationChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'verificationStatusChanged',
        handleVerificationChange as EventListener,
      );
    };
  }, []);

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const hoverVariants = {
    hover: {
      x: 5,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  const activeVariants = {
    active: {
      scale: 1.05,
      boxShadow: '0 0 20px rgba(236, 59, 59, 0.4)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  return (
    <motion.aside
      className="w-full flex justify-center sm:justify-start lg:w-64 bg-gradient-to-b from-[#081935] via-[#0a1f3d] to-[#081935] p-6 space-y-6 shadow-2xl border-r border-[#1a2f4d] relative overflow-hidden"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2444] via-transparent to-[#0a1f3d] opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EC3B3B] to-transparent opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#1a2f4d] to-transparent opacity-20 rounded-full blur-2xl" />

      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC3B3B] to-transparent opacity-5 blur-sm" />

      <nav className="space-y-2 relative z-10">
        {/* My Profile */}
        <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
          <Link
            href="/dashboard/profile"
            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              isActive('/dashboard/profile')
                ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
                : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
            } border border-transparent hover:border-[#EC3B3B]/20`}
          >
            <motion.div
              animate={isActive('/dashboard/profile') ? 'active' : {}}
              variants={activeVariants}
              className="flex items-center gap-3 w-full"
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive('/dashboard/profile')
                    ? 'bg-white/20'
                    : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                } transition-all duration-300`}
              >
                <User className="w-5 h-5" />
              </div>
              <span className="font-medium">{t('sidebar.profile')}</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Assets with Submenu - Only show if verified */}
        {isAuthenticated && isVerified && (
          <motion.div variants={itemVariants}>
            <motion.div
              onClick={() => setSpotExpanded(!spotExpanded)}
              className={`group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                [
                  '/dashboard/assets',
                  '/dashboard/assets/trading-account',
                  '/dashboard/assets/funding-account',
                  '/dashboard/records',
                  '/dashboard/withdraw-records',
                ]
                  .map(path => `/${locale}${path}`)
                  .includes(pathname)
                  ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
                  : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
              } border border-transparent hover:border-[#EC3B3B]/20`}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    [
                      '/dashboard/assets',
                      '/dashboard/assets/trading-account',
                      '/dashboard/assets/funding-account',
                      '/dashboard/records',
                      '/dashboard/withdraw-records',
                    ]
                      .map(path => `/${locale}${path}`)
                      .includes(pathname)
                      ? 'bg-white/20'
                      : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                  } transition-all duration-300`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <span className="font-medium">{t('sidebar.my_wallet')}</span>
              </div>
              <motion.div
                animate={{ rotate: spotExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="p-1 rounded-lg bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20 transition-all duration-300"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Subitems */}
            <AnimatePresence>
              {spotExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="overflow-hidden mt-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="ml-8 space-y-2 text-[#DAE6EA] text-sm"
                  >
                    {[
                      { href: '/dashboard/assets', label: t('sidebar.assets'), delay: 0.15 },
                      {
                        href: '/dashboard/assets/trading-account',
                        label: 'Trading Account',
                        delay: 0.2,
                      },
                      {
                        href: '/dashboard/assets/funding-account',
                        label: 'Funding Account',
                        delay: 0.25,
                      },
                      { href: '/dashboard/records', label: t('sidebar.records'), delay: 0.3 },
                      {
                        href: '/dashboard/withdraw-records',
                        label: t('sidebar.withdraw-records'),
                        delay: 0.35,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={`group relative block cursor-pointer py-2 px-3 rounded-lg transition-all duration-300 ${
                            isActive(item.href)
                              ? 'font-semibold text-white bg-gradient-to-r from-[#EC3B3B]/20 to-[#D13535]/20 border border-[#EC3B3B]/30 shadow-lg shadow-[#EC3B3B]/20'
                              : 'hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d]/50 hover:to-[#22304A]/50 hover:border hover:border-[#EC3B3B]/20'
                          }`}
                        >
                          <motion.div whileHover={{ x: 3 }} className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                isActive(item.href)
                                  ? 'bg-[#EC3B3B] shadow-lg shadow-[#EC3B3B]/50'
                                  : 'bg-[#4a5c7a] group-hover:bg-[#EC3B3B]/60'
                              }`}
                            />
                            {item.label}
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Order History - Only show if verified */}
        {isAuthenticated && isVerified && (
          <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard/order-history"
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                isActive('/dashboard/order-history')
                  ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
                  : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
              } border border-transparent hover:border-[#EC3B3B]/20`}
            >
              <motion.div
                animate={isActive('/dashboard/order-history') ? 'active' : {}}
                variants={activeVariants}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive('/dashboard/order-history')
                      ? 'bg-white/20'
                      : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                  } transition-all duration-300`}
                >
                  <History className="w-5 h-5" />
                </div>
                <span className="font-medium">{t('sidebar.orderHistory')}</span>
              </motion.div>
            </Link>
          </motion.div>
        )}
        {/* Promotions */}
        <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
          <Link 
           className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
            isActive('/dashboard/order-history')
              ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
              : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
          } border border-transparent hover:border-[#EC3B3B]/20`}
          href="/dashboard/promotions">
          <motion.div
                animate={isActive('/dashboard/promotions') ? 'active' : {}}
                variants={activeVariants}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive('/dashboard/promotions')
                      ? 'bg-white/20'
                      : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                  } transition-all duration-300`}
                >
                  <Gift className="w-5 h-5" />
                </div>
                <span className="font-medium">{t('sidebar.promotions')}</span>
              </motion.div>
              </Link>
        </motion.div>
         {/* Activities */}
         <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
          <Link 
           className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
            isActive('/dashboard/activities')
              ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
              : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
          } border border-transparent hover:border-[#EC3B3B]/20`}
          href="/dashboard/activities">
          <motion.div
                animate={isActive('/dashboard/activities') ? 'active' : {}}
                variants={activeVariants}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive('/dashboard/activities')
                      ? 'bg-white/20'
                      : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                  } transition-all duration-300`}
                >
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-medium">{t('sidebar.activities')}</span>
              </motion.div>
              </Link>
        </motion.div>
         {/* Notifications */}
         <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
          <Link 
           className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
            isActive('/dashboard/notifications')
              ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
              : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
          } border border-transparent hover:border-[#EC3B3B]/20`}
          href="/dashboard/notifications">
          <motion.div
                animate={isActive('/dashboard/notifications') ? 'active' : {}}
                variants={activeVariants}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive('/dashboard/notifications')
                      ? 'bg-white/20'
                      : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                  } transition-all duration-300`}
                >
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium">{t('sidebar.notifications')}</span>
              </motion.div>
              </Link>
        </motion.div>
        {/* Preferences */}
        <motion.div variants={itemVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
          <Link
            href="/dashboard/preferences"
            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              isActive('/dashboard/preferences')
                ? 'bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white shadow-lg shadow-[#EC3B3B]/30'
                : 'text-[#DAE6EA] hover:text-white hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A]'
            } border border-transparent hover:border-[#EC3B3B]/20`}
          >
            <motion.div
              animate={isActive('/dashboard/preferences') ? 'active' : {}}
              variants={activeVariants}
              className="flex items-center gap-3 w-full"
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive('/dashboard/preferences')
                    ? 'bg-white/20'
                    : 'bg-[#1a2f4d]/50 group-hover:bg-[#EC3B3B]/20'
                } transition-all duration-300`}
              >
                <Cog className="w-5 h-5" />
              </div>
              <span className="font-medium">{t('sidebar.preferences')}</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Logout */}
        <motion.div
          variants={itemVariants}
          whileHover={{ x: 5, scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <div
            className="group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-[#DAE6EA] hover:text-red-400 hover:bg-gradient-to-r hover:from-[#1a2f4d] hover:to-[#22304A] border border-transparent hover:border-red-500/20"
            onClick={() => setShowLogoutPrompt(true)}
          >
            <div className="p-2 rounded-lg bg-[#1a2f4d]/50 group-hover:bg-red-500/20 transition-all duration-300">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">{t('sidebar.logout')}</span>
          </div>
        </motion.div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutPrompt && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#101C36] via-[#0a1f3d] to-[#081935] rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center border border-[#1a2f4d] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40, rotateX: -15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Modal background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EC3B3B]/5 via-transparent to-[#1a2f4d]/20" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EC3B3B] to-transparent opacity-10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="text-xl font-bold mb-6 text-white bg-gradient-to-r from-[#EC3B3B] to-[#D13535] bg-clip-text">
                  {t('logoutPrompt')}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#EC3B3B] to-[#D13535] text-white font-semibold shadow-lg shadow-[#EC3B3B]/30 border border-[#EC3B3B]/20 hover:shadow-xl hover:shadow-[#EC3B3B]/40 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // setShowLogoutPrompt(false);
                      // setTimeout(() => signOut(), 300); // allow animation to finish
                    }}
                  >
                    {t('yes')}
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#22304A] to-[#1a2536] text-white font-semibold shadow-lg shadow-[#1a2536]/30 border border-[#1a2536]/20 hover:shadow-xl hover:shadow-[#1a2536]/40 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutPrompt(false)}
                  >
                    {t('no')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;
