
/*
 * @Author: shouxie
 * @Date: 2020-07-07 10:41:02
 * @Description: js 中最核心的技能 回调函数
 */ 

// 高阶函数 （函数当作参数传递给另一个函数）一个函数返回另一个函数
/*function a(b){

}
a(function (){})

function a(){
  return function (){}
}
*/
// 检测数据类型 typeof Object.prototype.toString.call() instance of constructor
/*function isType(content,type){
  return Object.prototype.toString.call(content) === `[object ${type}]`
}*/
// 柯里化

// 属性私有化
// 闭包：函数执行的时候会产生一个不销毁的内存空间
function isType(type){ // type 会保留在当前的上下文中
  return function(content){
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

let util = {}
let arr = ['String','Boolean','Undefined']
arr.forEach(type => {
  util[`is${type}`] = isType(type)
});
let isString = isType('String')
let isBoolean = isType('Boolean')


// console.log(isType('hello','String'))
console.log(util.isString('hello'))
console.log(util)

// todo 函数柯里化  反柯里化
// let isString = currying(isType,'String')