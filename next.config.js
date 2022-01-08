const withNextra = require("nextra")("nextra-theme-blog", "./theme.config.tsx");
module.exports = withNextra({
  images: {
    domains: ["cdn.discordapp.com"]
  },
  async redirects() {
    return [
      {
        source: "/imagine-griefing",
        destination: "https://youtu.be/5R5LpLc315o",
        permanent: true
      },
      {
        source: "/markets",
        destination: "/market",
        permanent: true
      },
      {
        source: "/markets/login",
        destination: "/market/login",
        permanent: true
      }
    ];
  }
});
