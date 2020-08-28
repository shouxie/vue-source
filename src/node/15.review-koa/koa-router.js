module.exports = class Router{
  constructor(){
    this._router =[]
  }
  get(path,handler){
    this._router.push({
      method:'get',
      path,
      handler
    })
  }

  compose(ctx,routes,next){
    async function dispatch(i){
      if (i === routes.length){
        return next()
      }
      let route = routes[i]
      return route.handler(ctx,()=>dispatch(i+1))
    }
    return dispatch(0)
  }

  routes(){
    return async (ctx,next)=>{
      // 请求到来时，会执行此方法
      let method = ctx.method.toLowerCase()
      let path = ctx.path
      // 我们需要依次执行匹配到的路由
      let routes = this._router.filter(route=>{
        return route.method === method && route.path === path
      })
      this.compose(ctx,routes,next)
    }
  }
}