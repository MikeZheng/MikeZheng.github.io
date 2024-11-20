# 访问一张报表的过程

本章以某省数据汇总报表A为例。报表A在服务器上的路径为：`/finereport/WEB-INF/reportlets/province/aa.cpt`。

## 页面和后台的交互过程

### 1.打开报表页面

在浏览器打开帆软页面，登录后，打开报表页面，URL为：
`http://domain/webroot/decision/view/report?viewlet=province/aa.cpt`

在浏览器控制台，可以依次看到如下请求：
```java {.line-numbers}
http://domain/webroot/decision/view/report?viewlet=province/aa.cpt
http://domain/webroot/decision/view/report?op=emb&resource=xxx.css
http://domain/webroot/decision/view/report?op=emb&resource=xxx.js
http://domain/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/xxx
http://domain/webroot/decision/view/report?op=toolbar_icon&id=toolbar-image.png
http://domain/webroot/decision/view/report?op=fr_paramstpl&cmd=query_favorite_params
http://domain/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d
http://domain/webroot/decision/view/report?op=get_openVideo_settings
http://domain/webroot/decision/view/report?op=closesessionid&sessionID=
http://domain/webroot/decision/view/report?op=page_content
http://domain/webroot/decision/preview/info/collect
http://domain/webroot/decision/vi1/cloud/file?resource=xxxx.js
http://domain/webroot/decision/vi1/cloud/file?path=/xx/xx
```



### 2. 查询按钮
```java
http://domain/webroot/decision/view/report?op=fr_dialog&cmd=parameters_d
http://domain/webroot/decision/preview/info/collect
http://domain/webroot/decision/view/report?op=page_content
```

### 3. 下一页
```java
http://domain/webroot/decision/view/report?op=page_content
```

### 4. 导出PDF
```java
http://domain/webroot/decision/view/report?op=resource&resource=/com/fr/web/core/xxx
http://domain/webroot/decision/view/report?op=export&cmd=check_register
http://domain/webroot/decision/check/font
http://domain/webroot/decision/view/report?op=export&format=&sessionID=
http://domain/webroot/decision/view/report?op=export&cmd=export_polling
```

### 5. 总结

帆软的请求格式，除了少部分用URL区分外，大部分用op参数区分用途。

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

### 6. get_openVideo_settings请求
```java
http://domain/webroot/decision/view/report?op=get_openVideo_settings
```

http://domain/webroot/decision/view/report?op=closesessionid&sessionID=
http://domain/webroot/decision/view/report?op=page_content
http://domain/webroot/decision/preview/info/collect
http://domain/webroot/decision/vi1/cloud/file?resource=xxxx.js
http://domain/webroot/decision/vi1/cloud/file?path=/xx/xx