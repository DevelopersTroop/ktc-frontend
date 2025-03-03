import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
        protocol:'https',
        hostname:'stage-amani-forged.s3.us-east-2.amazonaws.com'
      },
      {
        protocol:'https',
        hostname:'m.media-amazon.com'
      },
      {
        protocol:'https',
        hostname:'media.wheelpros.com'
      },{
        hostname:'images.wheelpros.com',
        protocol:'https'
      },{
        hostname:'wheelpros.com',
        protocol:'https'
      }
    ],
  },
};

export default nextConfig;
