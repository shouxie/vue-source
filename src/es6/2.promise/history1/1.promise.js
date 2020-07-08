/*
 * @Author: shouxie
 * @Date: 2020-07-07 15:23:33
 * @Description: 
 */ 
// 解决异步编程的方案
/*
1） 多个异步方法串行问题  链式调用（基于回调的）
2） 多个异步并发的问题   同步（同时拿到） 两个异步的执行结果 Promise.all

promise 代表的是承诺

状态： 1. 成功态 2. 失败态 3.等待态

只有等待态才可以将状态变为成功或者失败。不能将已经成功了再转化程其他状态，失败态也不能

es6 规范中提供的一个类
*/

/*
1. 每个promise需要提供一个执行器函数（这个函数 会立即执行）
2. new Promise 之后会产生一个promise实例，这个实例上存在一个then方法
3. executor 中需要提供一个成功的方法，和一个失败的方法
*/


let Promise = require('../history2/promise')
let p = new Promise((resolve,reject)=>{ // thenable 对象
  console.log(1)
  // throw new Error('error')
  resolve('success')
  // reject('err') 失效
}) 
console.log(2)
p.then((data)=>{
  console.log(data)
},(err)=>{
  console.log(err)
})