#! /usr/bin/env node


/*
在server.js 中 使用的路径是__dirname  路径即src/xxx
应该改为process.cwd()
*/
// 启动服务
let program = require('commander')
let Server = require('../src/server.js.js')



let config = {
  port: {
    descriptor:'set default port',
    options:'-p,--port <val>',
    examples:['ms --port <port>']
  },
  d:{
    descriptor:'change show directory',
    options:'-d,--directory <dirname>',
    examples:['ms --directory <dirname>']
  }
}
Object.entries(config).forEach(([key,value])=>{
  program.option(value.options,value.descriptor)
    
})
program.on('--help',function(){
  let r = Object.values(config).reduce((prev,next)=>{
    return prev.concat(next.examples)
      
  },[])
  console.log('Examples:')
  r.forEach(ex => {
    console.log(' '+ex)
  });

})
let res = program.parse(process.argv)
// console.log(res)
let defaultConfig = {
  port:3000,
  directory:process.cwd(),
  ...res
}
let server = new Server(defaultConfig) // 根据用户输入的内容启动对应的服务
server.start(defaultConfig.port,function(){
  console.log(`server start ${defaultConfig.port}`)
})