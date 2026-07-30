import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the parent directory otherwise confuses
  // Turbopack's workspace-root inference.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
