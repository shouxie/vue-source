/*
 * @Author: shouxie
 * @Date: 2020-07-07 14:29:55
 * @Description: 
 */ 
//
let fs = require('fs')
let events = {
  dataSourse: [],
  arr:[],
  on(callback){
    this.arr.push(callback)
  },
  emit(data){
    this.dataSourse.push(data)
    this.arr.forEach(fn => fn(this.dataSourse))
  }

}

events.on(function(result){ // y一般发布订阅 可以实现解耦合
  if (result.length ===2){
    console.log('订阅',result)
  }
  
})

fs.readFile('./name.txt','utf-8',function(err,data){
  events.emit(data)
})

fs.readFile('./age.txt','utf-8',function(err,data){
  events.emit(data)
})


// 发布订阅和观察者模式的区别