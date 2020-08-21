
const EventEmitter = require('events')
const http = require('http')
const request = require('./request') // koa 自己封装的请求相关的
const response = require('./response') // koa 自己封装的响应相关的
const context = require('./context') // 上下文对象
const Stream = require('stream')


// 当前Application 就是 Koa的类
module.exports = class Application extends EventEmitter{
  constructor(){
    super()
    this.middlewares = []
    // 创建一个实例  这个实例 指向request的原型 让this.request.__proto__ = 创建一个实例
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
  }
  use(middleware){ // 把n个函数组合起来 reduce compose []
    this.middlewares.push(middleware)
    
  }

  createContext(req,res){
    // 创建上下文的关系
    /*
    创建上下文，需要每一次请求都是独立的、
    */
   let request = Object.create(this.request)
   let response = Object.create(this.response)
   let context = Object.create(this.context)
   context.request = request // 自己封装的request
   context.response = response
   context.res=response.res = res
   context.req = request.req=req // 原生的req
   return context
  }

  compose(ctx){ // 要组合当前所有的中间件
    // 异步逻辑迭代 function next
    let i = 0
    let index = -1
    const dispatch =(i) => {
      if (i <= index ) return Promise.reject(new Error('next() called mutiple times'))
      index = i
      if(index === this.middlewares.length){
        return Promise.resolve()
      }
      let middleware = this.middlewares[i]
      try {
        return Promise.resolve(middleware(ctx,()=>dispatch(i+1)))
      } catch (error) { // 如果函数是同步函数，直接抛出错误 需要trycatch
          return Promise.reject(error)
      }
    }
    return dispatch(i)

  }

  // 此方法用来处理请求
  handleRequest(req,res){

    // 需要将req res 生成一个新的对象，context，再扩展两个属性 request response
    let ctx = this.createContext(req,res)
    res.statusCode = 404 // 默认404 

    // 将数组中的方法都组合起来 组合成一个promise
    this.compose(ctx).then(()=>{
      let body = ctx.body
      console.log(body)
      if (Buffer.isBuffer(body)||typeof body === 'string'){
        res.end(body)
      } else if (body instanceof Stream){
        console.log(1)
        body.pipe(res)
      } else if (typeof body === 'object'){
        res.end(JSON.stringify(body))
      } else if (typeof body === 'number'){
        res.end(body+'')
      } else if (body == null&&res.statusCode!==404) {
        res.end('404')
      } else {
        res.end('not found')
      }
    }).catch((e)=>{
      this.emit('error',e)
      res.statusCode = 500
      res.end('internal server error')
    })

    // this.middleware(ctx)// 等待这个函数执行完毕用户默认会给body赋值赋值后会将404变成200
    
  }

  listen(){
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments)
  }
}