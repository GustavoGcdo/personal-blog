/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true,
      },
      {
        source: '/articles/essencia-da-metodologia-agil',
        destination: '/articles/essencia-metodologia-agil',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

