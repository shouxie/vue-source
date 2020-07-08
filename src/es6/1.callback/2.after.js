/*
 * @Author: shouxie
 * @Date: 2020-07-07 11:24:24
 * @Description:  lodash after方法
 */ 
function eat(){
  console.log('吃饭')
}
let fn = after(eat,2)


function after(callback,times){
  return function(){
      if(--times === 0){
        callback()
      }
  }
}
fn()
fn()

// 扩展
