'use client';

import React from 'react';
import { LandingScreen } from '@/components/sections/landing-screen';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ContactSection } from '@/components/sections/contact-section';
import { useLanding } from '@/contexts/landing-context';
import { ImageDebug } from '@/components/debug/image-debug';

export default function Home() {
  const { showLanding, handleLandingComplete } = useLanding();

  return (
    <div className="min-h-screen">
      {/* Landing Screen */}
      {showLanding && <LandingScreen onComplete={handleLandingComplete} />}

      {/* Main Content */}
      <div className={showLanding ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />
      </div>

      {/* Debug Component (only in development) */}
      <ImageDebug />
    </div>
  );
}
