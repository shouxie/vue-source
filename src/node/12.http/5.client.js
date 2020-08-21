/*
 * @Author: shouxie
 * @Date: 2020-08-20 16:57:19
 * @Description: 
 */
const http = require('http')
const fs = require('fs')
/*
http.get 只能发送get请求
request可以发送任何类型的请求
*/

let flowing = true

process.stdin.on('data',function(chunk){
  if (chunk.toString().includes('p')){
    flowing = false
  } else {
    if (!flowing){
      flowing = true
      download()
    }
  }
})

let start = 0;
function download(){
  let end = start+5
  http.get({
    host:'localhost',
    port:3000,
    headers:{
      Range:`bytes=${start}-${end-1}`
    }
  },function(res){
    // fs.appendFileSync('download.txt')
    let total = res.headers['content-range'].split('/')[1]
    res.on('data',function(chunk){
      ws.write(chunk)
      if (total > end&&flowing){
        setTimeout(()=>{
          start+=5
          download()
        },1000)
      } else {
        ws.end() // 把文件关闭掉
      }
    })
  })
}
download()
let ws = fs.createWriteStream('./download.txt')
