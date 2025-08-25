// next.config.ts
import type { NextConfig } from "next";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const u = new URL(STRAPI_URL);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        // port is optional; include only if present (e.g., 1337 in dev)
        ...(u.port ? { port: u.port } : {}),
        pathname: "/uploads/**", // Strapi's upload path
      },
    ],
  },
};

export default nextConfig;
