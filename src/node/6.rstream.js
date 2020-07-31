/*
 * @Author: shouxie
 * @Date: 2020-07-30 15:28:09
 * @Description: 
 */ 
/*
拷贝 读取一点 写入一点 控制用户的可用内存

可以指定读取的个数 自动将数据读出来 将读出来的数据自己调用写的方法
*/

/*
核心模块：stream  文件流 fs模块中的 继承stream模块
*/
let fs = require('fs')
let path = require('path')
/*
  // 可读流对象 可以等会基于事件的方式得到数据  异步解决方案 回调
  rs = fs.createReadStream(path.resolve(__dirname,'1.txt'),{
    // 参数一般不用设置
    flags:'r', // r+ 读取 fs.open()
    highWaterMark: 3, // 每次读取多少个 以字节为单位 默认为64k 64*1024
    start:1, // 每次读的偏移量
    end: 5, // 包含开始和结束
    autoClose: true // 读取完成自动关闭
    // fs.read(fd,buffer,0,length,offset)  emit('data')
    // fs.close emit('end')
  })

  rs.on('open',function(fd){ // 预读 第一次的数据
    console.log('open',fd)
  })

  let arr = []
  // data 每次读取到的结果
  rs.on('data',function(data){ // 考虑数据是二进制文件 图片
    
    arr.push(data)
    console.log('--------',data)
    rs.pause() // 暂停触发data事件
    // console.log(data)
  })

  setTimeout(()=>{
    rs.resume() // 恢复的是data事件的触发
  },1000)

  rs.on('end',function(){
    console.log(Buffer.concat(arr).toString())
  })

  rs.on('close',function(){
    console.log('close')
  })

  rs.on('error',function(err){
    console.log(err)
  })

  // 控制文件流的速率

  // 主要用到的 on('data') on('end')
*/
let ReadableStream = require('./ReadStream.js')
let rs = new ReadableStream(path.resolve(__dirname,'1.txt'),{
  flags:'r',
  highWaterMark:2,
  start:0,
  end:5,
  autoClose:true
})

rs.on('open',function(fd){
  console.log('open',fd)
})

rs.on('data',function(data){
  console.log(data)
})

rs.on('end',function(){
  console.log('end')
})

rs.on('close',function(){
  console.log('close')
})