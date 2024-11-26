/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: '/markdown-render',
    assetPrefix: '/markdown-render'
};

export default nextConfig;
