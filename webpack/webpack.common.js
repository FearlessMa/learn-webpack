
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  // console.info(percentage, message, ...args);
};
module.exports = {
  entry: './index.js',
  mode: "none",
  output: {
    filename: 'main.[contenthash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
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
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new webpack.ProgressPlugin(handler), //编译进度
    // new webpack.HotModuleReplacementPlugin() // 默认开启
  ],
  optimization: {
    // minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all', // 公用的类库拆分，默认全部
      // cacheGroups: {
      //   vendors: false,
      //   default: false,
      // }
    }
  },
  performance: false, // 关闭性能上的一些问题
}