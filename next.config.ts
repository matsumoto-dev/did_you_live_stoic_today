import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // 1000msごとにファイルの変更を確認
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
