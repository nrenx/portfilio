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
            className="filament-1 absolute block h-[35px] w-[35px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] overflow-hidden"
          >
            <motion.span
              className="absolute block h-[6px] w-[17px] rounded-full border-2 top-[-4px] left-[-2px] transform rotate-[-10deg]"
              style={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              animate={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              transition={{ duration: 0.7 }}
            />
            <motion.span
              className="absolute block h-[6px] w-[17px] rounded-full border-2 top-[-4px] left-[15px] transform rotate-[10deg]"
              style={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              animate={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.span>

          {/* Filament 2 */}
          <motion.span
            className="filament-2 absolute block h-[35px] w-[35px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[45deg] overflow-hidden"
          >
            <motion.span
              className="absolute block h-[6px] w-[17px] rounded-full border-2 top-[-4px] left-[-2px] transform rotate-[-10deg]"
              style={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              animate={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              transition={{ duration: 0.7 }}
            />
            <motion.span
              className="absolute block h-[6px] w-[17px] rounded-full border-2 top-[-4px] left-[15px] transform rotate-[10deg]"
              style={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              animate={{
                borderColor: isDark ? '#fef4d5' : '#4a426b',
              }}
              transition={{ duration: 0.7 }}
            />
          </motion.span>

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

          {/* Sparks - Exact Original Implementation */}
          <motion.span
            className="sparks absolute block h-[50px] w-[50px] top-0 left-0"
            animate={{
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Spark 1 */}
            <motion.i
              className="spark1 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                right: '-5px',
                bottom: '23px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                right: ['-5px', '-5px', '0px', '0px', '-70px'],
                bottom: ['23px', '23px', '23px', '23px', '50px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 20,
                delay: 1.2,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.4, 0.5, 0.9, 1],
              }}
            />

            {/* Spark 2 */}
            <motion.i
              className="spark2 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                right: '20px',
                bottom: '80px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                right: ['20px', '20px', '20px', '20px', '10px'],
                bottom: ['80px', '80px', '80px', '80px', '90px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 18.0,
                delay: 2.0,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 3 */}
            <motion.i
              className="spark3 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                left: '20px',
                bottom: '80px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                left: ['20px', '20px', '20px', '20px', '-30px'],
                bottom: ['80px', '80px', '80px', '80px', '60px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 16.0,
                delay: 3.0,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 4 */}
            <motion.i
              className="spark4 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                left: '20px',
                bottom: '20px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                left: ['20px', '20px', '20px', '20px', '50px'],
                bottom: ['20px', '20px', '20px', '20px', '30px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 14.5,
                delay: 3.5,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 5 */}
            <motion.i
              className="spark5 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                right: '10px',
                top: '10px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                right: ['10px', '10px', '10px', '10px', '60px'],
                top: ['10px', '10px', '10px', '10px', '50px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 13.0,
                delay: 1.8,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 6 */}
            <motion.i
              className="spark6 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                left: '10px',
                top: '10px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                left: ['10px', '10px', '10px', '10px', '40px'],
                top: ['10px', '10px', '10px', '10px', '70px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 17.5,
                delay: 2.5,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 7 */}
            <motion.i
              className="spark7 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                right: '30px',
                bottom: '10px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                right: ['30px', '30px', '30px', '30px', '80px'],
                bottom: ['10px', '10px', '10px', '10px', '-10px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 15.2,
                delay: 2.2,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />

            {/* Spark 8 */}
            <motion.i
              className="spark8 absolute block h-[8px] w-[8px] bg-[#d1b82b] rounded-full shadow-[0_0_12px_#d1b82b,0_0_18px_#fdb843]"
              style={{
                left: '30px',
                bottom: '10px',
              }}
              animate={isDark ? {
                opacity: [0, 0, 1, 1, 0],
                left: ['30px', '30px', '30px', '30px', '70px'],
                bottom: ['10px', '10px', '10px', '10px', '0px'],
              } : {
                opacity: 0,
              }}
              transition={{
                duration: 19.0,
                delay: 4.0,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.6, 0.9, 1],
              }}
            />
          </motion.span>
        </motion.i>
      </label>
    </div>
  );
}
