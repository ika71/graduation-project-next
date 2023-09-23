/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.BACKEND_IMAGE_SERVER_PROTOCOL,
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
