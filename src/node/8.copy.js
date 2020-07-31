/*
 * @Author: shouxie
 * @Date: 2020-07-31 14:41:15
 * @Description: 
 */ 
let ReadStream = require('./ReadStream')
let WriteStream = require('./WriteStream')
let path = require('path')

// pipe 可读流.pipe（可写流）  默认会调用可写流的write和end方法
let fs = require('fs')
fs.createReadStream(path.resolve(__dirname,'1.txt')).pipe(fs.createWriteStream('./2.txt'))




/*
copy

let rs = new ReadStream(path.resolve(__dirname,'1.txt'),{
  highWaterMark:4
})

let ws = new WriteStream('./2.txt',{
  highWaterMark:1
})

rs.on('data',function(data){
  console.log(data)
  let flag = ws.write(data)
  console.log(flag)
  if (!flag){
    // 已经超过预期了 如果再读取 会导致当前读取到的内容 放到了可用内存中
    rs.pause()
  }
})

ws.on('drain',function(){
  rs.resume()
})
*/