/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'your-production-domain.com'],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

module.exports = nextConfig

