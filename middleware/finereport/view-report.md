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
http://domain/webroot/decision/v1/cloud/file?resource=xxxx.js
http://domain/webroot/decision/file?path=xx/xx
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

帆软的请求格式，除了少部分用URL区分外，大部分用op参数区分用途。静态文件使用op参数值为emb和resource的请求，或者cloud file，file请求获取。
