'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { CustomSwitch } from '@/components/ui/custom-switch';
import { Moon, Sun } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded-full bg-[#ffffff22] dark:bg-[#dae6ea22] backdrop-blur-sm">
      {isArabic ? (
        <>
          <Moon className="w-4 h-4 text-gray-400 dark:text-blue-900" />
          <CustomSwitch
            checked={isDark}
            onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
            isRTL={true}
          />
          <Sun className="w-4 h-4 text-yellow-500 dark:text-gray-400" />
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-yellow-500 dark:text-gray-400" />
          <CustomSwitch
            checked={isDark}
            onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
            isRTL={false}
          />
          <Moon className="w-4 h-4 text-gray-400 dark:text-blue-900" />
        </>
      )}
    </div>
  );
}
