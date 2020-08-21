- 防盗链
- 多语言
- 断点续传
- 虚拟主机


可以使用nginx实现防盗链

虚拟主机：部署到服务器上 ECS  80  a.zf.cn b.zf.cn

80 -> a.zf.cn:3000
   -> b.zf.cn:4000

代理：webpack-proxy  翻墙工具

正向代理：是对服务器无感的，可以做安全验证，比如，内网
反向代理：针对客户端是透明的，可以做缓存，负载均衡

正向就是对服务器无感知 vpn，反向就是对客户端无感知 nginx


断点续传/范围请求： 206 可以做分片下载 分别处理每次请求拿到的结果，最后进行下载

分片下载/上传：把文件分成一段一段的

断点续传： 比如先下载一部分，然后暂停，下次接着下载

curl -v --header Range:bytes=0-3 http:www.baidu.com







## 头

1. 内容类型 
   content-type ：
        application/json

        application/x-www-form-urlencoded
2. ajax 跨域头

    Access-Control-Allow

3. 缓存304 Cache-Control expires last-modified if-modified-since etag if-none-match
4. 压缩 Accept-encoding 
5. 语言 Accept-language
6. referer
7. host
8. 302 location
9. 下载头 附件 Content-Disposition:attachment;filename=xxx
10. 405 方法不允许
11. user-agent