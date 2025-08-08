'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface TwoFADisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TwoFADisableModal({ isOpen, onClose, onSuccess }: TwoFADisableModalProps) {
  const t = useTranslations('dashboard.preferences');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDisable = async () => {
    if (!token) {
      toast.error('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('2FA disabled successfully!');
        onSuccess();
        onClose();
        setToken('');
      } else {
        toast.error(data.error || 'Failed to disable 2FA');
      }
    } catch (error) {
      toast.error('Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setToken('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#081935] border-[0.5px] border-[#DAE6EA] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Disable Two-Factor Authentication
          </DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="text-center">
            <p className="text-[#DAE6EA] mb-4">
              To disable 2FA, please enter your current verification code to confirm this action.
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
              onClick={handleDisable}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white flex-1"
            >
              {isLoading ? 'Disabling...' : 'Disable 2FA'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              className="border-[#DAE6EA] text-[#DAE6EA] hover:bg-[#0f294d] flex-1"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

