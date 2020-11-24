/*
函数柯里化是把接受多个参数的函数变换成接受一个单一参数
（最初函数的第一个参数）的函数
，并且返回接受余下的参数而且返回结果的新函数的技术，
是高阶函数的一种用法。
比如求和函数add(1,2,3), 经过柯里化后变成add(1)(2)(3)
*/
function currying(fn,...args){
  if(fn.length<=args.length) return fn(...args);
  return function(...args1){
    return currying(fn,...args,...args1)
  }
}




function currying(fn,...args){
  console.log(fn,'args:',args)
  if(fn.length <= args.length) return fn(...args);
  return function(...args1){
    console.log('args1:',args1)
    return currying(fn,...args,...args1);
  }
}

function add(a,b,c){
  return a + b + c
}
add(1,2,3) // 6
var curryingAdd = currying(add);
curryingAdd(1)(2)(3) // 6



// my code
function currying(fn,...args){
  if(fn.length <= args.length){
    return fn(...args);
  }
  return function(...args1){
    return currying(fn,...args1,...args);
  }

}


function currying(fn,...args){
  if(fn.length <= args.length){
    return fn(...args);
  }
  return function(...args1){
    return currying(...args1,...args);
  }
}










/*
sum(1,2)
sum(1)(2)
*/
function currying(fn,...args){
  if(fn.length <= args.length) return fn(...args);
  return function(...args1){
    return currying(...args1,...args);
  }

}