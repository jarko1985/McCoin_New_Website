'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import LOGO from '../../../public/images/logo1.png';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import LangSwitcher from './LangSwitcher';
import { Menu } from 'lucide-react';
import { NavbarLinks } from '../../../utils/data';
import { FaPodcast, FaLandmark } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import { ImNewspaper } from 'react-icons/im';
import { GiSattelite } from 'react-icons/gi';
import { TiUserAddOutline } from 'react-icons/ti';
import { RiExchangeLine, RiVerifiedBadgeLine } from 'react-icons/ri';
import { PiHandDeposit, PiHandWithdraw } from 'react-icons/pi';
import AnimatedLogo from './AnimatedLogo';
import ThemeToggle from './ThemeToggle';
import AnimatedLogoLight from './AnimatedLogoLight';
import UserAvatar from './UserAvatar';
import { useSession, signOut } from 'next-auth/react';
import { LuMailQuestion } from 'react-icons/lu';
import { GrContact } from 'react-icons/gr';
import { FaHandsHelping } from 'react-icons/fa';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Track authentication state more precisely
  const isAuthenticated = status === 'authenticated' && session;
  const isLoading = status === 'loading';

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Also check verification status when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const status = localStorage.getItem('userVerificationStatus');
      setIsVerified(status === 'verified');
    }
  }, [status, session]);

  // Force re-render when authentication status changes
  useEffect(() => {}, [session, status, isAuthenticated]);

  if (!mounted) {
    return (
      <nav className="mx-auto w-full py-6 sticky top-0 z-50">
        <div className="flex justify-between px-5 lg:justify-around">
          <Link href="/">
            <AnimatedLogoLight />
          </Link>
          <div className="lg:block hidden">
            <NavigationMenu className="navigation-menu">
              <NavigationMenuList
                className={`${isArabic ? 'flex-row-reverse!' : 'flex-row!'} gap-5`}
              >
                {/* <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <Link href="/about">{t('about')}</Link>
                </NavigationMenuItem> */}
                <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="dark:bg-[#07153b]! p-0 hover:font-bold cursor-pointer!">
                    {t('markets')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                {/* <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="p-0 hover:font-bold cursor-pointer!">
                    {t('learn')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem> */}
                <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="dark:bg-[#07153b]! p-0 hover:font-bold cursor-pointer!">
                    {t('insider')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="dark:bg-[#07153b]! p-0 hover:font-bold cursor-pointer!">
                    {t('how_to')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                {/* <NavigationMenuItem className="p-0 hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="p-0 hover:font-bold cursor-pointer!">
                    {t('support')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex lg:flex-row items-center justify-center gap-2">
              <UserAvatar />
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t('menu')}</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const isDark = resolvedTheme === 'dark';
  return (
    <nav
      className={`mx-auto w-full ${
        isDark ? 'bg-[#07153b]' : 'bg-[#DAE6EA]'
      }   py-6 sticky top-0 z-50`}
    >
      <div className="flex justify-between px-5 lg:justify-around">
        <Link href="/">{isDark ? <AnimatedLogo /> : <AnimatedLogoLight />}</Link>
        <div className="lg:block hidden">
          <NavigationMenu className="dark:bg-[#07153b]! bg-[#DAE6EA]! navigation-menu">
            <NavigationMenuList className="gap-5 dark:bg-[#07153b]! bg-[#DAE6EA]!">
              {(isArabic ? [...NavbarLinks].reverse() : NavbarLinks).map(item => {
                // Check if item requires authentication and verification
                if (item.requiresAuth && !isAuthenticated) return null;

                // Special case for Spot menu: show when logged in but not verified
                if (item.label === 'spot') {
                  if (!isAuthenticated) return null; // Don't show if not logged in
                  // Show spot menu for both verified and unverified users
                } else if (item.requiresVerification && !isVerified) {
                  return null; // Hide other verification-required items
                }

                if (item.type === 'link' && item.href) {
                  return (
                    <NavigationMenuItem
                      key={item.id}
                      className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!"
                    >
                      <Link href={item.href}>{t(`menu_items.${item.label}`)}</Link>
                    </NavigationMenuItem>
                  );
                }

                if (item.type === 'dropdown' && item.children) {
                  return (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuTrigger
                        className={`text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer! ${
                          isArabic ? '[&>svg]:ml-0 [&>svg]:mr-1 [&>svg]:order-first' : ''
                        }`}
                      >
                        {t(`menu_items.${item.label}`)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="dark:bg-[#07153b]! bg-[#DAE6EA]! dark:text-white text-[#07153b]">
                        <ul className="flex flex-col dark:text-white text-[#07153b] space-y-3 p-2 md:w-[400px] lg:w-[470px] leading-normal tracking-widest">
                          {item.children.map(child => {
                            const IconComponent = child.icon;
                            // Map child labels to translation keys based on parent
                            let translationKey = child.label;
                            if (item.label === 'markets') {
                              translationKey = `markets_children.${child.label}`;
                            } else if (item.label === 'insider') {
                              translationKey = `insider_children.${child.label}`;
                            } else if (item.label === 'how_to') {
                              translationKey = `how_to_children.${child.label}`;
                            }

                            return (
                              <li
                                key={child.id}
                                className="flex gap-x-2 hover:font-bold cursor-pointer!"
                              >
                                <Link
                                  className="flex gap-x-1 items-center gap-y-2 hover:text-[#EC3B3B] font-semibold"
                                  href={child.href}
                                >
                                  {IconComponent && <IconComponent size={25} />}
                                  {t(`menu_items.${translationKey}`)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return null;
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex lg:flex-row items-center justify-center gap-2">
            <UserAvatar />
          </div>
          <ThemeToggle />
          <LangSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="lg:hidden text-[#EC3B3B] bg-[#07153b] border-2 border-[#EC3B3B] hover:text-[#EC3B3B] cursor-pointer"
                variant="outline"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent className="lg:hidden bg-[#07153b] text-white overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Link href="/" className="block py-4">
                  <Image src={LOGO} alt="Logo Image" width={120} height={40} />
                </Link>
              </SheetHeader>
              {/* User Authentication Status Section */}
              <div className="px-4 py-4 border-b border-gray-600/30">
                {!isAuthenticated ? (
                  // Not logged in state
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-400 font-medium text-sm">Not Logged In</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Please Login or Register to Enjoy Seamless Trading Experience
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/login"
                        className="w-full bg-[#EC3B3B] hover:bg-[#d63333] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full bg-transparent border border-[#EC3B3B] text-[#EC3B3B] hover:bg-[#EC3B3B] hover:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                ) : !isVerified ? (
                  // Logged in but not verified state
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar className="lg:hidden w-8 h-8" />
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">
                          Welcome,{' '}
                          {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-gray-400 text-xs">{session?.user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-400 font-medium text-sm">
                        User is not Verified
                      </span>
                    </div>
                    <Link
                      href="/verify-your-account"
                      className="w-full bg-[#EC3B3B] hover:bg-[#d63333] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                    >
                      Verify Your Account
                    </Link>
                  </div>
                ) : (
                  // Logged in and verified state
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar className="lg:hidden w-8 h-8" />
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">
                          Welcome,{' '}
                          {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-gray-400 text-xs">{session?.user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-medium text-sm">Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Items - Using NavbarLinks Array */}
              <div className="px-4 py-4 space-y-0">
                {NavbarLinks.map((item, index) => {
                  // Check if item requires authentication and verification
                  if (item.requiresAuth && !isAuthenticated) return null;

                  // Special case for Spot menu: show when logged in but not verified
                  if (item.label === 'spot') {
                    if (!isAuthenticated) return null; // Don't show if not logged in
                    // Show spot menu for both verified and unverified users
                  } else if (item.requiresVerification && !isVerified) {
                    return null; // Hide other verification-required items
                  }

                  if (item.type === 'link' && item.href) {
                    return (
                      <div key={item.id}>
                        <div className="py-3 border-b border-gray-600/30">
                          <Link
                            href={item.href}
                            className="hover:underline hover:text-[#EC3B3B] font-semibold block"
                          >
                            {t(`menu_items.${item.label}`)}
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === 'dropdown' && item.children) {
                    return (
                      <div key={item.id}>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={item.label.toLowerCase()} className="border-none">
                            <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-3 border-b border-gray-600/30">
                              {t(`menu_items.${item.label}`)}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-y-0 pt-2">
                              {item.children.map((child, childIndex) => {
                                const IconComponent = child.icon;
                                // Map child labels to translation keys based on parent
                                let translationKey = child.label;
                                if (item.label === 'markets') {
                                  translationKey = `markets_children.${child.label}`;
                                } else if (item.label === 'insider') {
                                  translationKey = `insider_children.${child.label}`;
                                } else if (item.label === 'how_to') {
                                  translationKey = `how_to_children.${child.label}`;
                                }

                                return (
                                  <div key={child.id}>
                                    <Link
                                      href={child.href}
                                      className="flex items-center gap-x-3 hover:underline py-2.5 px-2 rounded-md hover:bg-gray-700/30 transition-colors duration-200"
                                    >
                                      {IconComponent && <IconComponent size={18} />}
                                      <span className="text-sm">
                                        {t(`menu_items.${translationKey}`)}
                                      </span>
                                    </Link>
                                    {childIndex < (item.children?.length || 0) - 1 && (
                                      <div className="h-px bg-gray-600/20 mx-2"></div>
                                    )}
                                  </div>
                                );
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Logout Button - Only show for authenticated users */}
              {isAuthenticated && (
                <div className="px-4 py-4 border-t border-gray-600/30 mt-auto">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
