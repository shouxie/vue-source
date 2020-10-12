// 这种方法 经过测试表明某个元素在某个位置的概念不等于1/length
function mixArr(arr){
  return arr.sort(()=>Math.random()-0.5)
}

function shuffle(arr){
  let m = arr.length;
  while(m>1){
      let index = parseInt(Math.random()*m--);
      console.log(m,index);
      [arr[index],arr[m]] = [arr[m],arr[index]]
  }
  return arr;
}


console.log(shuffle([1,2,3,4]))


function shuffle1(arr){
  return arr.sort(()=>Math.random()-0.5)
}


function shuffle(arr){
  let l = arr.length;
  while(l){
    let m = Math.floor(Math.random()*m--);
    [arr[m],arr[l]]=[arr[l],arr[m]];
  }
  return arr;
}



function shuffle(arr){
  let m = arr.length;
  while(m>1){
      let index = parseInt(Math.random()*m--);
      console.log(m,index);
      [arr[index],arr[m]] = [arr[m],arr[index]]
  }
  return arr;
}
console.log(shuffle([1,2,3,4]))



function shuffle(arr){
  let m = arr.length;
  while(m>1){
    let i = Math.floor(Math.random()*m--);
    [arr[i],arr[m]]=[arr[m],arr[i]];
  }
  return arr;
}



function shuffle(arr){
  let l = arr.length;
  while(l>1){
    let m = Math.floor(Math.random()*l--);
    [arr[m],arr[l]] = [arr[l--],arr[m]];
  }
  return arr;
}




