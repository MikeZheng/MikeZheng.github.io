# 访问一张报表的过程

本章以某省数据汇总报表A为例。报表A在服务器上的路径为：`/finereport/WEB-INF/reportlets/province/aa.cpt`。

## 打开报表页面

在浏览器打开帆软页面，登录后，打开报表页面，URL为：
`http://domain/webroot/decision/view/report?viewlet=province/aa.cpt`

在浏览器控制台，可以依次看到如下请求：
```java {.line-numbers}
GET /webroot/decision/view/report?viewlet=province/aa.cpt HTTP/1.1
```

其中，`xxxxx`为报表的viewlet参数，可以通过获取报表列表的响应中获取。

## 2. 查询

## 3. 下一页

## 4. 导出PDF
