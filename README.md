# note

## entry output 

* entry 入口文件
  *  单入口，多入口
* output 输出文件
  * filename 文件名
    * [hash] 模块标识的hash 每次打包hash改变，可取长度 [hash:8]取8位hash值
      ```js
        filename: 'main.[hash:8].js',
      ```
    * [chunkhash] 内容hash，内容改变hash值变化，内容不变hash不会改变
      ```js
        filename: 'main.[chunkhash:8].js',
      ```
    * [name] 模块名称
    * [id] 模块标识符 
    * [query] 模块query 

## loader

* Loaders 本身是一个函数，接受源文件作为参数，返回转换的结果。

```js
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
  }
```

## devtool

```js
  devtool: 'cheap-module-eval-source-map', // 开发
  // devtool: 'cheap-module-source-map', // 生产
  // devtool: 'inline-source-map',
```

## [plugin](https://webpack.docschina.org/plugins/)

```js
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
```

### 代码体积优化

* historyApiFallback 
  * 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。
  * http默认gzip压缩尺寸20kb ，使用此插件设置最小chunk尺寸，对于多个小于20k文件合并，使用gzip压缩还可以减少http请求
* LimitChunkCountPlugin
  * 当你在编写代码时，可能已经添加了许多代码分离点(code split point)来实现按需加载(load stuff on demand)。在编译完之后，你可能会注意到有一些很小的 chunk - 这产生了大量 HTTP 请求开销。LimitChunkCountPlugin 插件可以通过合并的方式，后处理你的 chunk，以减少请求数

### 构建速度优化

* DllPlugin
  * DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。


## devServer

* 开发服务，略


## 注释

* bundle: webpack打包后的输出是bundle
* chunk : webpack打包的模块是chunk，一个或多个chunk打包后输出为bundle
