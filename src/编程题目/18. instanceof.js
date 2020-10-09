
/*
instanceof 运算符用于检测
构造函数的 prototype 属性是否出现在
某个实例对象的原型链上。
*/
function instanceof1(left,right){
  let proto = left.__proto__;
  let prototype = right.prototype;
  while(true){
    if(proto===null) return false;
    if(proto==prototype) return true;
    proto = proto.__proto__;
  }
}


// my code
function instanceof1(left,right){
  let proto = left.__proto__;
  let prototype = right.prototype;
  while(true){
    if(proto===null) return false;
    if(proto === prototype) return true;
    proto = proto.__proto__;
  }
}