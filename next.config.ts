import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.customwheeloffset.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "stage-amani-forged.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "media.wheelpros.com",
      },
      {
        hostname: "images.wheelpros.com",
        protocol: "https",
      },
      {
        hostname: "wheelpros.com",
        protocol: "https",
      },
      {
        hostname: "assets.wheelpros.com",
        protocol: "https",
      },
      {
        hostname: "ktc-staging.s3.us-east-2.amazonaws.com",
        protocol: "https",
      },
      {
        hostname: "customwheeloffset.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
