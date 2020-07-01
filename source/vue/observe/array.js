import { observe } from "./index";

/*
 * @Author: shouxie
 * @Date: 2020-06-30 15:30:00
 * @Description: 
 */ 
// 主要做的事就是拦截用户调用的push shift unshift pop reverse sort splice
// 这些方法会改变原数组

// 先获取老的数组方法，只改写这7个方法

let oldArrayProtoMethods = Array.prototype;

// oldArrayProtoMethods.push = function

// 拷贝的一个新的对象，可以查找到老的方法
export let arrayMethods = Object.create(oldArrayProtoMethods);

// 原型链 prototype __proto__
let methods = [
  'push',
  'shift',
  'pop',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
export function observerArray(inserted) { // 循环数组依次对数组中每一项进行观测
  for (let i=0;i<inserted.length;i++) {
    observe(inserted[i]) // 没有对数组的索引进行监控
  }
}

methods.forEach(method => {
  arrayMethods[method] = function(...args) { // 函数劫持，切片编程
    // arr.push(1,2,3) args=[1,2,3] 把参数塞进一个数组
    // Array.prototype.push() call bind apply
    let r = oldArrayProtoMethods[method].apply(this,args);
    console.log('调用老数组最新的方法');
    let inserted;
    switch (method) { // 只对新增的属性 再次进行观测 其他方法没有新增属性
      case 'push':
      case 'unshift':
          inserted = args;
          break;
      case 'splice':
          inserted = args.slice(2) // 获取splice新增的内容
      default: break;
    }
    if (inserted) observerArray(inserted);
    return r;
  }
})