import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: "mongodb://admin:adminpassword@localhost:27017",
    MONGODB_DB: "local",
    MONGODB_COLLECTION: "messages",
  },
};

export default nextConfig;
