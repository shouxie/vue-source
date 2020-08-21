
const path = require('path')
let {createReadStream} = require('fs')
let mime = require('mime')
const fs = require('fs').promises
module.exports = (root) =>{
  return async (ctx,next)=>{
    let abspath = path.join(root,ctx.path)
    try {
      let statObj = await fs.stat(abspath)
      if(statObj.isDirectory()){
        abspath = path.join(abspath,'index.html')
        await fs.access(abspath)
      }
        ctx.set('Content-Type',mime.getType(abspath)+';charset=utf-8')
        ctx.body = createReadStream(abspath)
    } catch (error) {
      await next()
    }
  }
}