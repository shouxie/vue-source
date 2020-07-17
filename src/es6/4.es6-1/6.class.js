/*
 * @Author: shouxie
 * @Date: 2020-07-16 17:14:39
 * @Description: 
 */ 

 /*
 
 js 
 */
function Animal(){
  console.log(new.target)  // 可以看出是谁new 的
  if (new.target === Animal){
    throw new Error('这是一个抽象类')
  }
}


/*
类中的属性 实例属性 公有属性
__proto__ 每个人都有 prototype只有类才有

Animal.prototype === animal.__proto__
animal.__proto__.constructor === Animal
Animal.__proto__ = Function.prototype
Animal.prototype.__proto__ = Object.prototype
Object.prototype.__proto__ = null
Function.prototype.__proto__ == Object.prototype
*/

Object.setPrototypeOf(Tiger.prototype,Animal.prototype)
//等价于 Tiger.prototype.__proto__ = Animal.prototype

function create(parentPrototype){
  function Fn(){}
  Fn.prototype = parentPrototype
  return new Fn()
}

Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}})

/*
继承实例属性 call
继承公有属性 Object.create   Tiger.prototype.__proto__ = Animal.prototype
*/


/*
es6 不支持静态属性 支持静态方法 static 静态方法也是可以被继承的

get a (){return 100} === 类.prototype.a
static get a (){return 100} === 类.a
*/
class Animal{
  constructor(){
    super() // 父类.call(this)
  }

  eat(){ // 这里的super指的父类的prototype
    super.eat()
  }
}