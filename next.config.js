/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // To support dynamic routes for static export, ensure all pages are generated
  generateBuildId: async () => {
    return 'static-build-id'
  },
}

module.exports = nextConfig 