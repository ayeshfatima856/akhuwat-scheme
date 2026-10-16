import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel par deploy ke liye standalone hata diya (Vercel apna handle karta hai)
  // output: "standalone", // Commented out for Vercel deployment
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
