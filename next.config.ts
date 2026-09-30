import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/book-finder",
  images: { unoptimized: true },
};

export default nextConfig;