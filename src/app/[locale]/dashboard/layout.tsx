'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useSession } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && session;
  const isLoading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07153B] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC3B3B] mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not signed in (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#07153B] text-white">
      <div className="flex lg:flex-row flex-col">
        <Sidebar />
        <main className="flex-1 py-4.5">
          <div>
            <Button
              onClick={() => router.push('/')}
              className="mb-2 border border-transparent cursor-pointer bg-[#DAE6EA] text-[#07153B] 
            hover:bg-[#07153B] hover:text-[#DAE6EA] hover:border-[#DAE6EA]"
            >
              <ChevronLeft />
              Back to Home
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
