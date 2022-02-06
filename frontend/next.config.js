/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "https://gcdoblog-api.herokuapp.com"],
  },
}

module.exports = nextConfig

