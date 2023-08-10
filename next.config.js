/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: ["localhost", "api.pom-pom.pro"],
  },
  i18n,
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
