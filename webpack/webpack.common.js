const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin'); //html中注入文件
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, '../src')
};

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  // console.info(percentage, message, ...args);
};
const common = {
  mode: 'none',
  output: {
    filename: 'main.[contenthash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3 // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 使用缓存
            }
          }
        ]
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
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.ProgressPlugin(handler), //编译进度
    // new webpack.HotModuleReplacementPlugin() // 默认开启
    new HardSourceWebpackPlugin(), // 模块提供中间缓存
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*.{js,jsx}`,  { nodir: true }),
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all' // 公用的类库拆分，默认全部
      // cacheGroups: {
      //   vendors: false,
      //   default: false,
      // }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {}
  },
  performance: false // 关闭性能上的一些问题
};

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));

files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    common.plugins.push(
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file)
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    common.plugins.push(
      new webpack.DllReferencePlugin({
        manifest: require(path.resolve(__dirname, '../dll', file))
      })
    );
  }
});

module.exports = common;
