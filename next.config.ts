import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["falvoraiback.onrender.com", "localhost"], // add your hostname here
    unoptimized: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or larger, e.g., '50mb'
    },
  },
};

export default nextConfig;
