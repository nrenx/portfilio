import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to handle asset paths for GitHub Pages
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true'
    ? '/portfilio'
    : '';

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
