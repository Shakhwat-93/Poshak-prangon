import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js setup — deployed on Vercel (no output: 'export' needed)
  // Vercel handles Next.js natively with full server support.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
