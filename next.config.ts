import type { NextConfig } from 'next'

const imageHosts = [
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
]
  .filter((value): value is string => Boolean(value))
  .map((value) => new URL(value).hostname)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...new Set(imageHosts)].map((hostname) => ({
      protocol: 'https' as const,
      hostname,
    })),
  },
}

export default nextConfig
