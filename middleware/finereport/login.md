# 会话机制

此处讨论帆软单台服务器会话机制，多服务器会话机制暂未研究。

## 会话管理

帆软使用cookie来管理会话，cookie名为fine_auth_token，值为token字符串。fine_auth_token只会被生成该token的服务器识别，其他帆软服务器无法识别，类似tomcat里的JSESSIONID。

## 会话生成

帆软使用登录接口生成会话id。

登录请求的URL为：`/webroot/decision/login`

请求参数：

- username：用户名
- password：密码
- _：时间戳

请求头：

- Content-Type：application/x-www-form-urlencoded

响应：
登录响应会往cookie中添加fine_auth_token，有些请求会用到
