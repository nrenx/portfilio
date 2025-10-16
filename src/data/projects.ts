import { Project } from '@/lib/types';
import { getAssetPath } from '@/lib/utils';

export const projects: Project[] = [
  {
    id: 'bhagavad-gita-automation',
    title: 'Bhagavad Gita Multilingual Video Automation',
    description: 'Automated pipeline for generating multilingual Bhagavad Gita videos',
    longDescription: 'Deployed an automated pipeline using n8n to generate multilingual Bhagavad Gita videos with Google TTS, Google AI, and FFmpeg. Reduced manual workload by 90%, publishing hundreds of multilingual videos across YouTube, Instagram, and Facebook. Built with AI agents for script generation and seamless content creation.',
    technologies: ['n8n', 'Google TTS', 'Google AI', 'FFmpeg', 'AI Agents', 'YouTube API', 'Instagram API', 'Facebook API'],
    features: [
      'Automated multilingual video generation',
      'AI-powered script creation and narration',
      'Google Text-to-Speech integration',
      'FFmpeg video composition and editing',
      'Multi-platform publishing (YouTube, Instagram, Facebook)',
      '90% reduction in manual workload',
      'Hundreds of videos published automatically',
      'Support for multiple languages'
    ],
    githubUrl: undefined,
    liveUrl: 'https://www.youtube.com/@Gita_Gyanaam/playlists',
    imageUrl: getAssetPath('/assets/images/projects/gita-automation.jpg'),
    category: 'other',
    status: 'completed',
    startDate: '2024-06',
    endDate: '2024-09',
    socialLinks: [
      {
        platform: 'YouTube',
        url: 'https://www.youtube.com/@Gita_Gyanaam/playlists',
      },
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/gita_gyanaam/',
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61577900636828',
      },
    ],
  },
  {
    id: 'saas-dashboard',
    title: 'Trade Book Ledge',
    description: 'SaaS business management platform for trade operations',
    longDescription: 'A comprehensive SaaS business management platform designed for trade operations. Features inventory management, financial tracking, customer relationship management, and automated reporting capabilities built with modern no-code tools.',
    technologies: ['Bubble.io', 'Supabase', 'Zapier', 'Chart.js', 'Stripe API'],
    features: [
      'Inventory and stock management',
      'Financial tracking and reporting',
      'Customer relationship management',
      'Automated invoicing and billing',
      'Real-time business analytics',
      'Multi-user access control'
    ],
    githubUrl: 'https://github.com/nrenx/Trade-Book-Ledge',
    liveUrl: 'https://nrenx.github.io/Trade-Book-Ledge/',
    imageUrl: getAssetPath('/assets/images/projects/saas-dashboard.jpg'),
    category: 'web',
    status: 'completed',
    startDate: '2023-08',
    endDate: '2023-11',
  },
  {
    id: 'mobile-fitness-app',
    title: 'NBKRIST Student Portal',
    description: 'Academic portal for student management and services',
    longDescription: 'A comprehensive academic portal designed for NBKRIST students to access academic services, track progress, and manage their educational journey. Built with modern mobile-first design and cloud backend integration.',
    technologies: ['FlutterFlow', 'Firebase', 'Google Cloud', 'Stripe', 'Academic APIs'],
    features: [
      'Student profile and academic records',
      'Course registration and scheduling',
      'Grade tracking and progress analytics',
      'Fee payment and financial management',
      'Campus news and announcements',
      'Digital library access'
    ],
    githubUrl: 'https://github.com/nrenx/nbkrist-student-portal',
    liveUrl: 'https://nbkrstudenthub.me/',
    imageUrl: getAssetPath('/assets/images/projects/fitness-app.jpg'),
    category: 'mobile',
    status: 'completed',
    startDate: '2023-05',
    endDate: '2023-09',
  },
  {
    id: 'automation-workflow',
    title: 'NBKRIST Telegram Bot',
    description: 'Automated Telegram bot for student attendance tracking',
    longDescription: 'An intelligent Telegram bot designed for NBKRIST students to automate attendance tracking and provide quick access to academic information. Built with Python and integrated with the student portal system.',
    technologies: ['Python', 'Telegram Bot API', 'Web Scraping', 'Automation', 'Student Portal Integration'],
    features: [
      'Automated attendance tracking',
      'Real-time academic updates',
      'Student information retrieval',
      'Telegram bot interface',
      'Integration with NBKRIST portal',
      'Automated notifications'
    ],
    githubUrl: 'https://github.com/nrenx/nbkrist-telegram-bot',
    liveUrl: undefined,
    imageUrl: getAssetPath('/assets/images/projects/automation.jpg'),
    category: 'other',
    status: 'completed',
    startDate: '2023-12',
    endDate: '2024-02',
  },
  {
    id: 'ai-automation-internship',
    title: 'AI Weather Reporter',
    description: 'Intelligent weather automation system with AI-powered insights',
    longDescription: 'An intelligent weather automation system that collects user information, fetches real-time weather data, generates AI-powered insights, and delivers personalized weather reports via email. Built as a qualifying task for an AI Automation Internship.',
    technologies: ['React', 'TypeScript', 'n8n', 'Supabase', 'OpenRouter AI', 'WeatherAPI'],
    features: [
      'Real-time weather and air quality data',
      'AI-powered weather commentary using Gemini Flash 1.5',
      'Automated email delivery with HTML templates',
      'Smart duplicate prevention system',
      'Complete audit trail in Supabase database',
      'Professional responsive UI with shadcn/ui'
    ],
    githubUrl: 'https://github.com/nrenx/ai-automation-internship',
    liveUrl: undefined,
    imageUrl: getAssetPath('/assets/images/projects/chatbot.jpg'),
    category: 'web',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-03',
  },
  {
    id: 'designer-shortlist-platform',
    title: 'Designer Shortlist Platform',
    description: 'Platform for shortlisting and managing design talent',
    longDescription: 'A modern platform that helps companies shortlist and manage design talent efficiently. Features portfolio reviews, skill assessments, and streamlined hiring workflows for design teams.',
    technologies: ['TypeScript', 'React', 'Modern UI/UX', 'Portfolio Management', 'Assessment Tools'],
    features: [
      'Designer portfolio showcase',
      'Skill-based filtering and search',
      'Assessment and review system',
      'Hiring workflow management',
      'Team collaboration tools',
      'Analytics and reporting'
    ],
    githubUrl: 'https://github.com/nrenx/designer-shortlist-platform',
    liveUrl: undefined,
    imageUrl: getAssetPath('/assets/images/projects/ecommerce.jpg'),
    category: 'web',
    status: 'completed',
    startDate: '2024-04',
    endDate: '2024-05',
  },
  {
    id: 'portfolio-website',
    title: 'Interactive Portfolio Website',
    description: 'Modern portfolio with macOS-style interface',
    longDescription: 'A modern, interactive portfolio website featuring a macOS-style interface, smooth animations, and responsive design. Built with React, Next.js, and Framer Motion.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'macOS-style interface simulation',
      'Multi-language landing animation',
      'Dark/light theme switching',
      'Smooth scroll animations',
      'Responsive design',
      'Contact form with validation'
    ],
    githubUrl: 'https://github.com/nrenx/portfilio.git',
    liveUrl: 'https://nrenx.github.io/portfilio/',
    imageUrl: getAssetPath('/assets/images/projects/portfolio.jpg'),
    category: 'web',
    status: 'completed',
    startDate: '2024-03',
    endDate: '2024-05',
  },
];

// Group projects by category
export const projectsByCategory = {
  web: projects.filter(p => p.category === 'web'),
  mobile: projects.filter(p => p.category === 'mobile'),
  automation: projects.filter(p => p.category === 'other'),
};

// Get featured projects
export const featuredProjects = projects.slice(0, 3);

// Get recent projects
export const recentProjects = projects
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  .slice(0, 4);
