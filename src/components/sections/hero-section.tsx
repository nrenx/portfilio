'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Github, Linkedin, Twitter } from 'lucide-react';
import { cn, getRuntimeAssetPath } from '@/lib/utils';
import { ScrollIndicator } from '@/components/interactive/scroll-indicator';
import { SocialIcons } from '@/components/common/social-icons';
import { FILE_PATHS } from '@/lib/constants';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [profileImagePath, setProfileImagePath] = useState('');
  const [profileHoverImagePath, setProfileHoverImagePath] = useState('');

  useEffect(() => {
    // Set image paths on client side to ensure proper GitHub Pages compatibility
    const profilePath = getRuntimeAssetPath('/assets/images/Finding joy in the simplicity of the sea ............beach bridge ocean smile sunny monument collage sunset sunrise travelphotography travel.jpg');
    const profileHoverPath = getRuntimeAssetPath('/assets/images/Finding paradise wherever the waves take me. . . . . . . . . . . . . . . .beachbound beachlife beach beachdreaming ocean paradise wavesfordays explore rainyday shorelineadventures seasideescape beach.jpg');

    setProfileImagePath(profilePath);
    setProfileHoverImagePath(profileHoverPath);
  }, []);

  const handleGetInTouch = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <section
      id="home"
      className={cn(
        'min-h-screen flex items-center justify-center relative overflow-hidden pt-16 lg:pt-20',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] gap-8">
          {/* Image Container - Mobile First */}
          <motion.div
            className="image-container flex-shrink-0 flex justify-center lg:justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div
              className="morph-container group relative w-[300px] h-[300px] overflow-hidden bg-cover bg-no-repeat bg-center border-4 border-[#2d2e32]"
                style={{
                  borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%',
                  backgroundColor: 'var(--muted)',
                }}
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70%/60% 30% 70% 40%',
                    '40% 60% 70% 30%/40% 70% 30% 60%',
                    '30% 60% 70% 40%/50% 60% 30% 40%',
                    '55% 45% 40% 60%/45% 30% 60% 55%',
                    '60% 40% 30% 70%/60% 30% 70% 40%',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.05,
                }}
              >
                {/* Background Image */}
                <div
                  className="background-image absolute top-0 left-0 w-full h-full object-cover z-[1] transition-opacity duration-1000 ease-out group-hover:opacity-0"
                  style={{
                    backgroundImage: profileImagePath ? `url('${profileImagePath}')` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />

                {/* Second Image - Shows on hover */}
                <div
                  className="second-image absolute top-0 left-0 w-full h-full object-cover z-[2] opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100"
                  style={{
                    backgroundImage: profileHoverImagePath ? `url('${profileHoverImagePath}')` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />


            </motion.div>
          </motion.div>

          {/* Text Container */}
          <motion.div
            className="text-container space-y-6 flex-1 max-w-2xl order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Online Status */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              Available for work
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Hi, I'm Narendra{' '}
              <motion.span
                className="inline-block"
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              >
                👋
              </motion.span>
            </motion.h1>

            {/* Bio Container */}
            <motion.div
              className="bio-container space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                No-Code Developer | AI Prompt Engineer | Mobile App Creator
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Recent Computer Science and Engineering graduate specializing in AI-assisted development and no-code solutions.
                I leverage modern AI tools to build efficient SaaS applications, mobile apps, and automation workflows.
                With expertise in cloud backends and API integration, I create cost-effective digital solutions with minimal traditional coding.
              </p>
            </motion.div>

            {/* Button Container */}
            <motion.div
              className="button-container flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                onClick={handleGetInTouch}
                className="button get-in-touch group relative px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                onClick={handleViewProjects}
                className="button view-projects group relative px-8 py-3 border border-border text-foreground rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <Code className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-muted/50"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>


            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <SocialIcons />
            </motion.div>
          </motion.div>


        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
