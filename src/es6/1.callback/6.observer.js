
/*
 * @Author: shouxie
 * @Date: 2020-07-07 14:48:28
 * @Description: 
 */ 
// 要监控我家小宝宝的状态 心情很美丽  -》 不美丽


// 发布订阅 就有了关系
class Subject{
  constructor(name){
    this.name = name
    this.state = '心情很美丽'
    this.arr = []
  }

  attach(o){
    this.arr.push(o)
  }

  setState(newState){
    this.state = newState
    this.arr.forEach(o => o.update(newState))
  }
}
class Observer{
  constructor(name){
    this.name = name
  }

  update(newState){
    console.log(this.name + '收到了最新状态'+newState)
  }
}

let s = new Subject('小宝宝')
let o = new Observer('我')
let o1 = new Observer('我1')
let o2 = new Observer('我2')
s.attach(o)
s.attach(o1)
s.setState('心情不美丽') // vue就是基于的观察者模式，包含发布订阅的




/*
class Subject{
  constructor(name){
    this.name = name
    this.arr = []
    this.state = 'state1'
  }
  attach(o){
    this.arr.push(o)
  }

  setState(newState){
    if(newState !== this.state){
      this.arr.forEach(o => o.update(newState))
    }
  }
}
class Observer{
  constructor(name){
    this.name=name
  }

  update(newState){
    console.log('观察到了'+newState)
  }
}

let s = new Subject('s1')
let o = new Observer('o')
let o1 = new Observer('o1')
s.attach(o)
s.attach(o1)
s.setState('state2')
*/