const merge = require('merge')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: "../dist",
    open: true,
    port: 9000
  }
})