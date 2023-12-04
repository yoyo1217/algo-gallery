/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // if (!isServer) {
    config.module.rules.push({
      test: /\.txt$/,
      use: "raw-loader",
    });
    // }
    return config;
  },
};

module.exports = nextConfig;
