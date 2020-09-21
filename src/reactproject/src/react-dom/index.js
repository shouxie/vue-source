
/*
element 要渲染的元素
parent 真实的dom元素
*/
function render(element,parent,componentInstance){
  if(typeof element === 'string' || typeof element === 'number') return parent.appendChild()
  let type=element.type,props=element.props
  // 如果isReactComponent为true说明当前要渲染的是一个类组件
  let isReactComponent = type.isReactComponent
  if (isReactComponent){ // 此处是一个类组件
    componentInstance = new type(props) // 设置props state
    // componentWillMount组件将要挂载
    componentInstance.componentWillMount && componentInstance.componentWillMount()
    // 调用组件实例到render方法得到react元素
    element = componentInstance.render()
    type = element.type
    props = element.props
  } else if (typeof type === 'function'){
    element=type(props)
    type = element.type
    props = element.props
  }
  
 // 把react元素转化成真实的dom节点
  let dom = createDom(type,props,componentInstance)
  if (isReactComponent){//如果当前渲染的是一个类组件的话，让类组件的dom属性指向这个类组件渲染出来的真实dom节点
    componentInstance.dom = dom
  }
  parent.appendChild(dom)
  // 当把此虚拟节点转成真实节点并且添加到父节点中之后，挂载完成了
  if (isReactComponent){
    componentInstance.componentDidMount && componentInstance.componentDidMount()
  }

}


class SyntheticEvent{
  constructor(){
    this.events = {}
    this.syntheticEvent = {}
  }
  on=(type,dom,handler,componentInstance)=>{
    let listeners = this.events[type]
    if(listeners){
      listeners.push({dom,handler,componentInstance})
    }else {
      this.events[type] = [{dom,handler,componentInstance}]
    }
  }
  trigger=(type,event)=>{
    let listeners = this.events[type]
    listeners.forEach(item =>{
      if(item.dom===event.target){
        // 在事件处理函数执行前把isBatchingUpdate=true
        if(item.componentInstance){
          item.componentInstance.isBatchingUpdate=true
        }
        this.syntheticEvent.target = event.target
        this.syntheticEvent.clientX = event.clientX
        item.handler(this.syntheticEvent)
        this.syntheticEvent = {}
        if(item.componentInstance){
          item.componentInstance.isBatchingUpdate=false
          item.componentInstance.flushUpdateQueue()
        }
      }
    })
  }
}
let syntheticEvent = new SyntheticEvent()
// document.onclick = syntheticEvent.trigger.bind(null,'onclick')
document.addEventListener('click',event=>syntheticEvent.trigger('onclick',event))
export function createDom(type,props,componentInstance){
  let currentDom = document.createElement(type)
  for(let propName in props){
    if (propName === 'children'){
      let children = props.children
      children.forEach(child => render(child,currentDom,componentInstance));
    } else if(propName === 'style'){
      let styleObj = props.style
      for(let attr in styleObj){
        currentDom.style[attr] = styleObj[attr]
      }
    }  else if(propName === 'classname'){
      currentDom.classname = props.classname
    } else if(propName.startsWith('on')){
      syntheticEvent.on(propName.toLowerCase(),currentDom,props[propName],componentInstance)
      // currentDom[propName.toLowerCase()] = props[propName]
    } else{
      currentDom.setAttribute(propName,props[propName])
    }
  }
  return currentDom
}

export default {
  render
}