/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Fast Refresh (Hot Module Replacement)
  webpack: (config, { dev, isServer }) => {
    // Improve Fast Refresh
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: ["**/node_modules", "**/.git", "**/.next"],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
