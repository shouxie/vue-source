const http = require('http')
const querystring = require('querystring')
// 服务器 需要一个名字 作为cookie的名字
const uuid = require('uuid')
let cardName = `connect.sid`
let session = {} // sesssion 就是一个普通对象
http.createServer(function(req,res){
  if(req.url === '/visit'){
    let cookieObj = querystring.parse(req.headers.cookie,'; ','=')
    // cookie 对象 用户的所有cookie
    let cardId = cookieObj[cardName]
    if(cardId && session[cardId]){ // 有卡 并且当前也能查找到记录
      session[cardId].money -= 10
      res.end('money '+session[cardId].money)
    } else {
      let cardId = uuid.v4() // 产生一个唯一的当前的卡号
      // cardId 应该签名 防止客户端窜改
      res.setHeader(`Set-Cookie`,`${cardName}=${cardId}`)
      session[cardId] = {money:500}
      res.end('money 500')
    }
  }else{
    res.end('not found')
  }

}).listen(3000)

// 如果浏览器不支持cookie 以前的做法是隐藏表单