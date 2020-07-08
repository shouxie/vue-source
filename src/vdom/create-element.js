/*
 * @Author: shouxie
 * @Date: 2020-07-06 16:30:02
 * @Description: 
 */ 
export function vnode(tag,props,key,children,text) {
  return {
    tag, // 表示当前的标签名
    props, // 表示当前标签上的属性
    key, // 唯一标识，用户可能传递
    children,
    text
  }
}