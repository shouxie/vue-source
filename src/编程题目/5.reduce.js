Array.prototype.reduce1=function(callback,initValue){
  if(!Array.isArray(this)||!this.length||typeof callback !== 'function'){
    return [];
  }
  let hasInit = initValue !== undefined;
  let value = hasInit ? initValue:this[0];
  for(let i = hasInit?0:1;i<this.length;i++){
    value = callback(value,this[i],i,this);
  }
  return value;
}


// let test = [12,3,4].reduce1((prev,next)=>{
//   return prev+next
// },1)
// console.log(test)

Array.prototype.reduce=function(callback,initValue){
  if(!this.length||!Array.isArray(this)||typeof callback !== 'function'){
    return [];
  }
  let hasInit = initValue !== undefined;
  let value = hasInit?initValue:this[0];
  for(let i = hasInit?0:1;i<this.length;i++){
    value = callback(value,this[i],i,this);
  }
  return value;
}


// mycode
Array.prototype.reduce=function(callback,initVal){
  if(typeof this == undefined || !this.length || typeof callback!=='function'){
    return [];
  }

  let arr = this;
  let hasInit = initVal !== undefined;
  let value = hasInit?initVal:arr[0];
  for(let i=hasInit?0:1;i<arr.length;i++){
    value = callback(value,arr[i],i,arr);
  }
  return value;
}





Array.prototype.reduce=function(fn,initVal){
  if(typeof fn !== 'function' || !Array.isArray(this)){
    return [];
  }
  let hasinit = initVal !== undefined;
  let value = hasinit?initVal:this[0];
  for(let i=hasinit?0:1;i<this.length;i++){
    value = fn(value,this[i],i,this);
  }
  return value;
}




Array.prototype.reduce=function(callback,initVal){
  if(typeof callback !== 'function' || !this.length || Array.isArray(this)){
    return [];
  }
  let hasInit = initVal !== undefined;
  let value = hasInit ? initVal:this[0]; 
  for(let i = hasInit ? 0:1;i<this.length;i++){
    value = callback(value,this[i],i,this);
  }
  return value;
}