import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'

function hoistNonReactStatics(targetComponent,sourceComponent){
  let methods = Object.getOwnPropertyNames(sourceComponent)
  methods.forEach(method=>{
    // if(){} 过滤掉不能赋值的属性
    let descriptor = Object.getOwnPropertyDescriptor(sourceComponent,method)
    Object.defineProperty(targetComponent,method,descriptor)
  })
}

/*
高阶组件：组件可以作为方法的参数和返回值
高阶函数：函数可以作为方法的参数和返回值
*/
// logger可以返回新组件，计算渲染的时间
const logger = (OldComponent) =>{
  // 子类继承父类  就可以继承父类的静态方法，或者hoist-non-react-statics(target,source)
  return class extends OldComponent{
  // return class extends Component{
    constructor(){
      super()
      console.time('cost')
    }
    componentDidMount(){
      console.timeEnd('cost')
    }
    render(){
      return <OldComponent ref={this.props.myref} {...this.props}/>
    }
  }
}
class App extends Component{
 

  render(){
    return (
      <div>
       <h1>hello</h1>
      </div>
    )
  }
}
let WrappedApp = logger(App)

class Main extends Component{
  constructor(props){
    super(props)
    this.appRef = React.createRef()
  }

  render(){
    return (
      <div>
        <WrappedApp myref={this.appRef}  />
      </div>
    )
  }
}
// ref 和key 。不能通过this.props.ref 取值
ReactDom.render(<Main/>,document.getElementById('root'))
