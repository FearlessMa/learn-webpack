
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: "none",
  output: {
    filename: 'main.[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images'
          }
        }
      },
      {
        test: /.(css|less)$/,
        loader: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 所有文件都要经过 less postcss 的loader
            modules: true, //使用css module
          }
        },
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map', // 开发
  // devtool: 'cheap-module-source-map', // 生产
  // devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
}