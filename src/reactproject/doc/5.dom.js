import React,{Component} from 'react'
import ReactDom from 'react-dom'
function fn(){
  alert(1)
}
let ele = React.createElement('h1',
{
  style:{color:'red',backgrondColor:'green'},
  onClick:fn
},
'hello',React.createElement(
  'span',
  null,
  'world'
  )
)



function Welcome(props){
  return React.createElement('h1',
  {
    style:{color:'red',backgrondColor:'green'},
    onClick:fn
  },
  'hello',React.createElement(
    'span',
    null,
    'world'
    )
  )
}
let ele = React.createElement('h1')
// 第一个参数 组件 第二个是props
let ele2 = React.createElement(Welcome,{
  title:'sdf'
})

class Welcome extends Component {
  render(){
    return React.createElement('h1',
    {
      style:{color:'red',backgrondColor:'green'},
      onClick:fn
    },
    'hello',React.createElement(
      'span',
      null,
      'world'
      )
    )
  }
}

// jsx语法
ReactDom.render(<Panel title="hsd"/>,document.getElementById('root'))
