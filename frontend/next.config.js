/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['62.72.6.16']
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
