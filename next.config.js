/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Exclude canvas from webpack build (needed for Konva SSR compatibility)
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }
    return config;
  },
}

module.exports = nextConfig
