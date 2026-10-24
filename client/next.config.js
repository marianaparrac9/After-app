const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  turbopack: {
    root: path.join(__dirname),
  },
};

module.exports = nextConfig;
