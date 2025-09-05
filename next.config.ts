import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["falvoraiback.onrender.com", "localhost"], // add your hostname here
    unoptimized: true,
  },
};

export default nextConfig;
