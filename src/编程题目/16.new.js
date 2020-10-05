/*
1.创建一个空的简单 JavaScript 对象（即{}）；
2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
3.将步骤1新创建的对象作为 this 的上下文 ；
4.如果该函数没有返回对象，则返回 this
function new(func) {
	let target = {};
	target.__proto__ = func.prototype;
	let res = func.call(target);
	if (typeof(res) == "object" || typeof(res) == "function") {
		return res;
	}
	return target;
}
*/


function new1(func){
  let obj = {};
  obj.__proto__=func.prototype;
  let res = func.call(obj);
  return typeof res === 'object'||typeof res === 'function' ? res : obj;
}