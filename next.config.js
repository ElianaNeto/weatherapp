/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig

// next.config.js
module.exports = {
  /*images: {
    domains: ['cdn.weatherapi.com'],
  },*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '**',
      },
    ],
  },
};

