/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "static01.nyt.com",
      "images.gmanews.tv",
      "www.nytimes.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
