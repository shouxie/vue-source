/*
 * @Author: shouxie
 * @Date: 2020-07-14 15:48:22
 * @Description: 
 */ 
// 展开运算
/*
拷贝前的和拷贝后的 没有关系的话 就是深拷贝
浅拷贝 表示拷贝后的结果 还有引用以前的引用空间
*/

/*
深拷贝：
1. 考察 当前数据类型校验
2. 循环引用问题
typeof 
Object.prototype.toString.call
instanceof 
constructor
*/
let obj = {
  a:'123',
  b:{
    age:12
  }
}
function deepClone(value, hash = new WeakMap){
  if (value == undefined) { // null == undefined :true
    return value;
  }
  if (typeof value !== 'object') { // typeof 不是对象 就是string number boolean function
    return value;
  }
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new Date(value)
  if (hash.get(value)) { // 如果映射表中有，直接返回拷贝后的结果
      return hash.get(value)
  }
  // object array 拷贝
  // instance 就是拷贝后的结果，希望将它先存起来，下次如果再拷贝，直接返回就好
  let instance = new value.constructor; // new Object new Array
  hash.set(value,instance) // 将拷贝前的和拷贝后的做一个映射表
  for (let key in value) { // 将当前对象中的数据拷贝到新的对象中
    if (value.hasOwnProperty(key)){ // 不拷贝原型链上的属性
      instance[key] = deepClone(value[key],hash)
    }
  }
  return instance

}
let newObj = deepClone(obj) // string number 基础类型 function 拷贝的是对象（正则，日期等）或者数组 undefined null
newObj.b.age = 100
console.log(newObj,obj)
// constructor
// Object.prototype.toString.call(value)


// 循环引用:如果当前这个对象已经被拷贝过了，就不要拷贝了
let b = {}
let a = {b:b}
b.a = a
let newObj1 = deepClone(obj)