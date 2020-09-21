import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'
/*
想在整个组件树中传递数据，但却不想手动在每一层传递属性，
你可以直接在react中使用context 解决
一个典型的react应用中，数据是通过props属性自上而下（由父传子）进行传递的，
但这种做法对于某些类型的属性而言是及其繁琐，
这些属性是应用程序中许多组件都需要的，context提供了
一种在组件之间共享此类值的方式，而不是显式的通过组件树的逐层传递props


什么时候会用到context
1. 每个组件都需要
2. 使用此状态的组件离提供状态的组件隔太远
**/

function createContext(defaultValue){
  let contextvalue = defaultValue
  class Provider extends Component{
    constructor(props){
      super(props)
      contextvalue = props.value
      this.state = {}
    }
    static getDerivedStateFromProps(nextProps,prevState){
      contextvalue = nextProps.value
      return {}
    }
    render(){
      return this.props.children
    }
  }
  class Consumer extends Component{
    render(){
      return this.props.children(contextvalue)
    }
  }
  return {
    Provider,
    Consumer
  }
}
/*
function createContext(defaultValue){
  let contextvalue = defaultValue
  class Provider extends Component{
    render(){
      contextvalue=this.props.value
      return this.props.children
    }
  }
  class Consumer extends Component{
    render(){
      return this.props.children(contextvalue)
    }
  }
  return {
    Provider,
    Consumer
  }
}
*/
let ThemeContext = React.createContext(null)
class Page extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'red'
    }

  }
  changeColor=(color)=>{
    this.setState({color})
  }

  render(){
    let contextValue = {
      color:this.state.color,
      changeColor:this.changeColor
    }
    return (
      <ThemeContext.Provider value={contextValue}>
      <div style={{margin:'10px',border:`5px solid ${this.state.color}`,padding:5,width:200}}>
        <Header/>
        <Main/>
      </div>
      </ThemeContext.Provider>
    )
  }
}
class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'red'
    }

  }

  render(){
    return (
      <ThemeContext.Consumer>
        {
          (value)=>(
            <div style={{border:`5px solid ${value.color}`,padding:5}}>
                Header
                <Title/>
            </div>
          )
        }
      
      </ThemeContext.Consumer>
    )
  }
}
class Title extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'red'
    }

  }
  changeColor=(color)=>{
    this.setState({color})
  }

  render(){
    return (
      <ThemeContext.Consumer>
        {
          (value)=>(
            <div style={{border:`5px solid ${value.color}`,padding:5}}>
                Header
                <Title/>
            </div>
          )
        }
      
      </ThemeContext.Consumer>
    )
  }
}
class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'red'
    }

  }
  changeColor=(color)=>{
    this.setState({color})
  }

  render(){
    return (
      <ThemeContext.Consumer>
        {
          (value)=>(
            <div style={{border:`5px solid ${value.color}`,padding:5}}>
                Header
                <Content/>
            </div>
          )
        }
      
      </ThemeContext.Consumer>
    )
  }
}
class Content extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'red'
    }

  }
  changeColor=(color)=>{
    this.setState({color})
  }

  render(){
    return (
      <ThemeContext.Consumer>
        {
          (value)=>(
            <div style={{border:`5px solid ${value.color}`,padding:5}}>
                Header
                <button onClick={()=>value.changeColor('red')}>变红</button>
                <button onClick={()=>value.changeColor('green')}>变绿</button>
            </div>
          )
        }
      
      </ThemeContext.Consumer>
    )
  }
}
ReactDom.render(<Page/>,document.getElementById('root'))
