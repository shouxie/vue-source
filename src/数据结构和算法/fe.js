
function fn(urls,n){
  let index = 0;
  const handle = (i)=> {
    if(i === index) return Promise.resolve();
    try {
      let arr = urls.slice(i,n);
      i += n;
      Promise.race(arr)
    } catch (error) {
      return Promise.reject(error);
    }
  }
  handle(0);
}