/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/fjkt48-5bc17.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;