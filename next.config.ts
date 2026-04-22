import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from GitHub and other external sources
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  // Strict mode for better development warnings
  reactStrictMode: true,
};

export default nextConfig;
