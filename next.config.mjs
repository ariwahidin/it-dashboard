/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), { "sql.js": "sql.js" }];
    return config;
  },
};

export default nextConfig;