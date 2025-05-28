'use client';

import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '@/contexts/theme-context';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'light';

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if device supports hover (not mobile)
    const isMobile = window.matchMedia('(hover: none)').matches || 
                     window.innerWidth <= 768 ||
                     navigator.maxTouchPoints > 0;

    if (isMobile) {
      cursor.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = '0.8';
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]
        transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out
        opacity-80
        ${theme === 'dark' 
          ? 'bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]' 
          : 'bg-black shadow-[0_0_5px_rgba(0,0,0,0.5)]'
        }
      `}
      style={{
        display: 'block',
      }}
    />
  );
}
