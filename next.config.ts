import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    // Vercel restores .next/cache between deploys and served a stale stylesheet
    // (missing new CSS) from the Turbopack build cache, so always build CSS fresh.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
