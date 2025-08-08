'use client';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, UserPlus, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

interface UserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className = '' }: UserAvatarProps) => {
  const { data: session, status } = useSession();
  const t = useTranslations('navbar');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: `/`,
        redirect: true,
      });
      toast.success(t('logout_success') || 'Logged out successfully!');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error(t('logout_error') || 'Error signing out');
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  const baseButtonStyles = `px-3 py-1 border rounded-lg transition-all duration-300 hover:-translate-y-1 ${
    isDark
      ? 'border-white text-white hover:text-[#07153b] bg-[#07153b] hover:bg-white hover:border-[#07153b]'
      : 'border-[#07153b] text-white hover:text-[#07153b] bg-[#07153b] hover:bg-white hover:border-[#07153b]'
  }`;

  if (status === 'loading') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
      </div>
    );
  }

  // Always show avatar with dropdown - content changes based on auth state
  return (
    <div className={`flex items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full p-0 hover:bg-transparent"
          >
            <Avatar className="h-8 w-8 border-2 border-[#EC3B3B] hover:border-white transition-colors duration-200">
              {status === 'authenticated' && session?.user ? (
                <>
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={session.user.name || 'User avatar'}
                  />
                  <AvatarFallback className="bg-[#EC3B3B] text-white text-sm font-semibold">
                    {getUserInitials(session.user.name, session.user.email)}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="bg-[#EC3B3B] text-white text-sm font-semibold">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-56 ${
            isDark
              ? 'bg-[#07153b] border-gray-600 text-white'
              : 'bg-white border-gray-200 text-[#07153b]'
          }`}
          align="end"
          forceMount
        >
          {status === 'authenticated' && session?.user ? (
            // Authenticated user menu
            <>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user.name && <p className="font-medium text-sm">{session.user.name}</p>}
                  {session.user.email && (
                    <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator className={isDark ? 'bg-gray-600' : 'bg-gray-200'} />
              <DropdownMenuItem
                className={`cursor-pointer ${
                  isDark
                    ? 'hover:bg-gray-700 focus:bg-gray-700'
                    : 'hover:bg-gray-100 focus:bg-gray-100'
                }`}
                asChild
              >
                <Link href={`/${locale}/dashboard/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('profile') || 'Profile'}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className={isDark ? 'bg-gray-600' : 'bg-gray-200'} />
              <DropdownMenuItem
                className={`cursor-pointer ${
                  isDark
                    ? 'hover:bg-red-900 focus:bg-red-900 text-red-400'
                    : 'hover:bg-red-50 focus:bg-red-50 text-red-600'
                }`}
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('logout') || 'Logout'}</span>
              </DropdownMenuItem>
            </>
          ) : (
            // Unauthenticated user menu
            <>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{t('guest_user') || 'Guest User'}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('please_sign_in') || 'Please sign in to continue'}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className={isDark ? 'bg-gray-600' : 'bg-gray-200'} />
              <DropdownMenuItem
                className={`cursor-pointer ${
                  isDark
                    ? 'hover:bg-gray-700 focus:bg-gray-700'
                    : 'hover:bg-gray-100 focus:bg-gray-100'
                }`}
                asChild
              >
                <Link href={`/${locale}/signup`}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>{t('signup') || 'Sign up'}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${
                  isDark
                    ? 'hover:bg-gray-700 focus:bg-gray-700'
                    : 'hover:bg-gray-100 focus:bg-gray-100'
                }`}
                asChild
              >
                <Link href={`/${locale}/login`}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>{t('login') || 'Log in'}</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
