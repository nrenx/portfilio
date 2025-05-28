'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '@/lib/types';
import { THEME_CONFIG } from '@/lib/constants';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = THEME_CONFIG.defaultTheme
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem(THEME_CONFIG.storageKey, theme);

    // Update body class for compatibility with existing CSS
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Add dark mode animation class
    document.body.classList.add('dark-mode-animation');

    setTheme(prev => prev === 'light' ? 'dark' : 'light');

    // Remove animation class after animation completes
    setTimeout(() => {
      document.body.classList.remove('dark-mode-animation');
    }, 1000);
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
