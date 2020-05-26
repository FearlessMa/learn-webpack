const merge = require('webpack-merge')
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 日志输出
var notifier = require('node-notifier');


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
          {
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
  devServer: {
    contentBase: "./dist",
    open: false,
    port: 9000,
    hot: true,
    quiet: true,
    // stats: 'normal',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(
      // {
      // compilationSuccessInfo: {
      //   messages: ['You application is running here http://localhost:3000'],
      //   notes: ['Some additional notes to be displayed upon successful compilation']
      // },
      // onErrors: (severity, errors) => {
      //   if (severity !== 'error') {
      //     return;
      //   }
      //   const error = errors[0];
      //   notifier.notify({
      //     title: "Webpack error",
      //     message: severity + ': ' + error.name,
      //     subtitle: error.file || '',
      //   });
      // }
    // }
    )
  ],
  stats: 'errors-only', //minimal
  // stats: "minimal"
})