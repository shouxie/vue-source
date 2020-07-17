/*
 * @Author: shouxie
 * @Date: 2020-07-06 17:06:23
 * @Description: 
 */ 
// 这个文件除了第一次的初始化渲染之外，还要做比对操作
export function render(vnode,container) { // 让虚拟节点 渲染程真实节点
  let el = createElm(vnode)
  container.appendChild(el)
  // 递归创建
}

// 创建真实节点
function createElm(vnode){
  let {tag,children,key,text,props} = vnode;
  if (typeof tag === 'string'){
    // 标签 一个虚拟节点 对应着他的真实节点  主要是做一个映射关系
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children = children.forEach(child => { // child 是虚拟节点
      render(child, vnode.el) // 递归渲染当前孩子列表
    })
  }else {
    // 文本
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
// 更新属性也会调用此方法 oldProps={a:1,style:{fontSize:18px}}
function updateProperties(vnode,oldProps={}) {
  let newProps = vnode.props // 获取当前老节点中的属性
  console.log(newProps)
  let el = vnode.el; // 当前的真实节点

  // 如果下次更新时，应该用新的属性 来更新老的节点
  // 如果老的中有属性，新的中没有
  let oldStyle = oldProps.style || {}
  let newStyle = newProps.style || {}

  // 稍后会用到这个更新操作 主要的作用就是 根据新的虚拟节点 来修改dom元素
  for (let key in oldStyle){
    if (!newStyle[key]){
      el.style[key] = ''
    }
  }

  for (let key in oldProps) {
    if (!newProps[key]){
      delete el[key] // 如果新的中没有这个属性了，那就直接删除掉dom上的这个属性
    }
  }

  // 先考虑一下  以前有没有
  for (let key in newProps){
    
    if (key === 'style'){ // 如果是style需要再次遍历添加
      for (let styleName in newProps.style) {
        // el.style.color = red
        el.style[styleName] = newProps.style[styleName]
      }

    } else if(key === 'class'){ // 给这个元素添加属性， 值就是对应的值
      el.classname = newProps.class
    } else{ // 给这个元素添加属性， 值就是对应的值
      el[key] = newProps[key]
    }
  }
}


export function patch(oldVnode, newVnode){
  console.log(oldVnode, newVnode)
  // 1） 先比对 标签 一样不一样
  if (oldVnode.tag !== newVnode.tag){ // 以前是div 现在是p
    // 必须拿到当前元素的父亲 才能替换掉自己
    oldVnode.el.parentNode.replaceChild(createElm(newVnode),oldVnode.el)
  }

  // 2) 比较文本   标签一样 可能都是undefined
  if(!oldVnode.tag){ // 如果内容不一致 直接根据当前新的元素中的内容老替换到文本节点
    if(oldVnode.text !== newVnode.text){
      oldVnode.el.textContent = newVnode.text
    }
  }

  // 3） 标签一样 可能属性不一样
  let el = newVnode.el = oldVnode.el; // 标签一样 复用即可
  updateProperties(newVnode,oldVnode.props) // 做属性的比对


  // 比较孩子
  let oldChildren = oldVnode.children || []
  let newChildren = newVnode.children || []
  // 老的有孩子 新的有孩子 updateChildren
  if(oldChildren.length>0&&newChildren.length>0){
    updateChildren(el,oldChildren,newChildren)
  } else if(oldChildren.length>0){// 老的有孩子 新的没孩子
    el.innerHTML = ''
  }else if(newChildren.length>0){// 老的没孩子 新的有孩子
    for(let i=0;i<newChildren.length;i++){
      let child = newChildren[i]
      el.appendChild(createElm(child)) // 将当前新的儿子 丢到老的节点中即可
    }
  }
  
  
}


function updateChildren(parent,oldChildren,newChildren){
// vue 增加了很多优化策略 因为在浏览器中操作dom最常见的方法是开头或者结尾插入
// 涉及到正序和倒序
  let oldStartIndex = 0; // 老的索引开始
  let oldStartVnode = oldChildren[0] // 老的节点开始
  let oldEndIndex = oldChildren.length -1; // 老的结尾
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0; // 老的索引开始
  let newStartVnode = newChildren[0] // 老的节点开始
  let newEndIndex = newChildren.length -1; // 老的结尾
  let newEndVnode = newChildren[newEndIndex]


  while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
    if (isSameVNode(oldStartVnode,newStartVnode)){// 先看前面是否一样
      patch(oldStartVnode,newStartVnode) // 用新的属性来更新老的属性
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if(isSameVNode(oldEndVnode,newEndVnode)){// 从后面看是否一样
      patch(oldEndVnode,newEndVnode) 
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndVnode]
    } else if (isSameVNode(oldStartVnode,newEndVnode)){
      patch(oldStartVnode,newEndVnode) 
      parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode=newChildren[--newEndIndex]
    } else if (isSameVNode(oldEndVnode,newStartVnode)){//老的尾巴和新的头比，将老的尾巴移动到老的头的前面
      patch(oldEndVnode,newStartVnode) 
      parent.insertBefore(oldEndVnode.el,oldStartVnode.el.nextSibling)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode=newChildren[++newStartIndex]
    }
    // 倒序和正序
  }
  if (newStartIndex <= newEndIndex){ // 如果到最后还剩余，需要将剩余到插入
    for(let i = newStartIndex;i<newEndIndex;i++){
      // 要插入的元素
      let ele = newChildren[newEndIndex+1] == null ? null : newChildren[newEndIndex+1].el
      // 可能是往前面插入，也有可能是往后面插入
      //insertBefore （插入到元素，null） == appendChild
      // parent.appendChild(createElm(newChildren[i]))
      parent.insertBefore(createElm(newChildren[i]),ele)
    }
    
  }
}

function isSameVNode(oldVnode, newVnode){
  // 如果两个人的标签和key一样 我认为 是同一个节点 虚拟节点一样 我就可以复用真实节点了
  return (oldVnode.tag === newVnode.tag) && (oldVnode.key===newVnode.key)
}
