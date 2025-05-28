'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn(
        'relative py-8 px-4 border-t border-border/50 bg-background/50 backdrop-blur-sm',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.p 
            className="text-sm text-muted-foreground flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            © {currentYear} Narendra Chowdary. Made with
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#f97316', '#ef4444']
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.span>
            and lots of coffee.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
