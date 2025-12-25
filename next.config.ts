// import type { NextConfig } from "next";
// @type {import('next').NextConfig}

// const nextConfig: NextConfig = {
//   /* config options here */
//   Images: {
//     domains: [
//       "api.microlink.io", // Microlink Image Preview
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
};

module.exports = nextConfig;
