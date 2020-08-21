/*
 * @Author: shouxie
 * @Date: 2020-08-20 16:15:12
 * @Description: 
 */
const http = require('http')
http.createServer(function(req,res){
    res.end('4000')
}).listen(4000)