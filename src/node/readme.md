<!--
 * @Author: shouxie
 * @Date: 2020-07-17 17:07:29
 * @Description: 
--> 
node runtime 可以把js 运行在服务端

js 组成部分：DOM不支持 BOM不支持 ECMAscript （es6 模块不支持）

浏览器中不能读写文件 不能控制系统文件，node 扩展 libuv ：fs http。。。


所以： ECMAscript + libuv


node单线程：异步  适合高并发  I/O 密集

java多线程： 内存 线程池   适合cpu密集型 大量计算，压缩 合并

             需要锁  多进程 并发 切换上下文很快

阻塞  非阻塞 异步  同步

node ： 非阻塞异步

调用方：阻塞  非阻塞 是否等待
被调用方：异步  同步