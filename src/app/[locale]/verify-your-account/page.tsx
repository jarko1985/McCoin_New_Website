'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import KYCVerificationForm from '@/components/forms/KYCVerificationForm';

export default function VerificationPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && session;
  const isLoading = status === 'loading';
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, isLoading, router, locale]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="bg-[#07153B] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC3B3B] mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not signed in (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-[#07153B] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Identity Verification</h1>
            <p className="text-[#DAE6EA] text-lg">
              Complete your KYC verification to access all platform features
            </p>
          </div>
          <KYCVerificationForm />
        </div>
      </div>
    </div>
  );
}
