'use client';

import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-10 h-10"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors
    duration-200 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? (
        <Sun className="w-5.5 h-5.5 text-orange-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
};
