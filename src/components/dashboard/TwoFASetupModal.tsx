'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface TwoFASetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TwoFASetupModal({ isOpen, onClose, onSuccess }: TwoFASetupModalProps) {
  const t = useTranslations('dashboard.preferences');
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && step === 'setup') {
      generateSecret();
    }
  }, [isOpen, step]);

  const generateSecret = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
      } else {
        toast.error(data.error || 'Failed to generate 2FA secret');
      }
    } catch (error) {
      toast.error('Failed to generate 2FA secret');
    } finally {
      setIsGenerating(false);
    }
  };

  const verifyToken = async () => {
    if (!token) {
      toast.error('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('2FA enabled successfully!');
        onSuccess();
        onClose();
        setStep('setup');
        setToken('');
      } else {
        toast.error(data.error || 'Invalid verification code');
      }
    } catch (error) {
      toast.error('Failed to verify token');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('setup');
    setToken('');
    setQrCode('');
    setSecret('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#081935] border-[0.5px] border-[#DAE6EA] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            {step === 'setup' ? 'Set Up Two-Factor Authentication' : 'Verify Your Code'}
          </DialogTitle>
        </DialogHeader>

        {step === 'setup' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {isGenerating ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="mt-2 text-[#DAE6EA]">Generating QR code...</p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-[#DAE6EA] mb-4">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy,
                    etc.)
                  </p>
                  {qrCode && (
                    <Card className="bg-[#0f294d] border-[#DAE6EA]">
                      <CardContent className="p-4">
                        <img src={qrCode} alt="QR Code" className="mx-auto" />
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[#DAE6EA]">Manual Entry Code</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={secret}
                      readOnly
                      className="bg-[#0f294d] text-white border-[#DAE6EA]"
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(secret)}
                      variant="outline"
                      size="sm"
                      className="border-[#DAE6EA] text-[#DAE6EA] hover:bg-[#0f294d]"
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => setStep('verify')}
                    className="bg-[#EC3B3B] hover:bg-[#d63031] text-white flex-1"
                  >
                    Next
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="border-[#DAE6EA] text-[#DAE6EA] hover:bg-[#0f294d] flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="text-center">
              <p className="text-[#DAE6EA] mb-4">
                Enter the 6-digit code from your authenticator app to verify setup
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#DAE6EA]">Verification Code</Label>
              <Input
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="bg-[#0f294d] text-white border-[#DAE6EA] text-center text-lg tracking-widest"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={verifyToken}
                disabled={isLoading}
                className="bg-[#EC3B3B] hover:bg-[#d63031] text-white flex-1"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <Button
                onClick={() => setStep('setup')}
                variant="outline"
                className="border-[#DAE6EA] text-[#DAE6EA] hover:bg-[#0f294d] flex-1"
              >
                Back
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

