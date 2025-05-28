import { Language, BreakpointConfig, SEOConfig } from './types';

// App Configuration
export const APP_CONFIG = {
  name: 'Portfolio',
  version: '2.0.0',
  environment: process.env.NODE_ENV as 'development' | 'staging' | 'production',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;

// Navigation Items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

// Languages for Landing Animation - Exact original implementation
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', greeting: 'Hello' },
  { code: 'te', name: 'Telugu', greeting: 'నమస్కారం' },
  { code: 'hi', name: 'Hindi', greeting: 'नमस्ते' },
  { code: 'ta', name: 'Tamil', greeting: 'வணக்கம்' },
  { code: 'kn', name: 'Kannada', greeting: 'ನಮಸ್ಕಾರ' },
  { code: 'ml', name: 'Malayalam', greeting: 'നമസ്കാരം' },
  { code: 'gu', name: 'Gujarati', greeting: 'નમસ્તે' },
  { code: 'or', name: 'Odia', greeting: 'ନମସ୍କାର' },
  { code: 'ur', name: 'Urdu', greeting: 'السلام علیکم' },
  { code: 'ja', name: 'Japanese', greeting: 'こんにちは' },
  { code: 'ko', name: 'Korean', greeting: '안녕하세요' },
  { code: 'ru', name: 'Russian', greeting: 'Здравствуйте' },
  { code: 'ta-lk', name: 'Sri Lankan Tamil', greeting: 'Vanakkam' },
];

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 400,
  languageSwitch: 250,
  pageTransition: 500,
  scrollIndicator: 1000,
  particleAnimation: 60000, // 1 minute loop
} as const;

// Responsive Breakpoints
export const BREAKPOINTS: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
};

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light' as const,
  storageKey: 'portfolio-theme',
  transitionDuration: '0.3s',
} as const;

// macOS Interface Configuration
export const MACOS_CONFIG = {
  dock: {
    height: 80,
    iconSize: 48,
    hoverScale: 1.5,
    animationDuration: 200,
  },
  window: {
    minWidth: 400,
    minHeight: 300,
    defaultWidth: 800,
    defaultHeight: 600,
    headerHeight: 30,
    borderRadius: 8,
  },
  desktop: {
    gridSize: 80,
    iconSize: 64,
    folderIconSize: 72,
  },
} as const;

// macOS Dock Items
export const MACOS_DOCK_ITEMS = [
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '/icons/calculator.png',
    tooltip: 'Calculator',
    action: 'calculator',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/github.png',
    tooltip: 'GitHub Profile',
    action: 'github',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.png',
    tooltip: 'LinkedIn Profile',
    action: 'linkedin',
  },
] as const;

// Particle Animation Configuration
export const PARTICLE_CONFIG = {
  count: 50,
  maxSize: 3,
  minSize: 1,
  speed: 0.5,
  opacity: {
    min: 0.1,
    max: 0.8,
  },
  colors: ['#ffffff', '#f0f0f0', '#e0e0e0'],
} as const;

// Form Configuration
export const FORM_CONFIG = {
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    minNameLength: 2,
    maxNameLength: 50,
    minMessageLength: 10,
    maxMessageLength: 1000,
  },
  placeholders: {
    name: 'Your Name',
    email: 'your.email@example.com',
    subject: 'Subject',
    message: 'Your message...',
  },
} as const;

// SEO Configuration
export const SEO_CONFIG: SEOConfig = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Professional portfolio showcasing full-stack development projects, skills, and experience.',
  keywords: [
    'full-stack developer',
    'web development',
    'react',
    'next.js',
    'typescript',
    'portfolio',
    'software engineer',
  ],
  author: 'Your Name',
  siteUrl: APP_CONFIG.baseUrl,
  image: '/assets/images/og-image.jpg',
  twitterHandle: '@yourhandle',
};

// Social Media Links
export const SOCIAL_LINKS = [
  {
    platform: 'GitHub',
    url: 'https://github.com/nrenx',
    icon: 'Github',
    label: 'GitHub Profile',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/bollineninarendrachowdary',
    icon: 'Linkedin',
    label: 'LinkedIn Profile',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/nrenx',
    icon: 'Twitter',
    label: 'Twitter Profile',
  },
  {
    platform: 'Email',
    url: 'mailto:narendrabollineni2002@gmail.com',
    icon: 'Mail',
    label: 'Send Email',
  },
] as const;

// Scroll Configuration
export const SCROLL_CONFIG = {
  smoothScrollDuration: 800,
  scrollOffset: 80, // Offset for fixed navbar
  scrollThreshold: 100, // Threshold for scroll direction detection
  indicatorFadeDistance: 200, // Distance to fade scroll indicator
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  imageOptimization: {
    quality: 85,
    formats: ['webp', 'jpg'],
    sizes: [640, 768, 1024, 1280, 1536],
  },
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
  },
  debounceDelay: 300,
  throttleDelay: 100,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minLength: (min: number) => `Must be at least ${min} characters long.`,
    maxLength: (max: number) => `Must be no more than ${max} characters long.`,
  },
  form: {
    submitError: 'Failed to send message. Please try again.',
    submitSuccess: 'Message sent successfully!',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  form: {
    submitted: 'Thank you for your message! I\'ll get back to you soon.',
  },
  theme: {
    switched: 'Theme updated successfully.',
  },
} as const;

// File Paths
export const FILE_PATHS = {
  resume: '/assets/resume/resume.pdf',
  images: {
    profile: '/assets/images/profile.jpg',
    profileHover: '/assets/images/profile-hover.jpg',
    ogImage: '/assets/images/og-image.jpg',
    favicon: '/favicon.ico',
  },
  icons: {
    logo: '/icons/logo.svg',
    logoLight: '/icons/logo-light.svg',
    logoDark: '/icons/logo-dark.svg',
  },
  wallpapers: {
    macosDesktop: '/assets/macOS-wallpaper/wallpaperflare.com_wallpaper (1).jpg',
  },
} as const;

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  analytics: '/api/analytics',
} as const;

// Feature Flags
export const FEATURES = {
  analytics: process.env.NODE_ENV === 'production',
  errorReporting: process.env.NODE_ENV === 'production',
  performanceMonitoring: process.env.NODE_ENV === 'production',
  darkMode: true,
  animations: true,
  particleSystem: true,
  macosInterface: true,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  navbar: 30,
  modal: 40,
  tooltip: 50,
  notification: 60,
  overlay: 70,
} as const;
