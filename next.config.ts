import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/spare-parts",
        destination: "/parts-accessories",
        permanent: true
      },
      {
        source: "/parts",
        destination: "/parts-accessories",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
