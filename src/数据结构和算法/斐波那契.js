// 0 1 1 2 3 5 8...
function feb(n){
  let arr = new Array(n).fill(0),num;
  console.log(arr)
  for(let i=0;i<arr.length;i++){
    if(i<2) {
      arr[i]=i;
    }else{
      arr[i] = arr[i-1]+arr[i-2];
    }
    num = arr[i];
    console.log(arr[i])
  }
  return arr[n-1];
}
console.log(feb(6))