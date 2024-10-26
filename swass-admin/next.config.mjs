/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or http
        hostname: process.env.NEXT_PUBLIC_MEDIA_DOMAIN, // if your website has no www, drop it
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
