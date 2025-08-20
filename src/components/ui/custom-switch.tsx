'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export function CustomSwitch({
  checked,
  onCheckedChange,
  className,
  disabled = false,
  isRTL = false,
}: CustomSwitchProps & { isRTL?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-[#07153b] dark:bg-[#DAE6EA]' : 'bg-gray-300 dark:bg-gray-600',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform',
          checked ? 'bg-white dark:bg-[#07153b]' : 'bg-white dark:bg-gray-300',
          isRTL
            ? checked
              ? '-translate-x-1'
              : '-translate-x-6'
            : checked
            ? 'translate-x-6'
            : 'translate-x-1',
        )}
      />
    </button>
  );
}
