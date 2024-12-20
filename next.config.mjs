/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wbqmdidxdtqqcwidmpfb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
