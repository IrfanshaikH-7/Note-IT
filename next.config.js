/** @type {import('next').NextConfig} */
const nextConfig = {
    image: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
          },
        ],
      },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}


module.exports = nextConfig
