const Layer = require('./layer')
const methods = require('methods')
function Route(){
  this.stack = []

  this.methods = {} // 当前这个路由里面有哪些方法 {post:true}
}
methods.forEach(method=>{
  Route.prototype[method]=function(handlers){
    handlers.forEach((handler)=>{
        let layer = new Layer(undefined,handler)
        layer.method = method
        this.methods[method] = true
        this.stack.push(layer)
    })
  }
})
Route.prototype.handle_method=function(method){
  return this.methods[method]
}
Route.prototype.dispatch=function(req,res,out){
  // this.stack=[fn,fn,fn]
  let idx = 0
  let next = (err)=>{
    if(err){
      return out(err)
    }
    if (this.stack.length === idx){
      return out()
    }
    let layer = this.stack[idx++]
    if(layer.method == req.method.toLowerCase()){ // 只有方法一样才会执行对应的处理函数
      layer.handler(req,res,next)
    } else {
      next()
    }
    
  }
  next()
}
module.exports = Route