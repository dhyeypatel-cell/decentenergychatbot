import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@google/genai", "@pinecone-database/pinecone", "zod"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
