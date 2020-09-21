## webpack安装

- 安装本地webpack
- webpack webpack-cli -D

## webpack可以进行0配置

- 打包工具 -》 输出后的结果（js模块）
- 打包 支持js的模块化

## 手动配置webpack

默认配置文件的名字 webpack.config.js

## Tapable

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，有点类似node的events库，核心原理也是依赖发布订阅模式

```
yarn add tapable
```
```js
let {SyncHook} = require('tapable')

class Lesson{
  constructor(){
    this.hooks={
      arch:new SyncHook(['name']),
    }
  }

  tap(){
    //注册监听函数
    this.hooks.arch.tap('node',function(name){
      console.log('start',name)
    })
    this.hooks.arch.tap('react',function(name){
      console.log('start',name)
    })
  }

  start(){
    this.hooks.arch.call('jw')
  }
}
let l = new Lesson()
l.tap() // 注册这两个事件
l.start() // 启动钩子
```


```js
// 钩子是同步的
class SyncHook{
  constructor(args){ // args=> ['name']
    this.tasks = []
  }
  call(...args){
    this.tasks.forEach((task)=>{
      task(...args)
    })
  }
  tap(name,task){
    this.tasks.push(task)
  }
}
let hook = new SyncHook(['name'])
hook.tap('react',function(name){
  console.log(name)
})
hook.tap('react',function(name){
  console.log(name)
})
hook.call('')
```