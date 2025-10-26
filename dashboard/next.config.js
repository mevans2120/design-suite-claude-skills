/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Phase 1 (no backend needed)
  output: 'export',

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },

  // Trailing slash for consistent URLs
  trailingSlash: true,
};

module.exports = nextConfig;
