/*
 * @Author: shouxie
 * @Date: 2020-07-10 17:42:37
 * @Description: 
 */ 

 let Promise = require('./promise')
 let fs = require('fs')
// promise 特点：解决嵌套问题
 function read (...args){
   return new Promise((resolve,reject)=>{
     fs.readFile(...args,function(err,data){
       if (err) {
        reject(err)
       }
       resolve(data)
     })
   })
 }

 function read(...args){
    let dfd = Promise.defer()
    fs.readFile(...args,function(err,data){
      if(err){
        dfd.reject(err)
      }
      dfd.resolve(data)
    })
    return dfd.promise
 }


 let p = new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve(new Promise((resolve,reject)=>{ // 如果一个promise resolve了一个新的
      // promise 那么会等待这个pormise执行完成再执行外层的promise
      setTimeout(() => {
        resolve('ok')
      }, 1000);
    }))
  }, 1000);
 })

 p.then(data =>{
   console.log(data)
 })


 Promise.resolve(100).then(data =>{
   
 })