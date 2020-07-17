/*
 * @Author: shouxie
 * @Date: 2020-07-13 19:06:50
 * @Description: 
 */ 
/*
解构赋值 结构相同 可以把解构中的数据获取到
经常和剩余运算符配合
剩余运算符 只能用到最后一个参数中
*/

let {name,age1:age,age1=0} = {name: '',age:''}
// age1:age   改名字
// = 赋默认值


/*
数据结构： 链表 队列 栈 集合  hash表 图 树
set 集合
map 映射表  key 可以是任何值 不能放重复项目
*/

let set = new Set() // 不能放置重复的项


/*
类数组： 有索引 有长度 数组能迭代

[...set] 和Array.from 区别
*/

// 生成器可以产生迭代器

// WeakMap 不会导致内存泄漏
let a = {b:1}
let m = new Map()
m.set(a,100)

let m1 = new WeakMap() // WeakMap WeakSet 弱引用 key只能是个对象
m1.set(a,200)
console.log(m1) // WeakMap {}

a = null
console.log(m) // Map { { b: 1 } => 100 }

