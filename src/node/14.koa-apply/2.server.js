const Koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
Buffer.prototype.split = function(sep){
  let len = Buffer.from(sep).length
  let offset = 0;
  let current;
  let arr = []
  while(-1 !== (current=this.indexOf(sep,offset))){
    arr.push(this.slice(offset,current));
    offset = current+len
  }
  arr.push(this.slice(offset))
  return arr
}
console.log(Buffer.from('dddawedddqweqwwe').split('d'))

let app = new Koa()

app.use(static(__dirname))
// app.use(bodyparser())
app.use(async (ctx,next)=>{
  if (ctx.path==='/upload'){
    // ctx.body = ctx.request.body
    let arr = []
    ctx.req.on('data',function(chunk){
      arr.push(chunk)
    })
    ctx.req.on('end',function(){
      let buffer = Buffer.concat(arr)
      let boundary = '--'+ctx.get('content-type').split('=')[1]
      console.log(boundary)
      buffer.split()
    })
  }
  
})

app.listen(3000)