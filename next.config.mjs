const nextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: "**",
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 2628000,
  },
  reactStrictMode: true,
};

export default nextConfig;