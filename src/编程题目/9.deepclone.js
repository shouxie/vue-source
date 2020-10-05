function deepclone(obj){
  if(obj == undefined) return obj
  if(typeof obj !== 'object') return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  let instance = new obj.constructor
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      instance[key] = deepclone(obj[key])
    }
  }
  return instance
}

function deepclone(obj,hash=new WeakMap){
  if(obj == undefined) return obj
  if(typeof obj !== 'object') return obj
  if (obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  let instance = new obj.constructor
  if(hash.has(obj)){
    return hash.get(obj)
  }
  hash.set(obj,instance)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      instance[key] = deepclone(obj[key],hash)
    }
  }
}


function ddepclone(obj,hash=new WeakMap){
  if(obj == undefined) return obj
  if(typeof obj !== 'object') return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  let instance = new obj.constructor
  if(hash.has(obj)){
    return hash.get(obj)
  }
  hash.set(obj,instance)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      instance[key] = deepclone(obj[key],hash)
    }
  }
  return instance
}