/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.placestovisitindia.com",
      },
    ],
  },
};

export default nextConfig;
