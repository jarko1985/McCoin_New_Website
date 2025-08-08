'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function Verify2FAPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Get email and password from URL params (they should be passed from login)
    const emailParam = searchParams?.get('email');
    const passwordParam = searchParams?.get('password');

    if (!emailParam || !passwordParam) {
      toast.error('Missing login credentials');
      router.push('/en/login');
      return;
    }

    setEmail(emailParam);
    setPassword(passwordParam);
  }, [searchParams, router]);

  const handleVerify = async () => {
    if (!token) {
      toast.error('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/2fa/verify-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        // If 2FA verification succeeds, proceed with NextAuth signin
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          toast.success('Login successful!');
          router.push('/');
        } else {
          toast.error('Login failed');
        }
      } else {
        toast.error(data.message || 'Invalid verification code');
      }
    } catch (error) {
      toast.error('Failed to verify 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/en/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081935] to-[#0f294d] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#081935] border-[0.5px] border-[#DAE6EA] text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Two-Factor Authentication</CardTitle>
            <p className="text-[#DAE6EA] mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#DAE6EA]">Verification Code</Label>
              <Input
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="bg-[#0f294d] text-white border-[#DAE6EA] text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleVerify}
                disabled={isLoading}
                className="bg-[#EC3B3B] hover:bg-[#d63031] text-white flex-1"
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-[#DAE6EA] text-[#DAE6EA] hover:bg-[#0f294d] flex-1"
              >
                Back
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">Don't have access to your authenticator app?</p>
              <Button
                variant="link"
                className="text-[#EC3B3B] hover:text-[#d63031] p-0 h-auto"
                onClick={() => toast.success('Contact support for account recovery')}
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
