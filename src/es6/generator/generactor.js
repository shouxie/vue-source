/*
 * @Author: shouxie
 * @Date: 2020-07-13 16:53:31
 * @Description: 
 */ 
// 生成器 如何解决异步编程的 * yield

/*
function * read(){ // 生成器 生成的是迭代器
  yield 1
  yield 2
  return undefined
}

let it = read() // iterator
let r = it.next() // 迭代一次 让函数执行，碰到yield 就停止，返回的结果是一个对象，{value,done}
console.log(r)
r = it.next() // 迭代一次 让函数执行，碰到yield 就停止，返回的结果是一个对象，{value,done}
console.log(r)
r = it.next() // 迭代一次 让函数执行，碰到yield 就停止，返回的结果是一个对象，{value,done}
console.log(r)
*/
/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: undefined, done: true }
*/
/*
function * read(){
  let a = yield 1;
  console.log(a)
  let b = yield 2;
  console.log(b)
}
let it = read()
it.next() // next 方法第一次传递参数是无效的
it.next('hello') // 之后的next方法传递的参数会变成yield的返回值
it.next('world')
*/

// node 12 以上 引入了require('fs').promises
let fs = require('fs').promises
function * read(){
  try {
    let content = yield fs.readFile('context.txt','utf8')
    let age = yield fs.readFile(content,'utf8')
    return age
  } catch (error) {
    console.log(error)
  }
  
}
/*
let co = require('co')
co(read()).then(data =>{
  console.log(data)
})
*/
co(read()).then(data =>{
  console.log(data)
})
function co(it){
  return new Promise((resolve,reject)=>{
      function next(val){ // 异步迭代需要借助next函数
        let {value,done} = it.next(val)
        if (done){ // 如果迭代完成了 就将结果作为这个promise的结果就可以了
            resolve(value)
        } else{
          Promise.resolve(value).then(y =>{
            next(y) // 当第一个promise执行完成后，继续迭代下一个promise
          },reject)
        }
      }
      next()
  })
}

let it = read();
let {value} = it.next()
// console.log(fs,value)
value.then(data=>{
  console.log(data)
  let {value} = it.next(data)
  value.then(data =>{
    let r = it.next(data)
    console.log(r)
  })
})


// async await 语法糖 = generator + co

async function read(){
  try {
    let content = await fs.readFile('context.txt','utf8')
    let age = await fs.readFile(content,'utf8')
    return age
  } catch (error) {
    console.log(error)
  }
  
}