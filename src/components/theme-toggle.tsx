'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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

  if (!mounted) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-md">
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="bg-main hover:bg-fore/10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-120"
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <Sun className="text-fore dark:text-fore h-4 w-4" />
      ) : (
        <Moon className="text-fore dark:text-fore h-4 w-4" />
      )}
    </button>
  );
}
