/*
 * @Author: shouxie
 * @Date: 2020-08-20 16:15:08
 * @Description: 
 */
const http = require('http')
http.createServer(function(req,res){
    res.end('3000')
}).listen(3000)