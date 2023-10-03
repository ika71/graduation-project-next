/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/:path*`,
      },
    ];
  },
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
