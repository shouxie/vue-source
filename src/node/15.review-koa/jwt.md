
session 可以存放敏感数据 ssr redis 数据库中
JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案

解决问题：

session不支持分布式架构，无法支持横向扩展。只能通过数据库来保存会话数据实现共享，
如果持久层失败会出现认证失败

优点：服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展

## JWT 包含了使用，分隔的三部分

- header

```
{"typ":"JWT","alg":"HS256"}
```

- Payload

```
WT 规定了7个官方字段 用户自己的信息
iss（issuer）：签发人
exp(expiration time)：过期时间
sub（subject）：主题
aud（audience）： 受众
nbf（not before）： 生效时间
iat（issued at）：签发时间
jti（JWT ID）： 编号
```

- Signature 签名
  
  对前两部分的签名，防止数据篡改


JWT作为一个令牌（token），有些场合可能会放到URL（比如api.example.com/?token=xxx）。base64有三个字符 + / = 在url里面有特殊含义，所以要被替换掉：= 被忽略，+ 替换成 -， / 替换成 _,这就是base64URL算法