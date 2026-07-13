'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* 切换主题 */
  const handleThemeToggle = () => {
    const switchTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!document.startViewTransition) switchTheme();
    else document.startViewTransition(switchTheme);
  };

  /* 确保组件挂载后再渲染，避免水合不匹配 */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (systemTheme && systemTheme !== theme) handleThemeToggle();
  }, [systemTheme]);

  if (!mounted) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-xl">
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="text-fore/60 hover:text-fore flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
