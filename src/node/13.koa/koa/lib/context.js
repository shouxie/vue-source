let proto = {

}

module.exports = proto
function defineGetter(target,property){
  proto.__defineGetter__(property,function(){
    // 这里的this指代的不是proto 而是用户调用获取url时那个代理对象context
    return this[target][property]
  })
}
function defineSetter(target,property){
  proto.__defineSetter__(property,function(value){
    this[target][property] = value
  })
}

defineGetter('request','url')
defineGetter('request','path')
defineGetter('response','body')
defineSetter('response','body')
/*
let obj = {
  a:{
    b:1
  }
}
// obj.b=1
obj.__defineGetter__('b',function(){
  return obj.a.b
})
console.log(obj.b)

*/