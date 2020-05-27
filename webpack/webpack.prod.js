const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); // 日志输出
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  // mode: "development",
  // output: {
  //   filename: 'main.[chunkhash:8].js',
  //   path: path.resolve(__dirname, '../dist')
  // },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "thread-loader",
      //       options: {
      //         workers: 3 // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
      //       }
      //     },
      //     "babel-loader"
      //   ]
      // },
      {
        test: /.(css|less)$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader // 提取css
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 所有文件都要经过 less postcss 的loader
              modules: true //使用css module
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map", // 生产
  optimization: {
    //生产环境默认开启
    // usedExports: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        //压缩Javascript
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
        cache: true
      })
    ]
  },
  plugins: [
    // https://juejin.im/post/5dee249e518825125f398f70
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].css",
    //   chunkFilename: "css/[id].css"
    // }),
    new webpack.optimize.LimitChunkCountPlugin({
      minChunkSize: 1000,
      maxChunks: 5
    })
    // new FriendlyErrorsWebpackPlugin(), // 日志输出
    // new BundleAnalyzerPlugin({ // bundle size 分析
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   openAnalyzer: false,
    // }),
    // new HtmlWebpackExternalsPlugin({ //cdn 引入打包
    // 	externals: [
    // 		{
    // 			module: 'react', // 模块名称
    // 			entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js', // 引入的cdn
    // 			global: 'React', // 创建一个全局对象 React
    // 		},
    // 		{
    // 			module: 'react-dom',
    // 			entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    // 			global: 'ReactDOM',
    // 		},
    // 	]
    // }),
  ]
  // stats: "normal"
});
