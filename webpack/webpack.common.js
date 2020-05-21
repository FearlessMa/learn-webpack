
const path = require("path");
module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  }
}