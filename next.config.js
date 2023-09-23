/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.BACKEND_IMAGE_SERVER_PROTOCOL,
        hostname: process.env.BACKEND_IMAGE_SERVER_HOSTNAME,
      },
    ],
  },
};

module.exports = nextConfig;
