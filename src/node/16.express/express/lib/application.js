const http = require('http')
const url = require('url')
// 创建应用 和 应用的分离
// 实现路由和应用的分离
// express 使用了一个模块 methods 第三方模块
let methods = require('methods')
let Router = require('./router')
module.exports = Application
Application.prototype.lazy_route = function(){
  this._router = new Router // 路由懒加载
}
Application.prototype.use=function(path,handler){
  this.lazy_route()
  this._router.use(path,handler) // 应用让路由去处理中间件逻辑
}
function Application(){
  
  // [{
  //   path:'*',method:'all',handler:(req,res)=>{
  //     res.end(`cannot ${req.method} ${req.url}`)
  //   }
  // }] // 维护路径和处理函数的映射表
}

methods.forEach(method=>{
  Application.prototype[method] = function(path,...handlers){
    if (!this._router) {
      this.lazy_route()
    }
    
    // this._router.push({
    //   method:'get',
    //   path,
    //   handler
    // })
    this._router[method](path,handlers)
  }
})


Application.prototype.listen = function(){
  let server = http.createServer((req,res)=>{
    if (!this._router) {
      this.lazy_route()
    }
    function done(){
      res.end(`cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req,res,done) // 让路由自己处理匹配

    // 获取用户请求的路径
    // let {pathname} = url.parse(req.url,true)
    // let requestMethod = req.method.toLowerCase()
    // for(let i =1;i<this._router.length;i++){
    //   let {method,path,handler} = this._router[i]
    //   if(pathname===path&&requestMethod===method){
    //     return handler(req,res) // 找到后就停止执行
    //   }
    // }
    // // 执行默认的逻辑 找不到
    // return this._router[0].handler(req,res)
  })
  server.listen(...arguments)
}
// return {
//   get(path,handler){
//     _router.push({
//       method:'get',
//       path,
//       handler
//     })
//   },
//   all(){},
//   listen(){
//     let server = http.createServer((req,res)=>{
//       // 获取用户请求的路径
//       let {pathname} = url.parse(req.url,true)
//       let requestMethod = req.method.toLowerCase()
//       for(let i =1;i<_router.length;i++){
//         let {method,path,handler} = _router[i]
//         if(pathname===path&&requestMethod===method){
//           return handler(req,res) // 找到后就停止执行
//         }
//       }
//       // 执行默认的逻辑 找不到
//       return _router[0].handler(req,res)
//     })
//     server.listen(...arguments)
//   }
// }