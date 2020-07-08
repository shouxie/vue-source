
// let app = document.getElementById('app')
// 节约性能，先把真实节点，用一个对象表示出来，再通过对象渲染到页面上
// 前端操作dom的时候，如排序，反序，删除，
// diff 新的节点 再生成一个对象
// vue 代码基本上不用手动操作dom

// 虚拟dom 只是一个对象
// vue template render函数  
/*
{
  tag: 'div',
  props:{},
  children:[{
    tag:undefined,
    props: undefined,
    children: undefined,
    text:'hello'
  }]
<div>hello</div>
}

new Vue({
  el:'#app',
  render(h){
    return h('div',{},'hello')
  }
})
for(let key in app){
  console.log(key);
}*/
import {h,render,patch} from './vdom'
// 将虚拟节点渲染到页面上
//<div id='container'><span style='color:red'>hello</span>aa</div>
let oldVnode = h('ul',{},
  h('li',{style:{color:'red'},key:'a'},'a'),
  h('li',{style:{color:'yellow'},key:'b'},'b'),
  h('li',{style:{color:'pink'},key:'c'},'c'),
  h('li',{style:{color:'blue'},key:'d'},'d'),
)

// patchVnode 用新的虚拟节点 和老的虚拟节点做对比 更新真实dom元素

let container = document.getElementById('app')
render(oldVnode,container)


let newVnode = h('ul',{},
  h('li',{style:{color:'red'},key:'a'},'a'),
  h('li',{style:{color:'yellow'},key:'b'},'b'),
  h('li',{style:{color:'pink'},key:'c'},'c'),
  h('li',{style:{color:'blue'},key:'d'},'d'),
  h('li',{style:{color:'blue'},key:'e'},'e'),
)



setTimeout(() => {
  patch(oldVnode,newVnode)
},1000)