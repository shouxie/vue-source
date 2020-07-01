/*
 * @Author: shouxie
 * @Date: 2020-06-30 18:00:11
 * @Description: 
 */ 

// ?: 匹配不捕获 不捕获当前的分组
// + 至少一个
// ？ 尽可能少匹配
// 源码里的模板编译也是基于正则的
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
  getValue(vm, expr) { // school.name
    let keys = expr.split('.');
    return keys.reduce((memo,current) => {
      memo = memo[current] // memo = vm.school
      return memo
    },vm)
  },
  compilerText(node,vm) { // 编译文本，替换{{ xxx }}
    node.textContent = node.textContent.replace(defaultRE, function(...args){
      console.log(args[1]);
      return util.getValue(vm,args[1])
    })
  }
}

export function compiler(node, vm) {
  // node 文档碎片
  let childNodes = node.childNodes; // 只有第一层
  // 将类数组转化程数组
  [...childNodes].forEach(child => { // 元素或者文本
    if (child.nodeType == 1) { // 1 元素 3 文本
      compiler(child, vm)
    } else if (child.nodeType == 3) {
      util.compilerText(child,vm) // 编译当前元素的子节点
    }
  })
}