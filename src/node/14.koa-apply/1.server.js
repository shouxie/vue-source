const Koa = require('koa')
const fs = require('fs')
const path = require('path')
// 第三方插件 都是一个函数 返回的是一个中间件
// const bodyparser = require('koa-bodyparser')
const bodyparser = require('./plugins/bodyparser')

// 静态文件服务中间件
// const static = require('koa-static')
const static = require('./plugins/koa-static')
/*
当用户访问 /form 显示一个html get
在输入框中可以提交数据 /form post
*/ 
let app = new Koa()

// 做一个中间件 可以做权限校验 可以决定是否向下执行

app.use(bodyparser()) // 插件的特点，可以给ctx增加一些属性 ctx.xx

app.use(static(__dirname)) // 以当前路径作为静态服务路径
app.use(static(path.resolve(__dirname,'../')))

app.use(async (ctx,next)=>{
  if(ctx.path === '/form'&&ctx.method === 'GET'){
    ctx.set('Content-Type','text/html;charset=utf-8')
    console.log(222)
    ctx.body = fs.createReadStream(path.resolve(__dirname,'index.html'))
  } else {
    console.log(111)
    await next()
  }
})
// koa 里面所有的异步逻辑都要变成promise的形式
app.use(async (ctx,next)=>{
  if(ctx.path === '/form'&&ctx.method === 'POST'){
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
    // ctx.body = await new Promise((resolve,reject)=>{
    //   let arr = []
    //   ctx.req.on('data',function(chunk){
    //     arr.push(chunk)
    //   })
    //   ctx.req.on('end',function(){
    //     resolve(Buffer.concat(arr).toString())
    //   })
    // })
  }
})

app.listen(3000)