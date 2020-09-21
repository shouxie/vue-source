
import {createDom} from '../react-dom'
function createElement(type,config,...children){
  let props = {
    ...config,children
  }
  let ele = {
    type,
    props
  }
  return ele
}
class Component{
  constructor(props){
    this.props = props
    this.isBatchingUpdate = false // 如果false 会立刻更新
    this.updateQueue = [] // 缓存 更新队列
  }
  setState=(partialState)=>{ // 新状态
    this.updateQueue.push(partialState)
    if (this.isBatchingUpdate){
      // 如果是批量更新 什么都不做
    }else{
      // 非批量更新
      this.flushUpdateQueue()
    }

  }
  flushUpdateQueue=()=>{
    // this.state = this.updateQueue.reduce((acc,curr)=>{
    //   if(typeof curr === 'function'){
    //    acc={...acc,...curr(acc)}
    //   }else {
    //     acc={...acc,...curr}
    //   }
      
    //   return acc
    // },this.state)
    while(this.updateQueue.length){
      let item = this.updateQueue.shift()
      if(typeof item === 'function'){
        this.state={...acc,...item(this.state)}
       }else {
        this.state={...acc,...item}
       }
    }
    // 用新的状态去得到新的render结果react元素，通过raect元素生成新的dom节点，替换老得dom节点
    renderComponent(this)
  }
  isReactComponent = true

}

// 组件的实例只有一个
function renderComponent(componentInstance){
  // 有此方法并且返回false
  if(componentInstance.shouldComponentUpdate&&!componentInstance.shouldComponentUpdate()){
    return // 直接返回 不操作 不走更新流程
  }
  // 开始执行更新 走将要更新的流程
    componentInstance.componentWillUpdate&&!componentInstance.componentWillUpdate()
    let renderElement = componentInstance.render() // 得到新的react元素
    let newDom =  createDom(renderElement.type,renderElement.props,componentInstance) // 得到新的真实的dom元素
    // 用新生成的dom节点 替换老得dom节点 toooo
    componentInstance.dom.parentNode.replaceChild(newDom,componentInstance.dom)
    componentInstance.dom = newDom
    // 组件更新完成
    componentInstance.componentDidUpdate&&!componentInstance.componentDidUpdate()
  
  
}

export default {
  createElement,
  Component
}