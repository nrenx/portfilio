'use client';

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const themeContext = useContext(ThemeContext);

  // Safely handle theme context
  const theme = themeContext?.theme || 'light';
  const toggleTheme = themeContext?.toggleTheme || (() => {});
  const isDark = theme === 'dark';

  return (
    <div className={cn('switch relative', className)}>
      <input
        type="checkbox"
        id="toggle"
        checked={isDark}
        onChange={toggleTheme}
        className="absolute left-0 top-0 h-full w-full opacity-0 z-[100] cursor-pointer"
      />
      <label
        htmlFor="toggle"
        className="block h-[60px] w-[60px] bg-white rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.2),inset_0_0_5px_-2px_rgba(0,0,0,0.4)] dark:bg-[var(--dark-theme-background)]"
      >
        <motion.i
          className={cn(
            'bulb block relative h-[50px] w-[50px] rounded-full top-[5px] left-[5px] transition-all duration-[0.9s]',
            isDark
              ? 'bg-[#a7694a] shadow-[inset_0_0_1px_3px_#a56758,inset_0_0_6px_8px_#6b454f,0_20px_30px_-10px_rgba(0,0,0,0.4),0_0_30px_50px_rgba(253,184,67,0.1)]'
              : 'bg-[#2d2e32] shadow-[inset_0_0_1px_3px_#2d2e32,inset_0_0_6px_8px_#1e1e20,0_20px_30px_-10px_rgba(0,0,0,0.2)]'
          )}
          animate={{
            backgroundColor: isDark ? '#a7694a' : '#2d2e32',
          }}
          transition={{ duration: 0.9 }}
        >
          {/* Bulb Center */}
          <motion.span
            className={cn(
              'bulb-center absolute block h-[36px] w-[36px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.7s]',
              isDark
                ? 'bg-[#feed6b] shadow-[inset_0_0_0_4px_#fdec6a,0_0_12px_10px_#bca83c,0_0_20px_14px_#a1664a]'
                : 'bg-[#3a3a3c] shadow-[inset_0_0_0_4px_#444]'
            )}
            animate={{
              backgroundColor: isDark ? '#feed6b' : '#3a3a3c',
            }}
            transition={{ duration: 0.7 }}
          >
            {/* Center highlight */}
            <motion.span
              className={cn(
                'absolute block h-[20px] w-[20px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.7s]',
                isDark
                  ? 'bg-[#fef401] shadow-[0_0_2px_4px_#fdb843]'
                  : 'bg-[#464648] shadow-[inset_0_0_0_2px_#2a2a2c]'
              )}
              animate={{
                backgroundColor: isDark ? '#fef401' : '#464648',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.span>

          {/* Filament 1 */}
          <motion.span
            className={cn(
              'filament-1 absolute block h-[20px] w-[20px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.7s]',
              'before:content-[""] before:absolute before:block before:h-[10px] before:w-[2px] before:left-[15px] before:transform before:rotate-[10deg]',
              isDark
                ? 'before:bg-[#fdb843] before:shadow-[0_0_4px_2px_#fdb843]'
                : 'before:bg-[#2a2a2c]'
            )}
            animate={{
              opacity: isDark ? 1 : 0.6,
            }}
            transition={{ duration: 0.7 }}
          />

          {/* Filament 2 */}
          <motion.span
            className={cn(
              'filament-2 absolute block h-[20px] w-[20px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all duration-[0.7s]',
              'before:content-[""] before:absolute before:block before:h-[10px] before:w-[2px] before:left-[15px] before:transform before:rotate-[10deg]',
              isDark
                ? 'before:bg-[#fdb843] before:shadow-[0_0_4px_2px_#fdb843]'
                : 'before:bg-[#2a2a2c]'
            )}
            animate={{
              opacity: isDark ? 1 : 0.6,
            }}
            transition={{ duration: 0.7 }}
          />

          {/* Reflections */}
          <motion.span
            className={cn(
              'reflections absolute block h-[12px] w-[12px] top-[8px] left-[8px] rounded-full transition-all duration-[0.7s]',
              isDark
                ? 'bg-[rgba(255,255,255,0.2)]'
                : 'bg-[rgba(255,255,255,0.1)]'
            )}
            animate={{
              opacity: isDark ? 1 : 0.8,
            }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className={cn(
                'absolute block h-[6px] w-[6px] top-[2px] left-[2px] rounded-full transition-all duration-[0.7s]',
                isDark
                  ? 'bg-[rgba(255,255,255,0.4)]'
                  : 'bg-[rgba(255,255,255,0.2)]'
              )}
              animate={{
                opacity: isDark ? 1 : 0.6,
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.span>

          {/* Sparks */}
          <motion.span
            className="sparks absolute block h-[50px] w-[50px] top-0 left-0"
            animate={{
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.7 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.i
                key={i}
                className={cn(
                  `spark${i} absolute block h-[4px] w-[4px] rounded-full`,
                  isDark ? 'bg-[#fdb843]' : 'bg-transparent'
                )}
                style={{
                  top: i === 1 ? '18px' : i === 2 ? '14px' : i === 3 ? '18px' : i === 4 ? '28px' : i === 5 ? '32px' : i === 6 ? '28px' : i === 7 ? '18px' : '14px',
                  left: i === 1 ? '44px' : i === 2 ? '34px' : i === 3 ? '6px' : i === 4 ? '2px' : i === 5 ? '6px' : i === 6 ? '44px' : i === 7 ? '46px' : '34px',
                  animationDelay: `${i * 0.1}s`,
                }}
                animate={{
                  scale: isDark ? [1, 1.5, 1] : [0, 0, 0],
                  opacity: isDark ? [0.8, 1, 0.8] : [0, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.span>
        </motion.i>
      </label>
    </div>
  );
}
