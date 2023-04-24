/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ['localhost', 'api.epic-type.ru']
  },
  i18n
}

module.exports = nextConfig
