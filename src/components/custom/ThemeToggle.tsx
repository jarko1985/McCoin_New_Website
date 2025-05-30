'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded-full bg-[#ffffff22] dark:bg-[#dae6ea22] backdrop-blur-sm">
      <Sun className="w-4 h-4 text-white dark:text-[#DAE6EA]" />
      <Switch
        checked={isDark}
        onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
        className="transition-colors duration-300 data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-300"
      />
      <Moon className="w-4 h-4 text-white dark:text-[#DAE6EA]" />
    </div>
  );
}
