const merge = require('webpack-merge')
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 日志输出
var notifier = require('node-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = merge(common, {
  mode: "development",
  output: {
    filename: 'main.[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.(css|less)$/,
        loader: [
          'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader, // 提取css
          //   options: {
          //     // publicPath: '/public/path/to/',
          //     // 只在开发模式中启用热更新
          //     hmr: true,
          //     // 如果模块热更新不起作用，重新加载全部样式
          //     // reloadAll: true,
          //   },
          // },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 所有文件都要经过 less postcss 的loader
              modules: true, //使用css module
            }
          },
          'postcss-loader',
          'less-loader',
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map', // 开发
  devServer: {
    contentBase: "./dist",
    // open: false,
    port: 9000,
    hot: true,
    // quiet: true,
    // stats: 'normal',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new FriendlyErrorsWebpackPlugin()
  ],
  // stats: 'errors-only', //minimal
  // stats: "minimal"
})