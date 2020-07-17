/*
 * @Author: shouxie
 * @Date: 2020-07-17 11:26:17
 * @Description: 
 */ 
/*
模板引擎
ejs
handlerbar
unsdercore
jade
*/

// 实现一个es6的模板字符串

let name = 'zf'
let age = 19
let str = "${name}今年${age}岁了"

str = str.replace(/\$\{(.+?)\}/g,function(){
  return eval(arguments[1])
})
console.log(str)


function render(html, obj){
  return html.replace(/<%=(.+?)>/g,function(){
    return obj[arguments[1]]
  })
}

with(obj){ // 创建一个以当前obj 为 this 指向的作用域
   arr // 相当于this.arr  this为obj
}

/*
实现原理：
new Function 执行脚本
with实现作用域
字符串拼接拿到想要的结果
*/
let fs = require('fs')
let template = fs.readFileSync('./xx','utf8')

let r = render(template,{arr:[1,2,3]})

function render(template,renderObj){
  let head = "let str ='' \r\n with(obj){\r\n str=`"
  template = template.replace(/<%=(.+?)%>/g,function(){
    return '${'+arguments[1]+'}'
  })

  let content = template.replace(/<%(.+?)%>/g,function(){
    return '`\r\n'+arguments[1]+'\r\nstr+=`'
  })
  let tail  = '`\r\n } \r\n return str'
  return new Function('obj',head+content+tail)(renderObj)
}

// new Function(arg1,arg2) arg1:形参 arg2：里面的内容