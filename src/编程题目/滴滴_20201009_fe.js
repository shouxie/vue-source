function getCookie(name){
  if(document.cookie.length){
    let start = document.cookie.indexOf(name+'=');
    if(start !== -1){
      start += name.length+1;
      let end = document.cookie.indexOf(';',start);
      if(end === -1) end = document.cookie.length;
      let val = document.cookie.substring(start,end);
      return unescape(val);
    }
  }
}
// s - 0 
// function time(number){
//   let timer = null;
//   console.log(number);
//   const fn = ()=>{
//     number--;
//     if(number<=0) {
//       number = 0;
//       clearInterval(timer);
//     }
//     console.log(number);
//   }
//   timer = setInterval(fn, 1000);
// }

// time(5)

async function time(number){
  for(let i=number;i>=0;i--){
    console.log(i);
    await delay(1000);
  }
}

function delay(time){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve, time);
  })
}
time(5);

function flatten(arr){
  let res = [];
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res=res.concat(flatten(arr[i]));
    }else{
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(flatten([1,[2,3],[4,[5]]]));



function getCookie(name){
  if(document.cookie.length){
    let start = document.cookie.indexOf(name+'=');
    let end = document.cookie.indexOf(';',start);
    if(end === -1) end = document.cookie.length;
    return unescape(document.cookie.substring(start,end));
  }
}


function delay(time){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve, time);
  })
}

function time(number){
  for(let i=number;i>=0;i--){
    console.log(number);
    delay(1000);
  }
}

function flatten(arr){
  let res = [];
  for(let i =0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res=res.concat(flatten(arr[i]));
    }else{
      res.push(arr[i]);
    }
  }
  return res;

}


