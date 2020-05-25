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