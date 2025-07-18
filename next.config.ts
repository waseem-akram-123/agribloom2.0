import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
    images: {
    domains: ['images.unsplash.com'],
        remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-agribloom-cdn.com',
        port: '',
        pathname: '/**',
      },
      // Add more domains as needed
    ],
  },
};

export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'source.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'your-agribloom-cdn.com',
//       },
//     ],
//     // Optional optimization settings
//     formats: ['image/webp'],
//     minimumCacheTTL: 60,
//   },
//   reactStrictMode: true,
// };

// export default nextConfig;