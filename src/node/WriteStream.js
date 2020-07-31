/*
 * @Author: shouxie
 * @Date: 2020-07-31 11:20:10
 * @Description: 
 */ 
let EventEmitter = require('events')
let fs = require('fs')


class Node{
  constructor(element){
    this.element = element;
    this.next = null;
  }
}
class LinkList{
  constructor(){
    this.length = 0;
    this.head = null
  }
  append(element){
    let node = new Node(element)
    if (!this.head){
      this.head = node
    } else {
      let current = this.head
      while(current.next){
        current = current.next
      }
      current.next=node
    }
    this.length++;

  }
  shift(){
    let oldHead = this.head
    
    if(oldHead.next){
      this.head = oldHead.next
      this.length--;
      return oldHead.element
    } else {
      return null;
    }
    
    
  }
}

let ll = new LinkList()
ll.append(1)
ll.append(11)
ll.append(111)
ll.append(1111)
console.log(ll)

class WriteStream extends EventEmitter {

  constructor(path,options={}){
    super()
    this.path = path
    this.flags = options.flags ||'w'
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16*1024

    this.writing = false // 默认是否正在向文件中写入？ 还是写在缓存区

    this.open() // 异步触发
    // 每次写入需要有一个偏移量
    this.offset = this.start // 这个属性是可变的
    this.needDrain = false // 是否触发drain事件
    this.len = 0 // 统计当前写入的总个数

    // 缓存
    this.cache = new LinkList()

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

  // 用户会同步调用write方法 传入要写入的数据，编码 成功后的回调
  write(chunk,encoding=this.encoding,callback=()=>{}){
    // chunk 可能是buffer 可能是string
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk) // chunk就是要写入的buffer
    this.len += chunk.length // 每次写入时增加 后续写入完成后还要减少
    let flag = this.len < this.highWaterMark
    this.needDrain = !flag;
    if (this.writing){
      this.cache.append({
        chunk,
        encoding,
        callback
      })
    } else {
      // 第一次 直接向文件中写入即可
      this.writing = true // 标示要开始写入了
      this._write(chunk,encoding,()=>{
        callback()
        this.clearBuffer() // 清空缓存区
      })
    }
    return flag
  }
  end(){}

  _write(chunk,encoding,callback){ // 如果第一个写入完成 需要继续从缓存中取
    if(typeof this.fd !== 'number'){ // 延迟执行
      return this.once('open',()=>this._write(chunk,encoding,callback))
    }
    fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
      
      if(err){
        return this.distory(err)
      }
      this.offset += written // 偏移量  要偏移
      this.len -= written // 缓存区大小减小
      callback() // 调用callback方法
    })

  }
  clearBuffer(){
    // 去链表中取出第一个
    let obj = this.cache.shift()
    if (obj){
      // 缓存区有值
      this._write(obj.chunk,obj.encoding,()=>{
        obj.callback&&obj.callback()
        this.clearBuffer()
      })
    }else{
      // 说明缓存区清空
      this.writing = false// 先修改状态 改为非正在写入
      if (this.needDrain){
        this.needDrain = false; // 下次重新计算是否触发drain事件
        this.emit('drain')
      }
    }
  }
}
module.exports = WriteStream