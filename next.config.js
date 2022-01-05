const withNextra = require('nextra')('nextra-theme-blog', './theme.config.tsx')
module.exports = withNextra({
  images: {
    domains: ['cdn.discordapp.com']
  }
})