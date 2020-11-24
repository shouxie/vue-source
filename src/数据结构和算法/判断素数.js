function is_prime(n){
  if(n<=1) return false;
  const N = Math.floor(Math.sqrt(n));
  let is_prime = true;
  for(let i=2;i<=N;i++){
    if(n%i===0){
      is_prime=false;
      break;
    }
  }
  return is_prime;
}