/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'm.media-amazon.com' }],
    unoptimized: true,
  },
};

module.exports = nextConfig;
