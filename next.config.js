/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'm.media-amazon.com' }],
    // Disable Next.js Image Optimization since we use a static export
    unoptimized: true,
  },
};

module.exports = nextConfig;
