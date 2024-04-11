/** @type {import("next").NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.pom-pom.pro",
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
