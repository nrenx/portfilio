import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'AI-powered analytics dashboard built with no-code tools',
    longDescription: 'A comprehensive SaaS analytics dashboard that leverages AI-assisted development and no-code platforms. Features real-time data visualization, user management, and automated reporting capabilities.',
    technologies: ['Bubble.io', 'Supabase', 'Zapier', 'Chart.js', 'Stripe API'],
    features: [
      'Real-time analytics and reporting',
      'User authentication and management',
      'Payment integration with Stripe',
      'Automated email notifications',
      'Responsive design for all devices',
      'AI-powered insights and recommendations'
    ],
    githubUrl: 'https://github.com/nrenx/saas-dashboard',
    liveUrl: 'https://saas-dashboard-demo.vercel.app',
    imageUrl: '/assets/images/projects/saas-dashboard.jpg',
    category: 'web',
    status: 'completed',
    startDate: '2023-08',
    endDate: '2023-11',
  },
  {
    id: 'mobile-fitness-app',
    title: 'AI Fitness Companion',
    description: 'Mobile fitness app with AI workout recommendations',
    longDescription: 'A mobile fitness application that uses AI to provide personalized workout recommendations and track user progress. Built using AI-assisted development tools and cloud backend services.',
    technologies: ['FlutterFlow', 'Firebase', 'OpenAI API', 'Stripe', 'Google Fit API'],
    features: [
      'AI-powered workout recommendations',
      'Progress tracking and analytics',
      'Social features and challenges',
      'Integration with wearable devices',
      'Nutrition tracking and meal planning',
      'Premium subscription model'
    ],
    githubUrl: 'https://github.com/nrenx/fitness-app',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.fitness.ai',
    imageUrl: '/assets/images/projects/fitness-app.jpg',
    category: 'mobile',
    status: 'completed',
    startDate: '2023-05',
    endDate: '2023-09',
  },
  {
    id: 'automation-workflow',
    title: 'Business Process Automation',
    description: 'n8n workflow automation for business processes',
    longDescription: 'A comprehensive business process automation system built with n8n that streamlines operations, automates repetitive tasks, and integrates multiple business tools.',
    technologies: ['n8n', 'Telegram Bot API', 'Google Sheets API', 'Slack API', 'Webhook'],
    features: [
      'Automated lead processing',
      'Multi-channel notifications',
      'Data synchronization between platforms',
      'Custom Telegram bot for team updates',
      'Scheduled report generation',
      'Error handling and monitoring'
    ],
    githubUrl: 'https://github.com/nrenx/business-automation',
    liveUrl: null,
    imageUrl: '/assets/images/projects/automation.jpg',
    category: 'other',
    status: 'completed',
    startDate: '2023-12',
    endDate: '2024-02',
  },
  {
    id: 'ecommerce-platform',
    title: 'No-Code E-commerce Platform',
    description: 'Complete e-commerce solution using no-code tools',
    longDescription: 'A full-featured e-commerce platform built entirely with no-code tools, featuring product management, order processing, payment integration, and customer management.',
    technologies: ['Webflow', 'Airtable', 'Zapier', 'Stripe', 'Mailchimp'],
    features: [
      'Product catalog management',
      'Shopping cart and checkout',
      'Payment processing with Stripe',
      'Order management system',
      'Customer relationship management',
      'Email marketing automation'
    ],
    githubUrl: null,
    liveUrl: 'https://ecommerce-demo.webflow.io',
    imageUrl: '/assets/images/projects/ecommerce.jpg',
    category: 'web',
    status: 'completed',
    startDate: '2023-03',
    endDate: '2023-06',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Support Bot',
    description: 'Intelligent chatbot for customer support automation',
    longDescription: 'An AI-powered customer support chatbot that handles common inquiries, escalates complex issues, and provides 24/7 customer service using advanced prompt engineering.',
    technologies: ['OpenAI GPT-4', 'Dialogflow', 'Firebase', 'Telegram API', 'Webhook'],
    features: [
      'Natural language understanding',
      'Multi-language support',
      'Integration with existing CRM',
      'Escalation to human agents',
      'Analytics and performance tracking',
      'Custom training on business data'
    ],
    githubUrl: 'https://github.com/nrenx/ai-chatbot',
    liveUrl: 'https://t.me/customer_support_ai_bot',
    imageUrl: '/assets/images/projects/chatbot.jpg',
    category: 'other',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-03',
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
    githubUrl: 'https://github.com/nrenx/portfolio',
    liveUrl: 'https://narendrachowdary.dev',
    imageUrl: '/assets/images/projects/portfolio.jpg',
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
