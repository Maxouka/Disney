import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Disney",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
