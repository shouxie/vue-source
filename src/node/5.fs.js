/*
 * @Author: shouxie
 * @Date: 2020-07-30 10:20:13
 * @Description: 
 */ 
/*
file system 可以操作文件 和文件夹 

*/
let fs = require('fs')
// fs 中的方法很多都是有同步和异步两种,异步方法中回调函数的参数第一个是错误参数


// 默认读取采用的是buffer
/*
默认读取采用的是buffer
如果文件不存在 默认会报错 读文件必须文件存在
读取的时候不能读取过大的文件 可能会导致淹没用户的可用内存


写入时默认会将内容转换成utf8格式 toString('utf8')
如果文件不存在 会创建文件 如果文件存在 则会将文件清空

如果文件很大 则会无法写入（小于64k可以直接使用readFile）

大于建议读取一点写入一点
*/
/*
  fs.readFile('./1.global.js',function(err,data){
    if (err){
      return console.log(err)
    }
    fs.writeFile('./2.txt',{a:1})
  })

*/



/*
先读取文件 读取一点 写一点

在代码运行时  尽量采用异步的方式 不会阻塞主线程 如果当前程序刚开始运行时 可以采用同步方式

fs.readFile 不能控制读取的速度 也不能控制读取的部分
*/ 

// 手动打开文件 自己读取
// 文件路径
// flags： r 读取，w 写入，a 追加，ax 文件存在失败 r+ 打开文件既能读又能写，文件不存在会报错 w+ 既能写又能读，文件不存在会创建，文件存在会清空
// chmod 改变电脑权限  rwx
fs.open('./readme.md','r',0o666,function(err,fd){
  // fd 文件描述符 number类型 默认windows系统 0 1 2 被占用了
  /*
  0 标准输入 1 标准输出 2 错误输出
  */
 let buffer = Buffer.alloc(3) // i/o 相反的
  /*
    fd 文件描述符 
    buffer 表示将读取的内容写入到buffer中
    0 表示从buffer第0个开始写入
    3 表示写入的个数
    0 表示从文件中的哪个位置开始读取
  */

  // bytesRead 真正读取的个数
 fs.read(fd,buffer,0,3,0,function(err,bytesRead){
  console.log(bytesRead,buffer)
 })
})

fs.open('./readme.md','w',function(err,fd){
  let buffer = Buffer.from('好asf')
  // fd 写入的标识符
  // 从buffer的第0个位置开始读取 读取3个 写入到文件的第0个位置
  fs.write(fd,buffer,0,3,0,function(err,written){

  })
})

// copy
fs.open('./1.txt','r',function(err,fd){
  if (err){
    return console.log(err)
  }
  fs.open('./2.txt','w',function(err,wfd){
    let BUFFER_SIZE = 3
    let buffer = Buffer.alloc(BUFFER_SIZE)
    let readOffset = 0;
    let writeOffset = 0;
    function next(){
      fs.read(fd,buffer,0,BUFFER_SIZE,readOffset,function(err,bytesRead){
        readOffset+=bytesRead
        
        if (bytesRead === 0){
          fs.close(fd,()=>{})
          fs.close(wfd,()=>{})
        } else {
          fs.write(wfd,Buffer,0,bytesRead,writeOffset,function(err,written){
            writeOffset+=written
            next()
          })
        }
          
      })
    }
    next()
  })
})
// 解耦


// fs 流的原理