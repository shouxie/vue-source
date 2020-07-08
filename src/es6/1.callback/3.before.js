/*
 * @Author: shouxie
 * @Date: 2020-07-07 11:27:43
 * @Description: 
 */ 
//我们希望在原有的功能上增加一些方法
// vue.minxin
function say(who){
  console.log(who+'说话')

}
Function.prototype.before = function(callback){
  // this => say
  return (...args)=>{ // 箭头函数没有arguments 剩余运算符
    callback()
    this(...args) // 把数组展开 一次传入到say方法中
  }
}
let fn = say.before(function(){ // AOP 面向切片编程
  console.log('before say')
})
fn('aa')

// vue 数组方法重写 函数劫持

// AOP 切片
// 当调用数组的push方法时先打印调用了push方法
let arr = [1,2,3]

let oldPush = Array.prototype.push
Array.prototype.push = function(...args){ // 调用了push方法
  console.log('调用了push')
  oldPush.call(this,...args)

}
arr.push(4)
console.log(arr)