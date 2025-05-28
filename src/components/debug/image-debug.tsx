'use client';

import React, { useState, useEffect } from 'react';
import { getRuntimeAssetPath } from '@/lib/utils';

interface ImageDebugProps {
  className?: string;
}

export function ImageDebug({ className }: ImageDebugProps) {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const profilePath = getRuntimeAssetPath('/assets/images/Finding joy in the simplicity of the sea ............beach bridge ocean smile sunny monument collage sunset sunrise travelphotography travel.jpg');
    const profileHoverPath = getRuntimeAssetPath('/assets/images/Finding paradise wherever the waves take me. . . . . . . . . . . . . . . .beachbound beachlife beach beachdreaming ocean paradise wavesfordays explore rainyday shorelineadventures seasideescape beach.jpg');
    
    setDebugInfo({
      profilePath,
      profileHoverPath,
      isProduction: process.env.NODE_ENV === 'production',
      githubPages: process.env.GITHUB_PAGES,
      currentUrl: typeof window !== 'undefined' ? window.location.href : 'SSR',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR'
    });
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show debug info in production
  }

  return (
    <div className={`fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md z-50 ${className}`}>
      <h3 className="font-bold mb-2">Image Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Profile Path:</strong> {debugInfo.profilePath}</div>
        <div><strong>Hover Path:</strong> {debugInfo.profileHoverPath}</div>
        <div><strong>Is Production:</strong> {String(debugInfo.isProduction)}</div>
        <div><strong>GitHub Pages:</strong> {String(debugInfo.githubPages)}</div>
        <div><strong>Current URL:</strong> {debugInfo.currentUrl}</div>
      </div>
    </div>
  );
}
