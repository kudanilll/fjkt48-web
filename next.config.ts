import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkt48.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/jadwal", destination: "/schedule", permanent: true },
      { source: "/schedules", destination: "/schedule", permanent: true },
      { source: "/berita", destination: "/news", permanent: true },
      { source: "/members", destination: "/member", permanent: true },
    ];
  },
};

export default nextConfig;
