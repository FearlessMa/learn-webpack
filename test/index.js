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

const compiler = webpack(prod, (err, stats) => {
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

Object.keys(compiler.hooks).forEach(hookName => {
  if(compiler.hooks[hookName] && compiler.hooks[hookName].tap){
    compiler.hooks[hookName].tap('anyString', () => {
      console.log(`run -> ${hookName}`);
    });
  }
})
// compiler.run();
