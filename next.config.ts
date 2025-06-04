import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  images: {
    // Use remotePatterns instead of domains (domains is deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https', 
        hostname: 'images.unsplash.com',
      },
    ],
    // Modern image formats for better performance
    formats: ['image/webp', 'image/avif'],
    // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Package optimization for better bundle sizes and performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'lucide-react', 
      'recharts',
      'framer-motion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-switch',
      '@radix-ui/react-separator',
      '@radix-ui/react-label',
    ],
    
    // Enable React Compiler (requires babel-plugin-react-compiler)
    reactCompiler: true,
  },

  // Optimize CSS for production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable compression for better performance
  compress: true,

  // PoweredByHeader removal for security
  poweredByHeader: false,

  // TypeScript configuration
  typescript: {
    // Type checking is handled by your IDE and CI/CD
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // ESLint errors will fail the build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;