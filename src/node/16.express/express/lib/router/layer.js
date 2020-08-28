function Layer(path,handler){
  this.path = path
  this.handler = handler
}
Layer.prototype.match=function(pathname){
  if(!this.route){ // 中间件
    if(this.path === '/'){
      return true
    }
    return this.pathname.startsWith(this.path+'/')
  } 
  return pathname === this.path
  
}
Layer.prototype.handle_request=function(req,res,next){
  this.handler(req,res,next)
} 
module.exports = Layer