import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-storage.storage.eu-north1.nebius.cloud",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

export default nextConfig;
