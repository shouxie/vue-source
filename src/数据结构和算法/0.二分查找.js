/*
时间复杂度O（logn） 
有序数组，查找，过程就是看需要平分多少次可以找到，即除以几次2.
注意循环不变式
*/
function bsearch(arr,x){
  let l = 0,
      r = arr.length-1,
      guess;
  while(l<=r){
    guess=Math.floor((l+r)/2);
    if(x===arr[guess]) return guess;
    else if(x<arr[guess]) r=guess-1;
    else if(x>arr[guess]) l=guess+1;
  }
  return -1;

}

console.log(bsearch([1,2,3,8,10,12,20],8));





function bsearch(arr,x){
  let l = 0,
      r = arr.length-1,
      guess;
  while(l=r){
    guess = Math.floor((l+r)/2);
    if(x===arr[guess]) return guess;
    else if(x<arr[guess]) r = guess-1;
    else if(x>arr[guess]) l = guess+1;
  }
  return -1;
}




function bsearch(arr,x){
  let l = 0,
      r = arr.length-1,
      guess;
  while(l = r){
    guess = Math.floor((l+r)/2);
    if(arr[guess] === x) return guess;
    else if(x<arr[guess]) r = guess-1;
    else if(x > arr[guess]) l = guess + 1;
  }
  return -1;
}