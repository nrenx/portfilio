'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Github, Linkedin, Folder, Terminal, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MacOSDockProps {
  openWindows: Array<{ id: string; title: string; isMinimized: boolean }>;
  onWindowRestore: (windowId: string) => void;
  className?: string;
}

export function MacOSDock({ openWindows, onWindowRestore, className }: MacOSDockProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const dockApps = [
    {
      id: 'finder',
      name: 'Finder',
      icon: Folder,
      color: 'text-blue-500',
      action: () => console.log('Finder clicked'),
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: Calculator,
      color: 'text-gray-700',
      action: () => window.open('https://calculator.net/', '_blank'),
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: Terminal,
      color: 'text-black',
      action: () => console.log('Terminal clicked'),
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: 'text-gray-900',
      action: () => window.open('https://github.com/nrenx', '_blank'),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-600',
      action: () => window.open('https://linkedin.com/in/bollineninarendrachowdary', '_blank'),
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: Mail,
      color: 'text-blue-500',
      action: () => window.open('mailto:narendrabollineni2002@gmail.com', '_blank'),
    },
  ];

  const minimizedWindows = openWindows.filter(w => w.isMinimized);

  const handleIconClick = (app: typeof dockApps[0]) => {
    app.action();
  };

  const handleMinimizedWindowClick = (windowId: string) => {
    onWindowRestore(windowId);
  };

  return (
    <div className={cn('absolute bottom-4 left-1/2 transform -translate-x-1/2', className)}>
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-end gap-1">
          {/* Regular Apps */}
          {dockApps.map((app) => {
            const IconComponent = app.icon;
            const isHovered = hoveredIcon === app.id;
            
            return (
              <motion.div
                key={app.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIcon(app.id)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute -top-12 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {app.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.button
                  className={cn(
                    'w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center',
                    'hover:bg-white/30 transition-colors cursor-pointer',
                    'backdrop-blur-sm border border-white/10'
                  )}
                  onClick={() => handleIconClick(app)}
                  whileHover={{ 
                    scale: 1.2,
                    y: -8,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 25 
                  }}
                >
                  <IconComponent className={cn('w-6 h-6', app.color)} />
                </motion.button>
              </motion.div>
            );
          })}

          {/* Separator */}
          {minimizedWindows.length > 0 && (
            <div className="w-px h-8 bg-white/30 mx-1 self-center" />
          )}

          {/* Minimized Windows */}
          {minimizedWindows.map((window) => (
            <motion.div
              key={`minimized-${window.id}`}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon(`minimized-${window.id}`)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIcon === `minimized-${window.id}` && (
                  <motion.div
                    className="absolute -top-12 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {window.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimized Window Icon */}
              <motion.button
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer backdrop-blur-sm border border-white/10 relative"
                onClick={() => handleMinimizedWindowClick(window.id)}
                whileHover={{ 
                  scale: 1.2,
                  y: -8,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25 
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Folder className="w-6 h-6 text-blue-500" />
                
                {/* Active indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
