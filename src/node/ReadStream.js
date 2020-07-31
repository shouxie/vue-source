/*
 * @Author: shouxie
 * @Date: 2020-07-30 16:29:30
 * @Description: 
 */ 
let EventEmmitter = require('events')
let fs = require('fs')
class ReadStream extends EventEmmitter {
  constructor(path,options ={}){
    super()
    // 初始化默认值
    this.path = path
    this.flags = options.flags || 'r'
    this.highWaterMark = options.highWaterMark || 64*1024
    this.start = options.start || 0
    this.end = options.end || undefined
    this.autoClose = options.autoClose || true

    this.offset = this.start // 可变的

    this.flowing = false
    this.open()
    /*
    状态 是否需要继续读取 flowing
    1 默认会先打开文件 触发 open事件
    2 监控用户有没有监听data事件 如果有，开始读取 emit('data')
    3 如果当前flowing 为true 继续读取
    4. 如果读取不到内容 触发end事件和close事件
    */
   this.on('newListener',(type)=>{
     console.log(type)
     if (type === 'data'){ // 用户监听了data事件
      this.flowing = true // 如果监听了data事件 需要将表示改成true
        this.read() // 读取
     }
   })
    
  }


  // 通过发布订阅来解耦
  read(){// 需要等待文件打开后才能读取
    if (typeof this.fd !== 'number'){ // 等待当前文件打开
      return this.once('open',this.read)
    }

    // 这里不能用同一个buffer  如果第二次读取改变来原来的buffer，用户拿到的buffer都是最后面的
    let buffer = Buffer.alloc(this.highWaterMark) // 申请highWaterMark长的buffer
    fs.read(this.fd,buffer,0,this.highWaterMark,this.offset,(err,byteRead)=>{
      if(err){
        return this.distory(err)
      }
      this.offset += byteRead
     
      if (byteRead===0){ // 如果读取不到数据了
        return this.emit('end')
      } else {
        this.emit('data',buffer.slice(0,byteRead)) // 截取读取到的有效个数 将其发射出去
      }
      if (this.flowing){ // 如果是流动模式 就继续读取
        this.read()
      }
    })
  }

  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if (err){
        return this.distory(err)
      }
      this.fd = fd // 文件打开
      this.emit('open',this.fd)
    })
  }

  pause(){
    this.flowing = false
  }

  resume(){
    if (!this.flowing){
      this.flowing = true
      this.read()
    }
    
  }

  // 负责销毁当前可读流
  distory(err){
    if (err){ // 如果有错误 触发错误
      this.emit('error',err)
    }
    if (this.autoClose){
      if (typeof this.fd == 'number'){
        fs.close(this.fd,()=>{
          this.emit('close')
        } )
      }
      
      
    }
  }

  pipe(ws){
    this.on('data',(chunk)=>{
      let flag = ws.write(chunk)
      if (!flag){
        this.pause()
      }
    })
    ws.on('drain',()=>{
      this.resume()
    })
  }
}

module.exports = ReadStream