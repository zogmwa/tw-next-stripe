const path = require('path')

module.exports = ({ config }) => {
  config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']
  config.resolve.alias = {
    ...config.resolve.alias,
    '@tw': path.resolve(__dirname, '../src'),
  }

  return config
}
