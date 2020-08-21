/*
 * @Author: shouxie
 * @Date: 2020-08-19 12:33:43
 * @Description: ()
 */
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

let data =fs.readFileSync(path.join(__dirname,'1.txt'))

zlib.gzip(data,function(err,data){
    fs.writeFileSync('1.txt.gz',data)
}) // xxx.gz

// 根据文件内容压缩 重复内容越多压缩率越高


let data1 = fs.readFileSync('./1.txt.gz')
zlib.unzip(data1,function(err,data){
  fs.writeFileSync(path.resolve(__dirname,'1test.txt'),data)
})


// 流
fs.createReadStream('1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('2.txt.gz'))