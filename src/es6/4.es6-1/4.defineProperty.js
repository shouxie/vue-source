
/*
 * @Author: shouxie
 * @Date: 2020-07-14 16:56:16
 * @Description: 
 */ 
/*
数据劫持
defineProperty 修改原对象
proxy 代理
*/
/*
let el = {
  _content: '',
  get html(){
    return this._content
  },
  set html(value){
    this._content = value
    console.log(value)
  }
}
el.html = '123'
console.log(el.html)


let obj = {}
let newA = undefined
Object.defineProperty(obj,'a',{ // 当前定义属性时 可以自己增加一些配置
  enumerable: true, // 可枚举 如果用es5来模拟es6的类 需要使用此方法
  configurable: true, // 能不能被配置，来判断是否能被重新定义
  // writable: true, // 是否能被写
  get(){
    return newA
  },
  set(value){
    newA = value

  }
});
console.log(obj.a)
for (let key in Array.prototype){
  console.log(key) // 拿不到 enumerable：false
}

Vue.set(obj,'a',2)

*/
// 当前被冻结后的对象不能再次被改写
// Object.freeze  // 性能优化 冻结对象 不能添加get和set
/*

let obj1 = Object.freeze({a:1})
Object.defineProperty(obj1,'qqq',{
  get(){},
  set(){}
})
*/
// Cannot define property qqq, object is not extensible

// 数据劫持
//  要监控数据的变化 数据变化后 需要更新视图

// new Proxy
/*
proxy
set
map
weakmap

*/