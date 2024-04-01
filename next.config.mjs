/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "wilderness-society.org",
      "www.activeukraine.com",
      "autoprokat.net.ua",
    ],
  },
};

export default nextConfig;
