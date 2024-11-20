# 分析请求


## 分析请求

分析下不同帆软操作的几个常见请求

### 1. viewlet请求

```java
http://domain/webroot/decision/view/report?viewlet=province/aa.cpt
```
返回html页面，页面内容会包含sessionID。
根据观察，每次访问新的报表会关闭老的sessionID，同时创建新的sessionID，并关联当次报表访问，并在某些请求中传递该值

### 2. emb请求

```java
http://domain/webroot/decision/view/report?op=emb&resource=xxx.css
```

该请求返回静态资源，不需要登录帆软就能访问，也不需要sessionID。

### 3. resource请求

```java
http://domain/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/xxx
```

该请求返回静态资源，不需要登录帆软就能访问，也不需要sessionID。和emb请求很相似，不同的是resource的地址是绝对路径，而不是emb请求的文件名称。

### 4. toolbar_icon请求
```java
http://domain/webroot/decision/view/report?op=toolbar_icon&id=toolbar-image.png
```

该请求返回多个icon拼接后的图片，不需要登录帆软就能访问，也不需要sessionID。

### 5. fr_paramstpl请求

```java
http://domain/webroot/decision/view/report?op=fr_paramstpl&cmd=query_favorite_params
```

请求需要登录，需要sessionID，cmd参数的值query_favorite_params应该是查询偏好参数。返回的成功内容是

```json
{"success":true, "data":[]}
```

### 6. fr_dialog请求
```java
http://domain/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d
```

fr_dialog请求需要登录，需要sessionID，cmd参数的值parameters_d未知。返回的成功内容是

```json
{"status":"success"}
```

### 7. get_openVideo_settings请求
```java
http://domain/webroot/decision/view/report?op=get_openVideo_settings
```

应该是用来获取打开视频的设置，需要sessionID，目前遇到的响应都是为空。

### 8. closesessionid请求
```java
http://domain/webroot/decision/view/report?op=closesessionid&sessionID=
```

该请求关闭sessionID，sessionID用URL参数传递

### 9. page_content请求

```java
http://domain/webroot/decision/view/report?op=page_content
```

page_content返回了报表的页面内容。需要sessionID。

### 10. collect请求

```java
http://domain/webroot/decision/preview/info/collect
```

不确定这个请求的用途。需要sessionID。响应是

```json
{"data":"success"}
```

### 11. cloud file请求

```java
http://domain/webroot/decision/v1/cloud/file?resource=xxxx.js
```

获取指定文件内容，不确定和emb和resource请求的区别，不需要sessionID，不需要登录

### 12. file请求

```java
http://domain/webroot/decision/file?path=xxx/xxx/xx
```

获取指定文件内容，不确定和cloud file请求、emb请求和resource请求的区别，不需要sessionID，不需要登录。

### 13. export请求

```java
http://domain/webroot/decision/view/report?op=export&cmd=check_register
http://domain/webroot/decision/view/report?op=export&format=&sessionID=
http://domain/webroot/decision/view/report?op=export&cmd=export_polling
```

export请求是在导出的时候才会调用，op=export&cmd=check_register不确定是检查什么，op=export&format=&sessionID=是导出报表，op=export&cmd=export_polling是导出进度。需要sessionID。

### 14. font请求

```java
http://domain/webroot/decision/check/font
```

请求字体

## 总结

|序号|请求|URL|是否需要登录|是否需要sessionID|
|----|-----|-----|-----|-----|
|1|viewlet请求|[http://domain/webroot/decision/view/report?viewlet=province/aa.cpt](http://domain/webroot/decision/view/report?viewlet=province/aa.cpt)|是|否|
|2|emb请求|[http://domain/webroot/decision/view/report?op=emb&resource=xxx.css](http://domain/webroot/decision/view/report?op=emb&resource=xxx.css)|否|否|
|3|resource请求|[http://domain/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/xxx](http://domain/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/xxx)|否|否|
|4|toolbar_icon请求|[http://domain/webroot/decision/view/report?op=toolbar_icon&id=toolbar-image.png](http://domain/webroot/decision/view/report?op=toolbar_icon&id=toolbar-image.png)|否|否|
|5|fr_paramstpl请求|[http://domain/webroot/decision/view/report?op=fr_paramstpl&cmd=query_favorite_params](http://domain/webroot/decision/view/report?op=fr_paramstpl&cmd=query_favorite_params)|是|是|
|6|fr_dialog请求|[http://domain/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d](http://domain/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d)|是|是|
|7|get_openVideo_settings请求|[http://domain/webroot/decision/view/report?op=get_openVideo_settings](http://domain/webroot/decision/view/report?op=get_openVideo_settings)|是|是|
|8|closesessionid请求|[http://domain/webroot/decision/view/report?op=closesessionid&sessionID=](http://domain/webroot/decision/view/report?op=closesessionid&sessionID=)|是|是|
|9|page_content请求|[http://domain/webroot/decision/view/report?op=page_content](http://domain/webroot/decision/view/report?op=page_content)|是|是|
|10|collect请求|[http://domain/webroot/decision/preview/info/collect](http://domain/webroot/decision/preview/info/collect)|是|是|
|11|cloud file请求|[http://domain/webroot/decision/v1/cloud/file?resource=xxxx.js](http://domain/webroot/decision/v1/cloud/file?resource=xxxx.js)|否|否|
|12|file请求|[http://domain/webroot/decision/file?path=xxx/xxx/xx](http://domain/webroot/decision/file?path=xxx/xxx/xx)|否|否|
|13|export请求|[http://domain/webroot/decision/view/report?op=export](http://domain/webroot/decision/view/report?op=export)|是|是|
|14|font请求|[http://domain/webroot/decision/check/font](http://domain/webroot/decision/check/font)|是|是|
