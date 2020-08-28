const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')
function Router(){
  this.stack = []
}
Router.prototype.route=function(path){
  let route = new Route()
  let layer = new Layer(path,route.dispatch.bind(route)) // 保证dispatch中的this永远指向route
  // 外层layer 里 存的是dispatch 内层里存的不是dispatch 是用户的函数 为了保持一致
  layer.route = route // 每个路由都有一个route属性
  this.stack.push(layer)
  return route
}
Router.prototype.use=function(path,handler){
  if(typeof path === 'function'){ // 默认设置 中间件的path属性
    handler = path
    path='/'
  }
  let layer = new Layer(path,handler)
  layer.route = undefined // 如何区分中间件还是路由 通过是否有route属性
  this.stack.push(layer)
}
methods.forEach(method=>{
  Router.prototype[method]=function(path,handlers){
    // this.stack.push({
    //   path,
    //   handler,
    //   method:'get'
    // })
    // 1 需要先产生一个route
    // 2. 产生一个layer，layer上要有一个route属性 new Layer(path,route.dispatch)
    // 3 将用户的传递的函数 交给route来处理
    let route = this.route(path)
    route[method](handlers) // 将用户写的handler 传递给route 让route放到自己的stack中
  }
})

Router.prototype.handle = function(req,res,done){
  let {pathname} = url.parse(req.url)
  let requestMethod = req.method.toLowerCase()
  // for(let i =0;i<this.stack.length;i++){
  //     let {method,path,handler} = this.stack[i]
  //     if(pathname===path&&requestMethod===method){
  //       return handler(req,res) // 找到后就停止执行
  //     }
  // }
  // done()
  // this.stack = [] 迭代栈中的每一层
  let idx = 0

  let next = (err) =>{ // 这里统一处理错误
    if(this.stack.length===idx){
      return done()
    }
    let layer = this.stack[idx++]
    if(err) { // 需要找错误处理中间件
      if(layer.match(pathname)){ // 先要判断路径是否匹配
        if(!layer.route&&layer.handler.length===4){ // 错误中间件
          layer.handler(err,req,res,next)
        } else {
          next(err)
        }
      }else{
        next(err)
      }
    } else {
      
  
      // 需要针对中间件 和 路由 作出不同的处理
      if(layer.match(pathname)){ // 无论中间件 还是路由 都要匹配路径
        if(layer.route){ // 路由
          if(layer.route.handle_method(requestMethod)){
            layer.handle_request(req,res,next)
          } else { // 方法不存在则继续迭代
            next()
          }
        } else { // 中间件直接执行
          if(layer.handler.length !== 4){
            // 错误中间件 正常情况下不需要走错误
            layer.handle_request(req,res,next)
          } else {
            next()
          }
          
          
        }
      } else {
        next()
      }
    }
    



/* 老逻辑
    // 如果是路由 除了判断路径 还是需要判断方法的
    if (layer.match(pathname) && layer.route.handle_method(requestMethod)){
      // 路径匹配到后交给当前route来处理，route内部会默认执行第一个，就是用户定义的函数
      layer.handle_request(req,res,next)
      // layer.handler(req,res,next) // 这个handler 就是 dispatch方法
    }else{
      next()
    }
    */
  } 
  next()

}

module.exports = Router


// 构造函数的优点
