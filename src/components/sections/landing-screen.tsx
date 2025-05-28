'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGES, ANIMATION_DURATIONS } from '@/lib/constants';

interface LandingScreenProps {
  onComplete?: () => void;
}

export function LandingScreen({ onComplete }: LandingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  // Multi-language animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, ANIMATION_DURATIONS.languageSwitch);

    // Start exit animation after showing all languages
    const exitTimer = setTimeout(() => {
      setShowParticles(true);
      
      // Start exit animation
      setTimeout(() => {
        setIsVisible(false);
        
        // Call onComplete callback after animation
        setTimeout(() => {
          onComplete?.();
        }, 800);
      }, 300);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  // Background panning animation variants
  const backgroundVariants = {
    animate: {
      x: ['-25%', '-75%'],
      y: ['-25%', '-75%'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Landing screen exit animation
  const landingVariants = {
    visible: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hidden: {
      y: '-100%',
      rotateX: 10,
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.1, 0.3, 1],
      },
    },
  };

  // Message animation variants
  const messageVariants = {
    hidden: {
      opacity: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  // Particle animation variants
  const particleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 0.7,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #000, #222)',
            perspective: '1000px',
          }}
          variants={landingVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          {/* Background Effect */}
          <motion.div
            className="absolute w-[200%] h-[200%] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
            }}
            variants={backgroundVariants}
            animate="animate"
          />

          {/* Message Container */}
          <div className="relative h-[120px] w-full text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h1 
                  className="text-5xl md:text-6xl font-semibold text-white/95"
                  style={{
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {LANGUAGES[currentIndex].greeting}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Particles Effect */}
          <AnimatePresence>
            {showParticles && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white/70 rounded-full pointer-events-none"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 20}%`,
                      top: `${50 + (Math.random() - 0.5) * 20}%`,
                    }}
                    variants={particleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
