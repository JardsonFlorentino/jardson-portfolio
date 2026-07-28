import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: enable React strict mode for highlighting issues
  reactStrictMode: true,

  // Performance: compress with gzip (Vercel handles this, but explicit is good)
  compress: true,

  // Images: allow remote patterns when needed
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental: optimize specific things
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withNextIntl(nextConfig);
