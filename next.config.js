/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "c1.neweggimages.com",
                pathname: "/ProductImage/**",
            },
        ],
    },
};

module.exports = nextConfig;
