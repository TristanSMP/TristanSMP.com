const withNextra = require("nextra")("nextra-theme-blog", "./theme.config.tsx");
module.exports = withNextra({
  images: {
    domains: ["cdn.discordapp.com"]
  },
  async redirects() {
    return [
      {
        source: "/imagine-griefing",
        destination:
          "https://cdn.discordapp.com/attachments/871528894623273000/917328471213084722/imagine_griefing.mp4",
        permanent: true
      }
    ];
  }
});
