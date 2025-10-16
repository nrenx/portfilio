// Core Types for Portfolio Migration

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'api' | 'other';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  technologies: string[];
  achievements: string[];
  type: ExperienceType;
}

export type ExperienceType = 'work' | 'education' | 'certification' | 'volunteer';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  description?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'frameworks' | 'other';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Theme Types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Animation Types
export interface AnimationVariants {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

// macOS Interface Types
export interface MacOSWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface MacOSDockItem {
  id: string;
  name: string;
  icon: string;
  action: () => void;
  tooltip: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

// Language Animation Types
export interface Language {
  code: string;
  name: string;
  greeting: string;
}

// Particle Animation Types
export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
}

// Form Types
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

// Responsive Types
export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  image: string;
  twitterHandle?: string;
}

// Error Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event Handler Types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// Scroll Types
export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollDirection {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

// Device Types
export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// Configuration Types
export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  apiUrl: string;
  features: {
    analytics: boolean;
    errorReporting: boolean;
    performanceMonitoring: boolean;
  };
}
