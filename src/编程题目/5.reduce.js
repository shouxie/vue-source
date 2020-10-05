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