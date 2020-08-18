

/*
 * @Author: shouxie
 * @Date: 2020-07-17 17:45:10
 * @Description: 
 */ 

/*
基本数据类型 string number boolean null undefined
symbol bigInt
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

argv 参数
env 环境变量
cwd 当前的工作目录 current working directory 在哪里运行的

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

/*
cross-env 跨平台设置环境变量
*/


/*
path
fs


fs中的方法，有异步，同样会对应一个同步的方法 exists这个方法的异步被废弃掉了，因为他的回调函数中第一个参数不是err
fs.exists
fs.existsSync

path

path.extname() // 判断文件后缀

path.resolve 和 path.join 区别就是
resolve 遇到/ 会回到根目录
join 会直接拼接

path.dirname(filename) 根据文件取他的所在目录

console.log(path.resolve(__dirname, 'p.md','/','b'))
//   /b
console.log(path.join(__dirname, 'p.md','/','b'))

// /Users/qpp/important/project/vue-source/src/node/p.md/b

*/
let fs = require('fs')
let path = require('path')
// fs.exists
// console.log(fs.existsSync('./b.js'))
console.log(path.extname('./readme.md'))
console.log(path.resolve(__dirname, 'p.md','/','b'))
//   /b
console.log(path.join(__dirname, 'p.md','/','b'))

// /Users/qpp/important/project/vue-source/src/node/p.md/b


/*
让一个字符串执行 new Function / eval  这两个方法都会使模块间相互影响
vm 模块（虚拟机模块）

沙箱环境 干净的执行环境 让字符串执行
vm.runInThisContext() 
*/

/*
调试的适用场景
命令行调试
在浏览器中调试   node --inspect-brk xxx.js   调试 停在第一行，浏览器打开 chrome://inspect
vscode 调试
*/

/*
require 同步方法

1. 使用模块上定义的require方法 Module.prototype.require
2. Module._load 模块的加载方法
3. Module._resolveFilename 把文件路径转换成绝对路径 会尝试添加.js / .json 文件后缀
4. Module._cache(filename) 判断当前这个路径有没有在缓存中，如果在缓存中就结束了，绝对路径具有唯一性
5. new Module 创建一个模块 两个重要属性 id：当前的文件名 exports 当前模块的导出对象
6. 把当前模块放到缓存中
7. tryModuleLoad 尝试加载模块
8. module.load 模块的加载
9. 先找到文件的扩展名  不同的扩展名处理方式不相同.js/.json
10. 通过扩展名调用不同的方法 Module._extensions[extension]
11. 如果是js 读取文件的内容 readFileSync
12. 将读取到的内容 Module.wrap 进行包裹   Module.warpper[0] + script + Module.wrapper[1]
const warpper = [
  '(function(exports,require,module,__filename,__dirname){',
  '\n})'
]

将字符串使用 runInThisContext 进行执行，改变this，将参数传入，用户会给参数赋值
会给module.exports 赋值

最终require方法返回的是module.exports
*/
// node commonjs 动态 esModule 静态 umd
let fs = require('fs')
let path = require('path')
let vm = require('vm')
function Module(filename){
  this.id = filename
  this.exports = {}
}
function req(filename){
  filename = Module._resolveFilename(filename)
  let cacheModule = Module._cache[filename]
  if (cacheModule){
    return cacheModule.exports // 做了一层缓存 不必再读取文件了
  }
  let module = new Module(filename) // 创建一个模块，模块中有两个属性 exports id
  Module._cache[filename] = module
  module.load() // 加载模块 用户会给module.exports 赋值
  return module.exports
}
Module.warpper = [
  '(function(exports,require,module,__filename,__dirname){',
  '\n})'
]

Module._extensions = {
  '.js'(module){ // 处理js
    let content = fs.readFileSync(module.id,'utf8')
    content = Module.warpper[0] + content + Module.warpper[1]
    let fn = vm.runInThisContext(content)
    let exports = module.exports
    fn.call(exports,exports,req,module,module.id,path.dirname(module.id))
  },
  '.json'(module){
    let content = fs.readFileSync(module.id,'utf8')
    module.exports = JSON.parse(content)
  }
}
Module._resolveFilename = function(filename){
  let abspath = path.resolve(__dirname,filename) // 算出一个绝对路径
  let isExists = fs.existsSync(abspath)
  if (isExists) {
    return abspath
  } else {
    let keys = Object.keys(Module._extensions)


    for (let i =0;i<keys.length;i++){
      let newPath = abspath + keys[i]
      let flag = fs.existsSync(newPath)
      if (flag) {
        return newPath
      }
    }
    throw new Error('module not found')
  }
}
Module.prototype.load = function(){
  // 核心加载方法
  let extname = path.extname(this.id)
  Module._extensions[extname](this)
}

/*
总结：
模块：
核心模块（不需要安装，不需要自己写）
文件模块：必须路径是相对路径或者绝对路径
第三方模块 和核心模块一样 但是需要安装


文件引用规则：
每个版本都不太一样

新版本中会先查找文件 再查找文件夹 如果没有匹配文件 
会找文件夹 如果文件夹下有package.json 
找main入口 如果有 引入main
否则找index.js


第三方的查找路径：
先找当前目录下的node_modules 找不到向上查找
console.log(module.paths) 
第三方需要安装 但是不能使用全局模块，global安装的找不到（只能在命令行中使用）

module.exports === exports // true
module.exports = 'hello' // res:hello
exports = 'hello' // res:{} 错误用法
let res = require('xxxx')
源码：
let exports= module.exports = {}
module.exports = 'hello'
return module.exports

如果exports.a = 'hello' 这个可以，因为相当于给module.exports 也加了a


es6是合并关系，node中如果都写，采用的module.exports
*/



/*
process.nextTick node 中自带的微任务 让当前的方法变成异步方法



node 事件环 11版本之后 执行方式和浏览器一致


timers    定时器， setInterval

不考虑=pending callbacks   系统会把上一轮没有执行完的 在本次事件环中执行

不考虑=idle prepare  内部的准备操作

poll   轮训阶段   执行io操作 readFile等

check  setImmediate方法    

不考虑=close callbacks   tcp 关闭事件




微任务队列： nextTick比 promise.then 优先
*/

/*
代码执行主栈
默认看执行当前主栈代码 执行完毕后 清空所有微任务 拿到timer中的队列 取出第一个执行
执行完毕后 再清空所有微任务 再取出第二个timer 如果没有timer 会进入到poll阶段，
如果有check 会向下执行 如果没有，就执行对应的io的回调 如果没有其他的 会在这个阶段进行等待
等待定时器到达时间返回
*/
// 有这么一个定时器：

// setTimeout(() => console.log('我第一'), 3000);
// 站在宏观思想上理解，这行代码的意思是这个定时器将在三秒后触发，但站在微观的角度上，3000ms并不代表执行时间，而是将回调函数加入任务队列的时间

// setTimeout 和 setimmediate 执行顺序不固定 受进程影响
setTimeout(() => {
  console.log('timer')
}, 0);

setImmediate(()=>{
  console.log('immediate')
})
/*
setTimeout(() => {
  console.log('1')
}, 1000);
setTimeout(() => {
  console.log('2')
  Promise.resolve().then(()=>{
    console.log('3')
    setTimeout(() => {
      console.log('4')
    }, 500);
  })
}, 500);
*/

let fs = require('fs')
fs.readFile('./readme.md','utf8',()=>{
  console.log(1)
  // setImmediate(()=>{
  //   console.log('2')
  // })
})

setTimeout(() => {
  console.log('timer')
}, 0);

setImmediate(()=>{
  console.log('immediate')
})