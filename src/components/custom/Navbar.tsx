'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import LOGO from '../../../public/images/logo1.png';
import Link from 'next/link';
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
import { NAV_DATA } from '../../../utils/data';
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
              <NavigationMenuList className="gap-5 bg-[#DAE6EA]!">
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <Link href="/about">About</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    Markets
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    Learn
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    insider
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    How to
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  <NavigationMenuTrigger className="text-[#07153b]! p-0 bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    Support
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
                    <SheetTitle>Menu</SheetTitle>
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
              <NavigationMenuItem className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                <Link href="/">Home</Link>
              </NavigationMenuItem>

              {/* Only show Assets and Spot if user is authenticated AND verified */}
              {isAuthenticated && isVerified && (
                <>
                  <NavigationMenuItem className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    <Link href="/dashboard/assets">Assets</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                    <Link href="/spot">Spot</Link>
                  </NavigationMenuItem>
                </>
              )}

              <NavigationMenuItem className="text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                <NavigationMenuTrigger className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  Markets
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#07153b]! bg-[#DAE6EA]! dark:text-white text-[#07153b]">
                  <ul className="flex flex-col dark:text-white text-[#07153b] space-y-3 p-2 md:w-[400px] lg:w-[470px] leading-normal tracking-widest">
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      <Link className="flex gap-x-1 items-center" href="/market-overview">
                        <FaLandmark size={25} /> Overview
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      <Link className="flex gap-x-1 items-center" href="/market-explorer">
                        <MdOutlineExplore size={25} /> Explorer
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  insider
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#07153b]! bg-[#DAE6EA]! dark:text-white text-[#07153b]">
                  <ul className="flex flex-col dark:text-white text-[#07153b] space-y-3 p-2 md:w-[400px] lg:w-[470px] leading-normal tracking-widest">
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="top-news">
                        {' '}
                        <ImNewspaper size={25} /> Top News
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="/news-room">
                        {' '}
                        <GiSattelite size={25} />
                        Newsroom
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="podcasts">
                        {' '}
                        <FaPodcast size={25} />
                        Podcasts
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#07153b]! dark:text-white! p-0 dark:bg-[#07153b]! bg-[#DAE6EA]! hover:font-bold cursor-pointer!">
                  How to
                </NavigationMenuTrigger>
                <NavigationMenuContent className="dark:bg-[#07153b]! bg-[#DAE6EA]! dark:text-white text-[#07153b]">
                  <ul className="flex flex-col dark:text-white text-[#07153b] space-y-3 p-2 md:w-[400px] lg:w-[470px] leading-normal tracking-widest">
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="/how-to/create-account">
                        <TiUserAddOutline size={25} /> Create an Account
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="/how-to/kyc-verification">
                        {' '}
                        <RiVerifiedBadgeLine size={25} />
                        Verify Your Identity (KYC)
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="#">
                        {' '}
                        <PiHandDeposit size={25} />
                        Deposit Funds
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="#">
                        {' '}
                        <RiExchangeLine size={25} />
                        Trade Cryptocurrency
                      </Link>
                    </li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!">
                      {' '}
                      <Link className="flex gap-x-1 items-center" href="#">
                        {' '}
                        <PiHandWithdraw size={25} />
                        Withdraw Funds
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
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
                {isVerified ? 'Verified' : 'Not Verified'}
              </span>

              {/* Mobile Menu Items - Same as Desktop for Authenticated & Verified Users */}
              <div className="px-4 py-4 space-y-4">
                {/* Home */}
                <div className="py-2">
                  <Link href="/" className="hover:underline hover:text-[#EC3B3B] font-semibold">
                    Home
                  </Link>
                </div>

                {/* Assets - Only show if authenticated AND verified */}
                {isAuthenticated && isVerified && (
                  <div className="py-2">
                    <Link
                      href="/dashboard/assets"
                      className="hover:underline hover:text-[#EC3B3B] font-semibold"
                    >
                      Assets
                    </Link>
                  </div>
                )}

                {/* Spot - Only show if authenticated AND verified */}
                {isAuthenticated && isVerified && (
                  <div className="py-2">
                    <Link
                      href="/spot"
                      className="hover:underline hover:text-[#EC3B3B] font-semibold"
                    >
                      Spot
                    </Link>
                  </div>
                )}

                {/* Markets Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="markets" className="border-none">
                    <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-2">
                      Markets
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-3 pl-4">
                      <Link
                        href="/market-overview"
                        className="flex items-center gap-x-2 hover:underline"
                      >
                        <FaLandmark size={20} />
                        Overview
                      </Link>
                      <Link
                        href="/market-explorer"
                        className="flex items-center gap-x-2 hover:underline"
                      >
                        <MdOutlineExplore size={20} />
                        Explorer
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Insider Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="insider" className="border-none">
                    <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-2">
                      McCoin insider
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-3 pl-4">
                      <Link href="/top-news" className="flex items-center gap-x-2 hover:underline">
                        <ImNewspaper size={20} />
                        Top News
                      </Link>
                      <Link href="/news-room" className="flex items-center gap-x-2 hover:underline">
                        <GiSattelite size={20} />
                        Newsroom
                      </Link>
                      <Link href="/podcasts" className="flex items-center gap-x-2 hover:underline">
                        <FaPodcast size={20} />
                        Podcasts
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* How to Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="how-to" className="border-none">
                    <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-2">
                      How to
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-3 pl-4">
                      <Link
                        href="/how-to/create-account"
                        className="flex items-center gap-x-2 hover:underline"
                      >
                        <TiUserAddOutline size={20} />
                        Create an Account
                      </Link>
                      <Link
                        href="/how-to/kyc-verification"
                        className="flex items-center gap-x-2 hover:underline"
                      >
                        <RiVerifiedBadgeLine size={20} />
                        Verify Your Identity (KYC)
                      </Link>
                      <Link href="#" className="flex items-center gap-x-2 hover:underline">
                        <PiHandDeposit size={20} />
                        Deposit Funds
                      </Link>
                      <Link href="#" className="flex items-center gap-x-2 hover:underline">
                        <RiExchangeLine size={20} />
                        Trade Cryptocurrency
                      </Link>
                      <Link href="#" className="flex items-center gap-x-2 hover:underline">
                        <PiHandWithdraw size={20} />
                        Withdraw Funds
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Support Center */}
                {/* <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="support" className="border-none">
                    <AccordionTrigger className="text-white hover:text-[#EC3B3B] py-2">
                      Support center
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-3 pl-4">
                      <Link href="/faqs" className="flex items-center gap-x-2 hover:underline">
                        <LuMailQuestion size={20} />
                        Frequently Asked Questions (FAQs)
                      </Link>
                      <Link href="/contact" className="flex items-center gap-x-2 hover:underline">
                        <GrContact size={20} />
                        Contact Us
                      </Link>
                      <Link
                        href="/help-topics"
                        className="flex items-center gap-x-2 hover:underline"
                      >
                        <FaHandsHelping size={20} />
                        Help Topics
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
