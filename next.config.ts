import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  compress: true,
  basePath: "/Venish",
  assetPrefix: "/Venish/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
