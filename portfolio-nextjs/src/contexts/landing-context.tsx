'use client';

import React, { createContext, useContext, useState } from 'react';

interface LandingContextType {
  showLanding: boolean;
  showHeader: boolean;
  setShowLanding: (show: boolean) => void;
  setShowHeader: (show: boolean) => void;
  handleLandingComplete: () => void;
}

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [showLanding, setShowLanding] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  const handleLandingComplete = () => {
    setShowLanding(false);
    // Show header after landing screen disappears with proper timing
    setTimeout(() => {
      setShowHeader(true);
    }, 200);
  };

  return (
    <LandingContext.Provider
      value={{
        showLanding,
        showHeader,
        setShowLanding,
        setShowHeader,
        handleLandingComplete,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

export function useLanding() {
  const context = useContext(LandingContext);
  if (context === undefined) {
    throw new Error('useLanding must be used within a LandingProvider');
  }
  return context;
}
