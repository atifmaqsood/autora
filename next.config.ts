import type { NextConfig } from "next";

const backendUrl = new URL(process.env.API_URL ?? "http://localhost:3101/api");
const backendProtocol = backendUrl.protocol === "https:" ? "https" : "http";

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
      },
      {
        protocol: backendProtocol,
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/uploads/**"
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
