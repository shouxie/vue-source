const getVal =(obj,path)=>{
  
  let paths = path.split('.');
  let val = paths.reduce((prev,next)=>{
    console.log(prev,next)
    return prev[next];
  },obj);
  return val;
}


let obj = {
  a:{
    b:{
      cc:{
        d:1
      }
    }
  },
  b:{
    test:'test'
  }
}
console.log(getVal(obj,'a.b.c.xx'));