/*
 * @Author: shouxie
 * @Date: 2020-07-29 16:39:51
 * @Description: 
 */ 
// 存储二进制文件
/*
一个字节 几个位 8个bit位组成
汉字 gbk 两个字节 node 默认不支持gbk编码
utf8 一个汉字三个字节

一个汉字 3个字节 24个位
buffer 是将二进制 转换成 十六进制 只是短而已


进制转化 2进制  8进制 16进制 10进制

当前位的值 * 当前进制^所在的第几位 累加

*/

// 将任意进制转换成10进制
console.log(parseInt('111',2)) // 7

// 将任意进制转换成任意进制 转换出来的是字符串
console.log((0x16).toString(10)) // 22
console.log((0x16).toString(2)) // 10110


// base64 编码


// buffer 中存的16进制  代表内存 内存在声明的时候要指定长度 单位中的数字 都是字节单位
// 1 数字 2 字符串  3 数组方式来声明

let buffer = Buffer.alloc(10)
console.log(buffer) // <Buffer 00 00 00 00 00 00 00 00 00 00>

let buffer1 = Buffer.from('hhh')

console.log(buffer1) // <Buffer 68 68 68>

let buffer2 = Buffer.from([0xe7,0x8f,0xa0]) // 一般用不到
console.log(buffer2)

// buffer 可以和 字符串 任意转换

console.log(buffer2.toString('utf8')) // 珠


/*
应用场景：
读文件 可能要操作内存
http 
*/

// 进制转换 实现的base64  加密算法   汉字举例 3 * 8 = 4 * 6
let buf = Buffer.from('珠')
console.log(buf) // <Buffer e7 8f a0>

console.log(0xe7.toString(2))
console.log(0x8f.toString(2))
console.log(0xa0.toString(2))
// 11100111  10001111   10100000
// 00111001  00111000 00111110  00100000 一般转换成base64后会比原内容 大 1/3
// 一般 小图标转base64 可以替换所有的url 不需要发送http请求

console.log(parseInt('00111001',2))
console.log(parseInt('00111000',2))
console.log(parseInt('00111110',2))
console.log(parseInt('00100000',2))
// base 编码是公开的
// 57
// 56
// 62
// 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase();
str += '0123456789+/'


console.log(str[57]+str[56]+str[62]+str[32]) // 54+g

// 通过编码可以解决问题

console.log(buffer2.toString('base64'))

/*
buffer 声明方式 3种 长度，数组，数字  buffer不能增大
像数组 索引 循环  slice 没有方法 pop push 
*/

let buffer = Buffer.alloc(10)
console.log(buffer[0])
// buffer.forEach(item)


/*
toString 可以将buffer 转换成字符串
length 字节的个数
Buffer.isBuffer() 判断是否是buffer类型

copy 
concat
*/ 
Buffer.prototype.copy = function(target,targetStart,sourceStart=0,sourceEnd=this.length){
  for(let i =sourceStart;i<sourceEnd;i++){
    target[targetStart+i]=this[i]
  }
}
let buf1 = Buffer.from('主')
let buf2 = Buffer.from('要')
let buf3 = Buffer.alloc(6)
buf1.copy(buf3,0,0,3)
buf2.copy(buf3,3)
console.log(buf3.toString()) // 主要
// concat http请求 上传图片 分段上传
Buffer.concat = function(bufferList,bufferLength=bufferList.reduce((a,b)=>a+b.length,0)){
  let buffer = Buffer.alloc(bufferLength)
  let offset = 0
  bufferList.forEach(item =>{
    item.copy(buffer,offset)
    offset += item.length
  })
  return buffer
}
console.log(Buffer.concat([buf1,buf2]).toString()) // 主要



// indexOf => 字符串indexOf
let buffer = Buffer.from('字符串字符串')
console.log(buffer.indexOf('符')) // 3
console.log(buffer.indexOf('符'),6) // 3

// split
// buffer.split('符')
// 原型上没有的方法 自己封装的
Buffer.prototype.split = function(sep){
  let len = Buffer.from(sep).length
  let offset = 0;
  let arr = []
  let current = 0;
  while(-1 != (current = this.indexOf(sep,offset))){
    arr.push(this.slice(offset,current))
    offset = current + len
  }
  arr.push(this.slice(offset))
  return arr;
}

// 编码问题 buffer 不支持gbk的

// 包 ： iconv-lite

let iconvLite = require('iconv-lite')
// 将buffer gbk的转为utf8
let str = iconvLite.decode(buffer,'gbk')

// 读取文件的时候 ，指定了utf8编码 文件重新保存成了gbk 就会有BOM头

// node 中 自带这个方法
function stripBom(buffer){
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf){
    return buffer.slice(3)
  } else {
    return buffer
  }
}