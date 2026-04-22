import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for static export
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  // Strict mode for better development warnings
  reactStrictMode: true,
};

export default nextConfig;
