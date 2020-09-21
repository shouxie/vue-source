import React,{Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

/*
无论使用函数还是类声明组件 都不能修改它的props
函数组件就是一个纯函数 1.相同的输入会产生相同的输出 2.不能有副作用 side effect

props 的类型检查 

*/
function Panel(props){
  return <div>{props.title}</div>
}


class Person extends Component{
  //  规定props传递的类型
  static PropTypes = {
    name:PropTypes.string.isRequired, // 字符串，必填
    gender:PropTypes.oneOf(['female','male']), // 枚举
    hobbies:PropTypes.arrayof(PropTypes.string), // 字符串数组
    position: PropTypes.shape({
      x:PropTypes.number,
      y:PropTypes.number
    }),
    age(props,propName,componentName){
      let age = props.age
      if(age < 0 || age > 120){
        return new error(`invaild prop ${propName} supplied to ${componentName}` )
      }
    }
  }
  render(){
    let {name,gender,hobbies,position} = this.props
    return <div>
      
      <p>name:{name}</p>
      <p>gender:{gender}</p>
      <p>hobbies:{hobbies}</p>
      <p>position:{JSON.stringify(position)}</p>
    </div>
  }
}
// jsx语法
ReactDom.render(<Panel title="hsd"/>,document.getElementById('root'))
