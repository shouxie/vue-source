const Koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const fs = require('fs')
const uuid = require('uuid')
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
      ctx.body = await new Promise((resolve,reject)=>{
        // ctx.body = ctx.request.body
      let arr = []
      ctx.req.on('data',function(chunk){
        arr.push(chunk)
      })
      ctx.req.on('end',function(){
        let buffer = Buffer.concat(arr)
        let boundary = '--'+ctx.get('content-type').split('=')[1]
        console.log(boundary)
        let lines = buffer.split(boundary).slice(1,-1)
        let obj = {}
        lines.forEach(line =>{
          let [linehead,...body] = line.split('\r\n\r\n')
          linehead = linehead.toString()
          let key = linehead.match(/name="(.+?)"/)[1]
          if (linehead.includes('filename')){
            let fileContent = line.slice(linehead.length+4,-2)
            let filename = uuid.v4()
            fs.writeFileSync(filename,fileContent)
            obj[key] = filename
          }else {
            
            let value = Buffer.concat(body).toString()
            obj[key] = value.slice(0,-2)
          }
          resolve(obj)
        })
      })
    })
  }
  
})

app.listen(3000)