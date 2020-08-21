/*
 * @Author: shouxie
 * @Date: 2020-08-20 14:59:20
 * @Description: 
 */
// 多语言 手动配置

/*
1.路径不同 返回不同的页面
2. 前端多语言i18n 通过设置不同的json
3. 后端国际化  Accept-Language
*/

const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const whiteList = [ // 白名单
  'node.qpp.cn'
]
const languages = {
  en:{
    message:'hello'
  },
  ja:{
    message:'fghjkk'
  },
  zh:{
    message:'你好，世界'
  }
}
const server = http.createServer((req,res)=>{
 let lans = req.headers['accept-language']
  // zh-CN,zh;q=0.9
  let r = lans.split(',').map(lan => {
    let [name,q] = lan.split(';')
    let obj = {}
    obj.name = name
    if (!q){
      q = 'q=1'
    }
    obj.q = q.split('=')[1]
    return obj
  }).sort((a,b)=>b.q - a.q) // [zh-CN,zh;q=0.9]
  console.log(r)
  for(let i = 0;i<r.length;i++){
    let msg = languages[r[i].name]
    if (msg&&msg.message){
      return res.end(msg.message)
    }
    
  }
  return res.end('not has language')
})
server.listen(3000)
