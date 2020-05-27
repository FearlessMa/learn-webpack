const os = require('os');
const path = require('path');
const webpack = require('webpack');

// const len = os.cpus().length;
// console.log('len: ', len);

// const PATHS = {
//   src: path.join(__dirname, './src')
// };
// console.log('PATHS: ', PATHS);
const prod = require('../webpack/webpack.prod');

webpack(prod, (err, stats) => {
  // console.log('stats: ', stats);
  console.log('err: ', err);
  // 输出打包过程的描述信息
  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false
    })
  );
});
