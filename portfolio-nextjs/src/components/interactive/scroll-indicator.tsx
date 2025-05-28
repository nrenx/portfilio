'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SCROLL_CONFIG } from '@/lib/constants';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOnHomePage, setIsOnHomePage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const homeSection = document.getElementById('home');
      
      if (homeSection) {
        const homeSectionHeight = homeSection.offsetHeight;
        const isInHomeSection = scrollY < homeSectionHeight - 100;
        
        setIsOnHomePage(isInHomeSection);
        setIsVisible(isInHomeSection && scrollY < SCROLL_CONFIG.indicatorFadeDistance);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const arrowVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && isOnHomePage && (
        <motion.div
          className={cn(
            'absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10',
            className
          )}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Scroll Text */}
          <motion.span
            className="text-sm text-muted-foreground mb-2 font-medium"
            variants={textVariants}
            animate="animate"
          >
            Scroll Down
          </motion.span>

          {/* Arrow Container */}
          <div className="relative">
            {/* First Arrow */}
            <motion.div
              variants={arrowVariants}
              animate="animate"
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>

            {/* Second Arrow (offset) */}
            <motion.div
              className="absolute top-0 left-0"
              variants={arrowVariants}
              animate="animate"
              style={{ marginTop: '-8px' }}
              transition={{ delay: 0.2 }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground opacity-60" />
            </motion.div>
          </div>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
