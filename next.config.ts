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
    ],
  },
};

export default nextConfig;
