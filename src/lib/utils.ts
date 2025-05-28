import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to handle asset paths for GitHub Pages
export function getAssetPath(path: string): string {
  // Check if we're building for GitHub Pages
  const isGithubPages = process.env.GITHUB_PAGES === 'true';
  const isProduction = process.env.NODE_ENV === 'production';

  const basePath = isProduction && isGithubPages ? '/portfilio' : '';

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

// Runtime utility for dynamic asset path resolution (client-side only)
export function getRuntimeAssetPath(path: string): string {
  if (typeof window === 'undefined') {
    // During SSR, use the build-time logic
    return getAssetPath(path);
  }

  // Client-side: check actual hostname
  const isGithubPages = window.location.hostname === 'nrenx.github.io';
  const basePath = isGithubPages ? '/portfilio' : '';

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
