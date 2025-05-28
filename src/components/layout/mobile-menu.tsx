'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for mobile menu toggle events
  useEffect(() => {
    const handleMobileMenuToggle = () => {
      setIsOpen(prev => !prev);
    };

    // Listen for clicks on mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', handleMobileMenuToggle);
      return () => mobileMenuBtn.removeEventListener('click', handleMobileMenuToggle);
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu */}
          <motion.div
            className={cn(
              'fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-background/95 backdrop-blur-md',
              'border-l border-border/50 shadow-2xl z-50 md:hidden',
              className
            )}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Menu</h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="p-6">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <motion.button
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-lg text-base font-medium',
                        'transition-all duration-200 hover:bg-muted/50',
                        activeSection === item.id
                          ? 'text-foreground bg-muted/30 border-l-4 border-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      whileHover={{ 
                        scale: 1.02, 
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="capitalize">{item.label}</span>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-center text-sm text-muted-foreground">
                <p>© 2024 Narendra Chowdary</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
