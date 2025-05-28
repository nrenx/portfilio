'use client';

import React, { useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MacOSWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onFocus: () => void;
  className?: string;
}

export function MacOSWindow({
  id,
  title,
  children,
  position,
  size,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onFocus,
  className,
}: MacOSWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    onFocus();
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false;
    const newX = Math.max(0, Math.min(position.x + info.offset.x, window.innerWidth - size.width));
    const newY = Math.max(0, Math.min(position.y + info.offset.y, window.innerHeight - size.height));
    onPositionChange({ x: newX, y: newY });
  };

  const handleWindowClick = () => {
    if (!isDraggingRef.current) {
      onFocus();
    }
  };

  // Prevent window from going off-screen when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (windowRef.current) {
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        if (position.x > maxX || position.y > maxY) {
          onPositionChange({
            x: Math.max(0, Math.min(position.x, maxX)),
            y: Math.max(0, Math.min(position.y, maxY)),
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, size, onPositionChange]);

  if (isMinimized) {
    return null;
  }

  const windowVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      x: position.x,
      y: position.y,
    },
    animate: {
      scale: 1,
      opacity: 1,
      x: position.x,
      y: position.y,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        'absolute bg-background/95 backdrop-blur-md rounded-lg shadow-2xl border border-border/50 overflow-hidden',
        'select-none',
        className
      )}
      style={{
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 100px)' : size.height,
        zIndex,
      }}
      variants={windowVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - size.width,
        top: 0,
        bottom: window.innerHeight - size.height,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleWindowClick}
      whileHover={{ 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between h-12 px-4 bg-muted/30 border-b border-border/50 cursor-move">
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close window"
          >
            <X className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100 transition-opacity mx-auto" />
          </motion.button>
          
          <motion.button
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Minimize window"
          >
            <Minus className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100 transition-opacity mx-auto" />
          </motion.button>
          
          <motion.button
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Maximize window"
          >
            <Square className="w-2 h-2 text-green-900 opacity-0 hover:opacity-100 transition-opacity mx-auto" />
          </motion.button>
        </div>

        {/* Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
          <h3 className="text-sm font-medium text-foreground truncate max-w-48">
            {title}
          </h3>
        </div>

        {/* Spacer for layout balance */}
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
