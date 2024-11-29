/** @type {import('next').NextConfig} */

import { webpackFallback } from '@txnlab/use-wallet-react'

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        // config.externals.push('pino-pretty', 'lokijs', 'encoding')
        ...config.resolve.fallback,
        ...webpackFallback
      }
    }
    return config
  },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ]
    },
    reactStrictMode: true
  }

export default nextConfig;
