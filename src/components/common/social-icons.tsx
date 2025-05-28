'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/lib/constants';

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className }: SocialIconsProps) {
  const iconMap = {
    Github,
    Linkedin,
    Twitter,
    Mail,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={cn('flex items-center gap-4', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {SOCIAL_LINKS.map((link, index) => {
        const IconComponent = iconMap[link.icon as keyof typeof iconMap];
        
        return (
          <motion.a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={link.label}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Icon */}
            <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300 relative z-10" />
            
            {/* Tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
            >
              {link.platform}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
            </motion.div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
