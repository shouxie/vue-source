/*
 * @Author: shouxie
 * @Date: 2020-07-06 16:28:49
 * @Description: 
 */ 
import {vnode} from './create-element'
export default function h(tag,props,...children){
  let key = props.key
  delete props.key // 属性中不包含key属性
  children = children.map(child => {
    if (typeof child === 'object'){
      return child
    }else {
      return vnode(undefined,undefined,undefined,undefined,child)
    }
  })
  return vnode(tag,props,key,children)
  
}
