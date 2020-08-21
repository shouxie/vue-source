/*
 * @Author: shouxie
 * @Date: 2020-08-20 16:39:39
 * @Description: 
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
let file = path.resolve(__dirname,'test.txt')
let total = fs.statSync(file).size;
console.log(total)
http.createServer((req,res)=>{
  // 获取range字段 Range:0-3 返回 Content-Range:bytes 0-3/2381
  let range = req.headers['range']
  if (range){
    let [,start=0,end] = range.match(/(\d*)-(\d*)/)

    console.log(start,end)
    res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`)
    fs.createReadStream(file,{
      start:parseInt(start),end:parseInt(end)
    }).pipe(res)
  } else {
    fs.createReadStream(file).pipe(res)
  }
  
}).listen(3000)


