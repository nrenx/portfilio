'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MacOSWindow } from './macos-window';
import { MacOSDock } from './macos-dock';
import { projectsByCategory } from '@/data/projects';

interface MacOSDesktopProps {
  className?: string;
}

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export function MacOSDesktop({ className }: MacOSDesktopProps) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const folders = [
    {
      id: 'web-apps',
      name: 'Web Apps',
      projects: projectsByCategory.web,
      position: { x: 50, y: 50 },
    },
    {
      id: 'mobile-apps',
      name: 'Mobile Apps',
      projects: projectsByCategory.mobile,
      position: { x: 50, y: 150 },
    },
    {
      id: 'automation',
      name: 'Automation',
      projects: projectsByCategory.automation,
      position: { x: 50, y: 250 },
    },
  ];

  const openFolder = useCallback((folder: typeof folders[0]) => {
    const existingWindow = openWindows.find(w => w.id === folder.id);
    if (existingWindow) {
      // Bring to front
      setOpenWindows(prev => 
        prev.map(w => 
          w.id === folder.id 
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        )
      );
      setNextZIndex(prev => prev + 1);
      return;
    }

    const newWindow: OpenWindow = {
      id: folder.id,
      title: folder.name,
      content: (
        <div className="p-6 h-full overflow-auto">
          <h3 className="text-lg font-semibold mb-4">{folder.name}</h3>
          <div className="grid gap-4">
            {folder.projects.map((project) => (
              <motion.div
                key={project.id}
                className="p-4 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openProjectWindow(project)}
              >
                <h4 className="font-medium text-foreground mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      position: { x: 200 + Math.random() * 100, y: 100 + Math.random() * 50 },
      size: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [openWindows, nextZIndex]);

  const openProjectWindow = useCallback((project: any) => {
    const existingWindow = openWindows.find(w => w.id === project.id);
    if (existingWindow) {
      setOpenWindows(prev => 
        prev.map(w => 
          w.id === project.id 
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        )
      );
      setNextZIndex(prev => prev + 1);
      return;
    }

    const newWindow: OpenWindow = {
      id: project.id,
      title: project.title,
      content: (
        <div className="p-6 h-full overflow-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground">{project.longDescription}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
            <ul className="space-y-1">
              {project.features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border/50">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      ),
      position: { x: 250 + Math.random() * 100, y: 150 + Math.random() * 50 },
      size: { width: 600, height: 500 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [openWindows, nextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { 
              ...w, 
              isMaximized: !w.isMaximized,
              position: w.isMaximized ? w.position : { x: 0, y: 0 },
              size: w.isMaximized ? w.size : { width: window.innerWidth, height: window.innerHeight - 100 }
            }
          : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, position } : w
      )
    );
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, zIndex: nextZIndex } : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-purple-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8">
        {folders.map((folder) => (
          <motion.div
            key={folder.id}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{ left: folder.position.x, top: folder.position.y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => openFolder(folder)}
          >
            <div className="w-16 h-16 mb-2 relative">
              <Folder className="w-full h-full text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-300/20 rounded-lg" />
            </div>
            <span className="text-white text-sm font-medium text-center drop-shadow-md max-w-20 leading-tight">
              {folder.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((window) => (
          <MacOSWindow
            key={window.id}
            id={window.id}
            title={window.title}
            position={window.position}
            size={window.size}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
            onFocus={() => bringToFront(window.id)}
          >
            {window.content}
          </MacOSWindow>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <MacOSDock 
        openWindows={openWindows}
        onWindowRestore={(windowId) => {
          setOpenWindows(prev => 
            prev.map(w => 
              w.id === windowId 
                ? { ...w, isMinimized: false, zIndex: nextZIndex }
                : w
            )
          );
          setNextZIndex(prev => prev + 1);
        }}
      />
    </div>
  );
}
