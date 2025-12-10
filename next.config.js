/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Exclude canvas and konva from server-side builds to prevent SSR issues
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas', 'konva'];

      // Alias react-konva to an empty module on the server
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-konva': false,
        'konva': false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
