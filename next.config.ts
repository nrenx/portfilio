import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Set base path for GitHub Pages (repository name)
  basePath: isProd && isGithubPages ? '/portfilio' : '',

  // Set asset prefix for GitHub Pages
  assetPrefix: isProd && isGithubPages ? '/portfilio' : '',

  // Enable experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Disable server-side features for static export
  trailingSlash: true,

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        framerMotion: {
          name: 'framer-motion',
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          chunks: 'all',
          priority: 30,
        },
      };
    }

    return config;
  },


};

export default nextConfig;
