/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "gcdoblog-api.herokuapp.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig

