/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Разрешает любые домены
      },
      {
        protocol: 'http',
        hostname: '**',  // Если нужно поддерживать http, добавьте это
      },
    ],
  },
};

export default nextConfig;
