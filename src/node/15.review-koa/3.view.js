/*
koa
@koa/multer
koa-bodyparser

*/
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const util = require('util')
// const views = require('koa-views') // 模板的渲染


function views (dirname,{extension}){
  return async (ctx,next)=>{
    ctx.render = async function(filename,renderObj){
      let ejs = require(extension) // 引入对应的模板
      let renderFile = util.promisify(ejs.renderFile)
      try {
      ctx.body = await renderFile(require('path').join(dirname,filename),renderObj)
      } catch (error) {
        ctx.body = 'render fail'
          return next()
      }
    }
    await next()
  }
}

// app.use(views(__dirname+'/views',{
//   map:{
//     html:'ejs'
//   }
// }))
// 管理系统 ssr ejs  + 服务端数据渲染

app.use(views(__dirname+'/views',{extension:'ejs'})) // render 渲染函数

router.get('/',async(ctx,next)=>{
  ctx.body = 'home'
  await ctx.render('page.ejs',{name:'asd'})
  next()
})

// 路由，映射关系 /接口  访问不同的路径 返回不同的资源 方法 restful
app.use(router.routes())
app.use(async(ctx)=>{
  ctx.body = 'end'
})
app.listen(3000)