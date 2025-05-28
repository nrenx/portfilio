'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Folder, X, Minus, Square } from 'lucide-react';
import { cn, getRuntimeAssetPath } from '@/lib/utils';
import { MacOSWindow } from './macos-window';
import { MacOSDock } from './macos-dock';
import { projects } from '@/data/projects';
import { FILE_PATHS } from '@/lib/constants';

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

interface DesktopFolder {
  id: string;
  name: string;
  project?: any; // Single project for individual folders
  projects?: any[]; // Array for special folders like "More Projects"
  position: { x: number; y: number };
  isDragging?: boolean;
  type: 'project' | 'special'; // Type to distinguish between project and special folders
}

interface WallpaperInfo {
  id: string;
  name: string;
  path: string;
  thumbnail?: string;
}

export function MacOSDesktop({ className }: MacOSDesktopProps) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [currentWallpaper, setCurrentWallpaper] = useState<string>('');
  const [availableWallpapers, setAvailableWallpapers] = useState<WallpaperInfo[]>([]);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);

  // Initialize folders with individual project folders
  const getInitialFolderPositions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseY = 80; // Top margin
    const spacing = isMobile ? 120 : 130; // Optimized horizontal spacing for better visual density
    const startX = isMobile ? 50 : 100; // Responsive left margin

    // Find specific projects for individual folders
    const tradeBookLedge = projects.find(p => p.id === 'saas-dashboard');
    const nbkristPortal = projects.find(p => p.id === 'mobile-fitness-app');
    const portfolioWebsite = projects.find(p => p.id === 'portfolio-website');
    const aiAutomationInternship = projects.find(p => p.id === 'ai-automation-internship');

    // Get remaining projects for "More Projects" folder
    const featuredProjectIds = ['saas-dashboard', 'mobile-fitness-app', 'portfolio-website', 'ai-automation-internship'];
    const remainingProjects = projects.filter(p => !featuredProjectIds.includes(p.id));

    if (isMobile) {
      // Stack vertically on mobile for better usability
      return [
        {
          id: 'trade-book-ledge',
          name: 'Trade Book Ledge',
          project: tradeBookLedge,
          position: { x: startX, y: baseY },
          type: 'project' as const,
        },
        {
          id: 'nbkrist-portal',
          name: 'NBKRIST Student Portal',
          project: nbkristPortal,
          position: { x: startX, y: baseY + 120 },
          type: 'project' as const,
        },
        {
          id: 'ai-automation-internship',
          name: 'AI Automation Internship',
          project: aiAutomationInternship,
          position: { x: startX, y: baseY + 240 },
          type: 'project' as const,
        },
        {
          id: 'portfolio-website',
          name: 'Interactive Portfolio Website',
          project: portfolioWebsite,
          position: { x: startX, y: baseY + 360 },
          type: 'project' as const,
        },
        {
          id: 'more-projects',
          name: 'More Projects',
          projects: remainingProjects,
          position: { x: startX, y: baseY + 480 },
          type: 'special' as const,
        },
      ];
    }

    // Desktop 2x2+1 grid layout
    const rowSpacing = 140; // Vertical spacing between rows
    const row1Y = baseY; // First row Y position
    const row2Y = baseY + rowSpacing; // Second row Y position
    const row3Y = baseY + rowSpacing * 2; // Third row Y position

    // Calculate center position for "More Projects" in bottom row
    const centerX = startX + (spacing / 2); // Center between two columns

    return [
      // Row 1: Trade Book Ledge, NBKRIST Portal
      {
        id: 'trade-book-ledge',
        name: 'Trade Book Ledge',
        project: tradeBookLedge,
        position: { x: startX, y: row1Y },
        type: 'project' as const,
      },
      {
        id: 'nbkrist-portal',
        name: 'NBKRIST Student Portal',
        project: nbkristPortal,
        position: { x: startX + spacing, y: row1Y },
        type: 'project' as const,
      },
      // Row 2: AI Weather Reporter, Portfolio Website
      {
        id: 'ai-automation-internship',
        name: 'AI Weather Reporter',
        project: aiAutomationInternship,
        position: { x: startX, y: row2Y },
        type: 'project' as const,
      },
      {
        id: 'portfolio-website',
        name: 'Interactive Portfolio Website',
        project: portfolioWebsite,
        position: { x: startX + spacing, y: row2Y },
        type: 'project' as const,
      },
      // Row 3: More Projects (centered)
      {
        id: 'more-projects',
        name: 'More Projects',
        projects: remainingProjects,
        position: { x: centerX, y: row3Y },
        type: 'special' as const,
      },
    ];
  };

  const [folders, setFolders] = useState<DesktopFolder[]>(() => {
    // Check for layout version to reset positions when layout changes
    const LAYOUT_VERSION = '2x2+1-grid'; // Update this when layout changes

    if (typeof window !== 'undefined') {
      const savedVersion = sessionStorage.getItem('macos-layout-version');
      const saved = sessionStorage.getItem('macos-folder-positions');

      // If layout version matches and we have saved positions, use them
      if (savedVersion === LAYOUT_VERSION && saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse saved folder positions');
        }
      } else {
        // Layout changed or no saved version, reset to new layout
        sessionStorage.setItem('macos-layout-version', LAYOUT_VERSION);
      }
    }
    return getInitialFolderPositions();
  });

  // Load available wallpapers on mount
  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        // Use runtime asset paths for GitHub Pages compatibility
        const defaultWallpaperPath = getRuntimeAssetPath('/assets/macOS-wallpaper/wallpaperflare.com_wallpaper (1).jpg');
        const altWallpaperPath = getRuntimeAssetPath('/assets/macOS-wallpaper/wallpaperflare.com_wallpaper.jpg');

        const wallpapers: WallpaperInfo[] = [
          {
            id: 'wallpaper-1',
            name: 'Default Wallpaper',
            path: defaultWallpaperPath,
          },
          {
            id: 'wallpaper-2',
            name: 'Alternative Wallpaper',
            path: altWallpaperPath,
          },
        ];
        setAvailableWallpapers(wallpapers);

        // Set default wallpaper if none is set
        if (!currentWallpaper) {
          setCurrentWallpaper(defaultWallpaperPath);
          preloadWallpaper(defaultWallpaperPath);
        }
      } catch (error) {
        console.error('Failed to load wallpapers:', error);
      }
    };

    loadWallpapers();
  }, [currentWallpaper, preloadWallpaper]);

  // Save folder positions to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('macos-folder-positions', JSON.stringify(folders));
    }
  }, [folders]);

  // Handle folder drag start for immediate feedback
  const handleFolderDragStart = useCallback((folderId: string) => {
    // Bring dragged folder to front immediately
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, isDragging: true }
        : { ...folder, isDragging: false }
    ));
  }, []);

  // Handle folder drag with smooth responsive constraints and momentum
  const handleFolderDrag = useCallback((folderId: string, info: PanInfo) => {
    setFolders(prev => prev.map(folder => {
      if (folder.id === folderId) {
        const margin = 50;
        const folderWidth = 100; // Approximate folder width including text
        const folderHeight = 100; // Approximate folder height including text

        const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - folderWidth - margin;
        const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - folderHeight - margin;

        // Apply momentum-based positioning with smooth constraints
        let newX = folder.position.x + info.offset.x;
        let newY = folder.position.y + info.offset.y;

        // Add velocity-based momentum for natural feel
        if (info.velocity.x !== 0) {
          newX += info.velocity.x * 0.1; // Momentum factor
        }
        if (info.velocity.y !== 0) {
          newY += info.velocity.y * 0.1; // Momentum factor
        }

        // Smooth boundary constraints with elastic feel
        newX = Math.max(margin, Math.min(newX, maxX));
        newY = Math.max(margin, Math.min(newY, maxY));

        return {
          ...folder,
          position: { x: Math.round(newX), y: Math.round(newY) }, // Round for crisp positioning
          isDragging: false // Reset dragging state
        };
      }
      return folder;
    }));
  }, []);

  // Preload wallpaper image
  const preloadWallpaper = useCallback((wallpaperPath: string) => {
    if (!wallpaperPath) return;

    const img = new Image();
    img.onload = () => {
      setWallpaperLoaded(true);
      console.log('Wallpaper loaded successfully:', wallpaperPath);
    };
    img.onerror = () => {
      console.error('Failed to load wallpaper:', wallpaperPath);
      setWallpaperLoaded(false);
    };
    img.src = wallpaperPath;
  }, []);

  // Handle wallpaper change
  const handleWallpaperChange = useCallback((wallpaperPath: string) => {
    setWallpaperLoaded(false);
    setCurrentWallpaper(wallpaperPath);
    setShowWallpaperSelector(false);
    preloadWallpaper(wallpaperPath);
    // Save to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('macos-current-wallpaper', wallpaperPath);
    }
  }, [preloadWallpaper]);

  // Load saved wallpaper on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWallpaper = sessionStorage.getItem('macos-current-wallpaper');
      if (savedWallpaper) {
        setCurrentWallpaper(savedWallpaper);
        preloadWallpaper(savedWallpaper);
      } else {
        // Set default wallpaper if no saved wallpaper
        const defaultWallpaperPath = getRuntimeAssetPath('/assets/macOS-wallpaper/wallpaperflare.com_wallpaper (1).jpg');
        setCurrentWallpaper(defaultWallpaperPath);
        preloadWallpaper(defaultWallpaperPath);
      }
    }
  }, [preloadWallpaper]);

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

    // Handle individual project folders
    if (folder.type === 'project' && folder.project) {
      openProjectWindow(folder.project);
      return;
    }

    // Handle special folders (like "More Projects")
    if (folder.type === 'special' && folder.projects) {
      // For "More Projects" folder, open GitHub profile
      if (folder.id === 'more-projects') {
        window.open('https://github.com/nrenx', '_blank');
        return;
      }

      // Default behavior for other special folders
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
                    {project.technologies.slice(0, 3).map((tech: string) => (
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
    }
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
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500",
          !wallpaperLoaded && "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
        )}
        style={{
          backgroundImage: wallpaperLoaded && currentWallpaper ? `url('${currentWallpaper}')` : 'none',
        }}
      >
        {/* Subtle overlay for better icon visibility */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Loading indicator */}
        {!wallpaperLoaded && currentWallpaper && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/70 text-sm">Loading wallpaper...</div>
          </div>
        )}
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8">
        {folders.map((folder) => (
          <motion.div
            key={folder.id}
            className="absolute flex flex-col items-center cursor-pointer group select-none hover:cursor-grab active:cursor-grabbing"
            style={{ left: folder.position.x, top: folder.position.y }}
            drag
            dragMomentum={true}
            dragElastic={0.1}
            dragTransition={{
              bounceStiffness: 600,
              bounceDamping: 20,
              power: 0.3,
              timeConstant: 200,
            }}
            dragConstraints={{
              left: 50,
              right: (typeof window !== 'undefined' ? window.innerWidth : 1200) - 150,
              top: 50,
              bottom: (typeof window !== 'undefined' ? window.innerHeight : 800) - 150,
            }}
            onDragStart={() => handleFolderDragStart(folder.id)}
            onDragEnd={(_, info) => handleFolderDrag(folder.id, info)}
            whileHover={{
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400, damping: 25 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 600, damping: 30 }
            }}
            whileDrag={{
              scale: 1.1,
              zIndex: 1000,
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
              rotate: [0, 1, -1, 0],
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 25,
                rotate: { duration: 0.2, repeat: Infinity, repeatType: 'reverse' }
              }
            }}
            onDoubleClick={() => openFolder(folder)}
            layout
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.8,
              layout: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.8
              }
            }}
          >
            <motion.div
              className="w-16 h-16 mb-2 relative"
              animate={{
                rotateY: 0,
                rotateX: 0,
              }}
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              whileDrag={{
                rotateY: 10,
                rotateX: 10,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
            >
              <Folder className="w-full h-full text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-all duration-200" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-300/20 rounded-lg transition-all duration-200 group-hover:from-yellow-200/30 group-hover:to-orange-300/30" />
            </motion.div>
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

      {/* Wallpaper Selector Window */}
      <AnimatePresence>
        {showWallpaperSelector && (
          <MacOSWindow
            id="wallpaper-selector"
            title="Change Desktop Wallpaper"
            position={{
              x: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 300,
              y: typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 150
            }}
            size={{
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerWidth - 40 : 600,
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerHeight - 100 : 400
            }}
            isMinimized={false}
            isMaximized={false}
            zIndex={nextZIndex + 1}
            onClose={() => setShowWallpaperSelector(false)}
            onMinimize={() => setShowWallpaperSelector(false)}
            onMaximize={() => {}}
            onPositionChange={() => {}}
            onFocus={() => {}}
          >
            <div className="p-4 md:p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Choose a wallpaper</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-auto">
                {availableWallpapers.map((wallpaper) => (
                  <motion.div
                    key={wallpaper.id}
                    className={cn(
                      'relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all',
                      currentWallpaper === wallpaper.path
                        ? 'border-primary shadow-lg'
                        : 'border-border/50 hover:border-primary/50'
                    )}
                    onClick={() => handleWallpaperChange(wallpaper.path)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${wallpaper.path}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium truncate">
                        {wallpaper.name}
                      </p>
                    </div>
                    {currentWallpaper === wallpaper.path && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </MacOSWindow>
        )}
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
        onWallpaperClick={() => setShowWallpaperSelector(true)}
      />
    </div>
  );
}
