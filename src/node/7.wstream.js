/*
 * @Author: shouxie
 * @Date: 2020-07-31 10:53:28
 * @Description: 
 */ 
let fs = require('fs')
let path = require('path')
let CreateWriteStream = require('./WriteStream')
// 返回额是可写流对象 fs.createWriteStream
let ws = new CreateWriteStream(path.resolve(__dirname,'./2.txt'),{
  flags:'w',
  autoClose:true,
  start:0,
  encoding:'utf8',
  highWaterMark:1 // 期望的个数 默认16k 16*1024
})

// 只能写入 string / buffer 
let flag = ws.write('hello') // 内部调用fs.write
console.log(flag) // flag 为true或者false 是否已经达到期望值highWaterMark，达到了返回false
ws.write('world')

// fs.write -> 会给异步任务进行排序   异步并发 -》 异步串行
// 第一次写入的时候，以后再调用写入会放进链表中

ws.end('world') // 关闭文件 fs.close  => write+close,不能再end之后再调用write


/*
0-9 10个数
*/

// 希望占用更好的内存
for(let i=0;i<10;i++){
  ws.write(i+'')
}

let index=0;
function write(){
  let flag = true
  while(index<10&&flag){
    flag = ws.write(index++ +'')
  }
  if(index===10){
    ws.end(); // 如果最终调用了end 这次drain也不会触发
  }
}
write()

// drain 事件触发条件 达到了期望值 并且当前写入的内容全部清空 会触发
ws.on('drain',function(){
  console.log('drain')
  write()
})