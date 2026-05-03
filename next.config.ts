import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "heatlagos.com" }],
        destination: "https://www.heatlagos.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
