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