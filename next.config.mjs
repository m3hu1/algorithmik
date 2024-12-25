/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Suppress the warning
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
};

export default nextConfig;
