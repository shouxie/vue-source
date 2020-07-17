

/*
 * @Author: shouxie
 * @Date: 2020-07-17 17:45:10
 * @Description: 
 */ 
/* 全局对象 global 只要不声明 可以直接使用的就是全局对象
如果变量放到了global上，那这个值肯定是一个全局对象
ex： export console


console.log(Object.keys(global)):
最常见的：
[ 'console',
  'DTRACE_NET_SERVER_CONNECTION',
  'DTRACE_NET_STREAM_END',
  'DTRACE_HTTP_SERVER_REQUEST',
  'DTRACE_HTTP_SERVER_RESPONSE',
  'DTRACE_HTTP_CLIENT_REQUEST',
  'DTRACE_HTTP_CLIENT_RESPONSE',
  'global',
  'process', 进程对象
  'Buffer',  读出来的是二进制的 表示的是内存
  'clearImmediate',
  'clearInterval',
  'clearTimeout',
  'setImmediate', node中自己实现的一个setImmediate
  'setInterval',
  'setTimeout' ]
*/


// console.log(this) // this默认在文件中并不少global this= nodule.exports

/*
node 模块化的概念，默认文件外面包了一个函数 函数 里面的this被更改了

文件中可以直接使用，他们是当前文件外的函数的参数
require module exports __dirname __filename
*/

// console.log(arguments)


/*
process 进程
node：
写插件 ：webpack   webpack --config --port --mode production
前后端分离，解决跨域

怎么获取执行时传递的参数
*/

/*
node global.js --port 3000
运行结果：

[
  '/Users/qpp/.nvm/versions/node/v12.4.0/bin/node',
  '/Users/qpp/important/project/vue-source/src/node/global.js',
  '--port',
  '3000'
]
我们只需要第二个之后的

process.argv.slice(2)
*/
let ops = process.argv.slice(2).reduce((memo,current,index,arr)=>{
  if (current.startsWith('--')){
    memo[current.slice(2)] = arr[index+1]
  }
  return memo;
},{})


console.log(ops) // 需要拿到用户传入的参数 从第二个参数之后才是结果
const program = require("commander");
program.name('node')
program.usage('global.js')
program.option('-p,--port <n>','set your port')
program.option('-o,--out <n>','set output')
program.command('rmdir').action(function(){ // 监听某个命令做某件事
  console.log('执行删除命令')
})
program.on('--help',function(){
  console.log('显示在最后一行')
})
let res = program.parse(process.argv)
// console.log(res)


/*
program.option('-p,--port <n>','set your port')
命令简写，全称 参数 描述


node global.js --help
运行结果：
Usage: node global.js

Options:
  -p,--port <n>  set your port
  -o,--out <n>   set output
  -h, --help     display help for command
显示在最后一行
*/


/*
commander 命令行工具专用包 解析参数，并且提供命令行帮助文档
*/