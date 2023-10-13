/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    exclude: [/node_modules/, /api/],
}


module.exports = nextConfig
