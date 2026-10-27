import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/blueprints", permanent: false },
      { source: "/work/:slug", destination: "/blueprints/:slug", permanent: false },
      { source: "/blog", destination: "/newsletter", permanent: false },
      { source: "/blog/:slug", destination: "/newsletter", permanent: false },
    ];
  },
};

export default nextConfig;
