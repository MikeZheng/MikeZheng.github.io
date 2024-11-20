# 登录

登录请求的URL为：`/webroot/decision/login`

请求参数：

- username：用户名
- password：密码
- _：时间戳

请求头：

- Content-Type：application/x-www-form-urlencoded

响应：
登录响应会往cookie中添加fine_auth_token，有些请求会用到