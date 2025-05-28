'use client';

import React, { useContext } from 'react';
import { Navbar } from './navbar';
import { MobileMenu } from './mobile-menu';
import { ThemeProvider, ThemeContext } from '@/contexts/theme-context';
import { LandingProvider, useLanding } from '@/contexts/landing-context';
import { ParticleAnimation } from '@/components/interactive/particle-animation';
import { CustomCursor } from '@/components/interactive/custom-cursor';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const themeContext = useContext(ThemeContext);
  const landingContext = useLanding();

  // Safely handle theme context
  const theme = themeContext?.theme || 'light';
  const { showHeader } = landingContext;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particle Animation for Dark Mode */}
      {theme === 'dark' && <ParticleAnimation />}

      {/* Navigation - Only show after landing screen */}
      {showHeader && (
        <>
          <Navbar />
          <MobileMenu />
        </>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <LandingProvider>
        <LayoutContent>{children}</LayoutContent>
      </LandingProvider>
    </ThemeProvider>
  );
}
