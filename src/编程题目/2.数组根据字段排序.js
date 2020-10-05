const sortBy = (arr,key) =>{
  arr.sort((a,b)=>{
    if(a[key]>b[key]){
      return 1
    }else if(a[key]===b[key]){
      return 0
    }else if(a[key]<b[key]){
      return -1
    }
  })
}