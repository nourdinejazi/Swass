/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // or http
        hostname: "localhost", // if your website has no www, drop it
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
