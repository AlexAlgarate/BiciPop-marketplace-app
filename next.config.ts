/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //! Temporary
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

module.exports = nextConfig;
