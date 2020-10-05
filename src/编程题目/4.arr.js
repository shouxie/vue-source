// 乱序

const order =(arr)=>{
  // console.log(arr)
  arr.sort((a,b)=>{
    let random = (Math.random()>0.5)?1:-1;
    return random;
  });
  return arr
};

let a = [1,2,3,4,5,6,7,8,9,0,12,23,45,90];
console.log(order(a))
