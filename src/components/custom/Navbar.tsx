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
import { useSession } from 'next-auth/react';
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
      <nav className="mx-auto container w-full bg-[#DAE6EA] py-6 sticky top-0 z-50">
        <div className="flex justify-between px-5 lg:justify-around">
          <Link href="/">
            <AnimatedLogoLight />
          </Link>
          <div className="lg:block hidden">
            <NavigationMenu className="bg-[#DAE6EA]! navigation-menu">
              <NavigationMenuList
                className={`${isArabic ? 'flex-row-reverse!' : 'flex-row!'} gap-5 bg-[#DAE6EA]!`}
              >
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <Link href="/about">{t('about')}</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    {t('markets')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    {t('learn')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    {t('insider')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    {t('how_to')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    {t('support')}
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
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
      className={`mx-auto container w-full ${
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
                if (item.requiresVerification && !isVerified) return null;

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
                                <Link className="flex gap-x-1 items-center" href={child.href}>
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
                <Link href="/" className="block py-4">
                  <Image src={LOGO} alt="Logo Image" width={120} height={40} />
                </Link>
              </SheetHeader>
              <div className="flex flex-row items-center justify-start gap-x-2 pl-3">
                <UserAvatar className="lg:hidden" />
                {session?.user?.email}
              </div>
              <span className={`text-xs pl-5 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
                {isVerified ? t('verified') : t('not_verified')}
              </span>

              {/* Mobile Menu Items - Using NavbarLinks Array */}
              <div className="px-4 py-4 space-y-4">
                {NavbarLinks.map(item => {
                  // Check if item requires authentication and verification
                  if (item.requiresAuth && !isAuthenticated) return null;
                  if (item.requiresVerification && !isVerified) return null;

                  if (item.type === 'link' && item.href) {
                    return (
                      <div key={item.id} className="py-2">
                        <Link
                          href={item.href}
                          className="hover:underline hover:text-[#EC3B3B] font-semibold"
                        >
                          {t(`menu_items.${item.label}`)}
                        </Link>
                      </div>
                    );
                  }

                  if (item.type === 'dropdown' && item.children) {
                    return (
                      <Accordion key={item.id} type="single" collapsible className="w-full">
                        <AccordionItem value={item.label.toLowerCase()} className="border-none">
                          <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-2">
                            {t(`menu_items.${item.label}`)}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-y-3 pl-4">
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
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className="flex items-center gap-x-2 hover:underline"
                                >
                                  {IconComponent && <IconComponent size={20} />}
                                  {t(`menu_items.${translationKey}`)}
                                </Link>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }

                  return null;
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
