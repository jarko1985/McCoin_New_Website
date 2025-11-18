'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { RiVerifiedBadgeLine } from 'react-icons/ri';

interface VerificationRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerificationRequiredModal({
  open,
  onOpenChange,
}: VerificationRequiredModalProps) {
  const t = useTranslations('VerificationModal');
  const locale = useLocale();
  const router = useRouter();

  const handleVerifyClick = () => {
    onOpenChange(false);
    router.push(`/${locale}/verify-your-account`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#07153b] border-[#EC3B3B]/20 text-white sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full flex items-center justify-center">
              <RiVerifiedBadgeLine className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-center text-[#DAE6EA] pt-2">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <p className="text-yellow-300 text-sm text-center">
              {t('message')}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleVerifyClick}
            className="w-full sm:w-auto bg-gradient-to-r from-[#EC3B3B] to-[#d63333] hover:from-[#d63333] hover:to-[#c02a2a] text-white font-semibold"
          >
            {t('verify_now')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

