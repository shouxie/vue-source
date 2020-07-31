/*
 * @Author: shouxie
 * @Date: 2020-07-31 15:39:53
 * @Description: 
 */ 
//fs 文件操作

/*
fs.readFile fs.writeFile
fs.createReadStream fs.createwriteStream
fs.appendFile
*/


/*


mkdir 创建目录 目录不能存在，会报错
rmdir 删除目录
rename 重命名
unlink  删除文件
stat 文件的状态 exists 是否存在


目录操作

目录 像树  树的遍历
*/
let fs = require('fs')
// fs.mkdirSync('a/b/c/d')
/*
同步创建目录
function mkdir(dirs){
  dirs = dirs.split('/')
  for(let i =0;i<dirs.length;i++){
    let currentDir = dirs.slice(0,i+1).join('/')
    
    try {
      let statObj = fs.statSync(currentDir) // isFile isDirectory
    } catch (error) { // 没有这个目录才创建
      fs.mkdirSync(currentDir)
    }
   
  }

}
mkdir('e/b/c/d/e')

*/

/*
异步创建目录


function mkdir(dirs,callback){
  dirs = dirs.split('/')
  let index = 0; // 异步方法迭代使用next 替换for循环
  function next(){
    if (dirs.length === index){
      return callback()
    }
    let current = dirs.slice(0,++index).join('/')
    fs.stat(current,function(err,statObj){
      if (!err){ // 没有错误说明文件存在了
        return next()
      } 
      fs.mkdir(current,next)
    })
  }
  next()
}
mkdir('m/x/y/z',function(){
  console.log('创建成功')
})


*/


// 目录不是空的会报错
let path = require('path')
/*
深度遍历：有儿子就不停 的找儿子

先序
中序
后序
*/
/*

fs.rmdir('a')

// 同步删除目录
fs.stat('./a')

// 只能读取儿子级别，结果是数组
fs.readdir('./a')


function rmdirSync(url){
  let statObj = fs.statSync(url)
  if (statObj.isDirectory()){
    let dirs = fs.readdirSync(url)
    dirs = dirs.map(dir =>path.join(url,dir))
    dirs.forEach(dir=>rmdirSync(dir))
    fs.rmdirSync(url)
  } else {
    fs.unlinkSync(url)
  }
}
rmdirSync('e')

*/



// 异步串行删除
/*
function rmdir(url,callback){
  fs.stat(url,function(err,statObj){
    if (statObj.isDirectory()){
      fs.readdir(url,function(err,dirs){
          dirs.map(dir => path.join(url,dir))
          let index = 0;
          function next(){ // 用来迭代异步
            if (dirs.length === index){
              return fs.rmdir(url,callback) // 终止条件
            }
            let dir = dirs[index++] // 获取到第一个路径时需要将其删掉
            rmdir(dir,next)

          }
          next()
      })
    }else{
      fs.unlink(url,callback)
    }
  })
}
rmdir('e',function(){
  console.log('删除成功')
})

*/

// 异步并行 Promise.all原理是一样的
/*
function rmdir(url,callback){
  fs.stat(url,function(err,statObj){
    if (statObj.isDirectory()){
      fs.readdir(url,function(err,dirs){
          dirs.map(dir => path.join(url,dir))
          let index = 0;
          if (dirs.length === 0){
            return fs.rmdir(url,callback)
          }
          function done(){
            if(++index === dirs.length){ // 删除完毕后需要调用done方法 这个时候会去计数 如果当前删除的儿子个数和目录个数相同则将自己删掉
              fs.rmdir(url,callback)
            }
          }
          dirs.forEach(dir =>{
            rmdir(dir,done)
          })
      })
    }else{
      fs.unlink(url,callback)
    }
  })
}
rmdir('e',function(){
  console.log('删除成功')
})

*/
/*
function rmdir(url,callback){
  return new Promise((resolve,reject)=>{
    fs.stat(url,function(err,statObj){
      if (statObj.isFile()){
        fs.unlink(url,resolve)
      }else{
        fs.readdir(url,function(err,dirs){
          dirs = dirs.map(dir => path.join(url,dir))
          Promise.all(dirs.map(dir =>rmdir(dir))).then(()=>{
            fs.rmdir(url,resolve)
          })
        })
      }
    })
  })
}
rmdir('e').then(function(){
  console.log('删除成功')
})

*/
let fs = require('fs').promises
async function rmdir(url){
  let statObj = await fs.stat(url)
  if (statObj.isFile()){
    await fs.unlink(url)
  }else{
    let dirs = await fs.readdir(url)
    dirs = dirs.map(dir => path.join(url,dir))
    await Promise.all(dirs.map(dir =>rmdir(dir)))
    await fs.rmdir(url)
  }
}
rmdir('e').then(function(){
  console.log('删除成功')
})