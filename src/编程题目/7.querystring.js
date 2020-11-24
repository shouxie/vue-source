/*
a=1&b=2
a&b&c
a[name]=fox&a[company]=tecent&b=why
color=Deep%20Blue
a[0]=1&a[1]=2
*/
// ['a=1','b=2']
/*function parse(str){
  return str.split('&').reduce((prev,next)=>{
    let [key,value]=next.split('=');
    // prev[key]=value;
    deep_set(prev,key.split(/[\[\]]/g).filter(x=>x),value);
    return prev;
  },{})
}

function deep_set(obj,path,value){
  console.log(obj,path,value,'======')
  let i=0;
  for(;i<path.length-1;i++){
    if(obj[path[i]]===undefined){
      if(path[i+1].match(/^\d+$/)){
        obj[path[i]]=[]
      }else{
        obj[path[i]]={}
      }
    }
    obj=obj[path[i]];
  }
  obj[path[i]]=decodeURLComponent(value);
}
*/


function parse(str){
  let obj = str.split('&').reduce((prev,cur)=>{
    let [key,value]=cur.split('=');
    // key  a[name]
    let k = key.split(/[\[\]]/g).filter(x=>x)
    handle(prev,k,value)
    // prev[key]=value;
    return prev;
  },{})
  return obj;
}
function handle(obj,key,value){
  let i =0;
  for(;i<key.length-1;i++){
    if(obj[key[i]]===undefined){
      if(key[i+1].match(/^\d+$/)){
        obj[key[i]]=[];
      }else{
        obj[key[i]]={};
      }
    }
    obj=obj[key[i]];
  }
  obj[key[i]]=decodeURIComponent(value)
}
// console.log(parse('a[0]=1&a[1]=2&c[name]=fox&c[company]=tecent&b=why'))

// console.log('a[0]=1&a[1]=2&c[name]=fox&c[company]=tecent&b=why'.split(/[\[\]]/g))



//'a[0]=1&a[1]=2&c[name]=fox&c[company]=tecent&b=why'
// function querystring(str){
//   let obj = str.split('&').reduce((pre,cur)=>{
//     let [name,value]=cur.split('=');
//     pre[name]=value;
//     let k = name.split(/[\[\]]/).filter(x=>x);
//     fn(prev,k,value);
//     return prev;
//   },{});
//   return obj;
// }
// // 'a[0]=1&a[1]=2' => a:[1,2]
// function fn(obj,key,value){
//   let i=0;
//   for(;i<key.length-1;i++){
//     if(obj[key[i]]===undefined){
//       if(key[i].match(/^\d+$/)){
//         obj[key[i]]=[];
//       }else{
//         obj[key[i]]={};
//       }
//     }
//     obj=obj[key[i]];
//   }
//   obj[key[i]]=encodeURIComponent(value);

// }





function parse1(str){
  let obj = str.split('&').reduce((pre,cur)=>{
      let [key,value]=cur.split('=');
      // pre[key]=value;
      let k = key.split(/[\[\]]/).filter(x=>x);
      handle1(pre,k,value);
      return pre;
  },{});
  return obj;
}
function handle1(obj,k,value){
  let i =0;
  for(;i<k.length-1;i++){
    if(obj[k[i]]===undefined){
      if(k[i+1].match(/^\d+$/)){
        obj[k[i]]=[];
      }else{
        obj[k[i]]={};
      }
    }
    obj = obj[k[i]];
    console.log('122obj',obj);
  }
  
  obj[k[i]]=encodeURIComponent(value);
}

console.log(parse1('a[0]=1&a[1]=2&c[name]=fox&c[company]=tecent&b=why'))



function parse(str){
  return str.split('&').reduce((prev,cur)=>{
    let [key,value]=cur.split('=');
    // prev[key]=value;
    let k = key.split(/[\[\]]/).filter(x=>x);
    handle(prev,k,value);
    return prev;
  },{});
}
function handle(obj,key,value){
  let i=0;
  for(;i<key.length;i++){
    if(obj[key]===undefined){
      if(obj[key[i+1]].match(/^\d+$/)){
        obj[key[i]]=[];
      }else{
        obj[key[i]]={};
      }
    }
    obj = obj[key[i]];
  }
  obj[key[i]]=encodeURIComponent(value);
}


















const handle = (obj,key,value) =>{
  let i =0;
  for(;i<key.length;i++){
    if(obj[key[i+1]] === undefined){
      if(key[i+1].match(/^\d+$/)){
        obj[key[i]] = [];
      }else{
        obj[key[i]] = {};
      }
    }
    obj = obj[key[i]];
  }
  obj[key[i]] = encodeURIComponent(value);
};
const parse = (str) =>{
  return str.split('&').reduce((prev,cur)=>{
    let [key,value] = cur.split('=');
    // prev[key]=value;
    let k = key.split(/[\[\]]/).filter(x=>x);
    handle(prev,k,value);
    return prev;
  },{});
};




const handle = (obj,key,value) =>{
  let i =0;
  for(;i<key.length;i++){
    if(key[i+1].match(/^\d+$/)){
      obj[key[i]] = [];
    }else{
      obj[key[i]] = {};
    }
    obj = obj[obj[i]];
  }
  obj[key[i]] = encodeURIComponent(value);
}