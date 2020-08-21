/*
 * @Author: shouxie
 * @Date: 2020-08-20 14:39:49
 * @Description:
 */

// puppeteer

const http = require('http')
let fs = require('fs')

http.get({
  host:'node.qpp.cn',
  path:'/images/1.jpg',
  port:3000,
  headers:{ // referer 是可以篡改的
    'referer':'http://node.qpp.cn:3000'
  }
},function(res){
  // res.pipe(fs.createWriteStream(2.jpg))
  let arr = []
  res.on('data',function(chunk){
    arr.push(chunk)
  })
  res.on('end',function(){
    let buffer = Buffer.concat(arr)
    fs.writeFileSync('2.jpg',buffer)
  })
})