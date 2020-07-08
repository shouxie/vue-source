/*
 * @Author: shouxie
 * @Date: 2020-07-07 11:45:42
 * @Description: 
 */ 
// 希望同时读取多个文件内容 将内容组成一个数组
let fs = require('fs')
/*

fs.readFile('./1.callback.js','utf-8',function(err,data){
  console.log(data)
})*/
/*let arr = []
fs.readFile('./name.txt','utf-8',function(err,data){
  arr.push(data)
  out()
})
fs.readFile('./age.txt','utf-8',function(err,data){
  arr.push(data)
  out()
})
// console.log(arr) // 直接获取是[],因为fs.readFile 是异步的。
// function out(){
//   if(arr.length === 2){
//     console.log(arr)
//   }
// }

*/



// 改造
fs.readFile('./name.txt','utf-8',function(err,data){
  console.log(data)
  out(data)
})
fs.readFile('./age.txt','utf-8',function(err,data){
  console.log(data)
  out(data)
})
function fn(arr){
  console.log(arr)

}
function after(callback, times){
  let arr = [] // 多个异步的结果会被保存到数组中
  return function(data){ // out
    arr.push(data)
    if(--times===0){ // 如果调用次数达到，将存储的结果传递出去
      callback(arr)
    }
  }
} 
let out =  after(fn,2)

// 异步问题通过回调解决



// 发布订阅  发布arr.foreach 订阅[fn,fn,fn,]