/*
 * @Author: shouxie
 * @Date: 2020-07-31 14:54:15
 * @Description: 
 */ 

 /*
 父类 Readable read()
 createReadStream _read() fs.read() => daa this.push(data) => this.emit(data)
 */
let {Readable,Writable,Duplex,Transform} = require('stream')

class MyReadStream extends Readable{}



// 双工流
class MyDuplex extends Duplex{
  _read(){}
  _write(){}
}

let md = new MyDuplex()
md.on('data',function(){

})
// md.write



/*
压缩 加密 转化流
fd 从3 开始 0 标准输入 1 标准输出 2 错误输出
*/
process.stdin.on('data',function(data){
  process.stdout.write(data) //=> console.log(data)
})
// 等价于
process.stdin.pipe(process.stdout)


// process.stdin.pipe(process.stdout)

class MyTransform extends Transform{
  _transform(chunk,encoding,clearBuffer){
    this.push(chunk.toString().toUpperCase())
    clearBuffer()
  }
}
/*
双工流 是读和写 可以有关可以无关
转化流 两个有关系 上一个的输出是下一个的输入
*/
let myTransform = new MyTransform()

process.stdin.pipe(myTransform).pipe(process.stdout)


/*
4种流 
读 on('data') on('end')
写 write  end
双工 两者都有
转化流 在读取和写入中间的部分
*/