/** @type {import('next').NextConfig} */
const nextConfig = {
  skipMiddlewareUrlNormalize: true,
  experimental: {
    concurrentFeatures: false,
  },
  images: { domains: ['images.unsplash.com'] },
};

module.exports = nextConfig;
