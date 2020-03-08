// const {
//   override,
//   addDecoratorsLegacy,
//   disableEsLint,
//   addWebpackAlias,
//   overrideDevServer
// } = require("customize-cra")
const path = require("path")

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src')
    }
    return config;
  }
}