# 客户端无法连接 QuickConnect 服务器

## 现象

Windows 上的 Synology Drive Client 最近一段时间一直连不上 NAS。在「编辑连接」里点确认后，弹出提示：

> 无法连接到 QuickConnect 服务器。请检查网络设备。

同样的账号、同一台 NAS，另一台电脑却完全正常，所以问题基本锁定在这台电脑本地。

## 排查过程

### 一、先看客户端日志

日志在 `%LOCALAPPDATA%\SynologyDrive\log\`，`ui.log` 里能直接看到原文：

```text
[ERROR] autoconn.cpp(245): curl_easy_perform: SSL peer certificate or SSH remote key was not OK (60)
[ERROR] conn-finder.cpp(1247): QuickConnect: failed to get server info for 'xxxx' from global server.
[ERROR] conn-finder.cpp(1334): GetServerInfo(xxxx) failed
```

关键信息是 curl 错误码 `(60)`——**证书校验失败**，而不是网络不通。所以先别急着换网络、重启路由器，先查证书和域名。

### 二、DNS 解析到了 127.0.0.1

```text
> nslookup global.quickconnect.to
Name:    global.quickconnect.to
Address:  127.0.0.1

> nslookup global.quickconnect.to 223.5.5.5
Address:  54.218.2.45 / 54.148.249.27 / 184.34.189.186 / 44.239.133.144
```

同一台机器上，用不同的 DNS 服务器查询，结果完全不同：本地 DNS 返回 `127.0.0.1`，公共 DNS 返回真实 IP。

再对比其他域名：

```text
global.quickconnect.cn  -> 真实 IP   正常
quickconnect.to         -> 真实 IP   正常
global.quickconnect.to  -> 127.0.0.1 异常
```

说明这不是整体性的 DNS 故障，而是**针对这一个域名的精确拦截**。测试随机子域 `abcdef123.global.quickconnect.to` 却能解析出真实 IP，进一步印证了这一点：只有完全匹配的那一条被改写。

### 三、127.0.0.1 上正好有服务

```text
netstat -ano | findstr ":443"
TCP    0.0.0.0:443    0.0.0.0:0    LISTENING    12796
```

本机有个 Windows 服务 `nginx`（`F:\server\nginx`）监听在 `0.0.0.0:443`。于是客户端的请求链路变成：

```text
global.quickconnect.to → 127.0.0.1 → 本机 nginx → 返回的是自己网站的证书
```

证书当然对不上，这就是 `(60)` 的由来。

### 四、用「错误码变化」反向验证

停掉 nginx 服务后，再点确认，报错变成了：

```text
[ERROR] autoconn.cpp(245): curl_easy_perform: Couldn't connect to server (7)
```

`(60)` 变成 `(7) 连接被拒绝`，而这一变化恰好只发生在 443 端口被释放之后——**反向证明了客户端确实在连接 127.0.0.1**，因果链闭环。

### 五、验证真实服务器是可用的

为了排除「Synology 服务端出问题」的可能，用真实 IP + 客户端自带的 CA 库（`%LOCALAPPDATA%\SynologyDrive\data\certs.pem`）做严格校验：

```text
44.239.133.144  TLS OK, HTTP/1.1 200 OK, Server: nginx   响应体: usc.quickconnect.to
54.148.249.27   TLS OK, HTTP/1.1 200 OK
184.34.189.186  TLS OK, HTTP/1.1 200 OK
54.218.2.45     TLS OK, HTTP/1.1 200 OK
```

证书校验全部通过。**只要 DNS 正确，客户端立刻就能拿到服务器信息。**

### 六、改 IPv4 DNS 为什么无效

到这里想当然会去改 DNS，但改了之后仍然连不上：

```text
netsh interface ipv4 set dnsservers name="WLAN" static 223.5.5.5 primary
ipconfig /flushdns
```

查配置才发现问题所在：

```text
IPv4 DNS：223.5.5.5, 119.29.29.29          ← 已经改了
IPv6 DNS：fe80::xxxx:xxxx:xxxx:xxxx        ← 还是 DHCP 下发的，指向热点那台设备
```

而单独去问这个 IPv6 DNS，它依然返回 `127.0.0.1`：

```text
> nslookup global.quickconnect.to fe80::xxxx:xxxx:xxxx:xxxx
Address:  127.0.0.1
```

Windows 在同时存在 IPv6 和 IPv4 DNS 时会优先使用 IPv6 的那台，所以**只改 IPv4 等于没改**。

## 根因

当前网络（手机热点）下发的 DNS 把 `global.quickconnect.to` 解析成了 `127.0.0.1`，而本机 443 端口又正好被 nginx 占用，导致客户端把本机 nginx 当成了 QuickConnect 服务器，TLS 证书校验失败，最终报「无法连接到 QuickConnect 服务器」。

## 解决方案

### 方案一：改 hosts（最快，立即生效）

hosts 文件在 DNS 之前生效，可以绕过整条解析链。管理员权限编辑 `C:\Windows\System32\drivers\etc\hosts`：

```text
44.239.133.144   global.quickconnect.to
54.148.249.27    global.quickconnect.to
184.34.189.186   global.quickconnect.to
54.218.2.45      global.quickconnect.to
```

然后 `ipconfig /flushdns`。

::: warning
IP 是写死的，Synology 更换服务器地址后会失效。客户端在这种情况下通常会回退到 `cnc.quickconnect.cn`，多数时候仍能连上，但不是长久之计。
:::

### 方案二：同时修改 IPv4 和 IPv6 DNS（推荐）

```text
netsh interface ipv4 set dnsservers name="WLAN" static 223.5.5.5 primary
netsh interface ipv4 add dnsservers name="WLAN" 119.29.29.29 index=2

netsh interface ipv6 set dnsservers name="WLAN" static 2400:3200::1 primary
netsh interface ipv6 add dnsservers name="WLAN" 2402:4e00:: index=2

ipconfig /flushdns
```

验证：

```text
nslookup global.quickconnect.to
```

只要返回的不是 `127.0.0.1` 就说明成功了。

换回自动获取：

```text
netsh interface ipv4 set dnsservers name="WLAN" source=dhcp
netsh interface ipv6 set dnsservers name="WLAN" source=dhcp
```

### 方案三：避免 nginx 占用 443

本机的 nginx 用 `listen 443 ssl;` 绑定了 `0.0.0.0`，等于接管了所有指向本机的 443 请求。建议改成绑定具体地址：

```nginx
listen 127.0.0.2:443 ssl;
```

否则以后任何域名被误解析到 `127.0.0.1`，都会被它「冒充」成远程服务器，排查起来非常费劲。

## 顺带排除的一个误判

排查过程中一度怀疑 NAS 上的 Synology Drive Server 有问题：用脚本直连 NAS 的 6690 端口，TCP 能连通但 TLS 握手被对端直接断开（`UNEXPECTED_EOF`），而同机 5001 端口 TLS 正常。

但客户端日志显示连接其实是好的：

```text
conn-finder.cpp(320): test connection to <NAS-IPv6> via port 6690 is successful
```

原因是 6690 上跑的是 Synology 私有协议，会拒绝非客户端发起的 TLS 握手。**这是正常行为，不是故障。** 排查时要注意区分「服务拒绝了我的探测」和「服务真的坏了」。

## 经验

1. **错误码比错误文案可靠。** 界面说「请检查网络设备」，日志里却是证书错误 `(60)`，方向完全相反。
2. **改动前后错误码的变化是强力证据。** 停掉 nginx 后 `(60)` 变 `(7)`，直接锁定了 127.0.0.1 这条链路。
3. **只改 IPv4 DNS 是不够的。** 双栈环境下 IPv6 DNS 优先级更高，必须一起改。
4. **别让本地服务监听 `0.0.0.0`。** 否则任何指向 127.0.0.1 的域名都会打到它身上。
5. **同一个域名多问几个 DNS 服务器**，是判断「解析被劫持」还是「域名真有问题」最快的方法。

## 附：排查命令速查

```text
:: 看客户端日志尾部
powershell Get-Content "$env:LOCALAPPDATA\SynologyDrive\log\ui.log" -Tail 40

:: 对比不同 DNS 的解析结果
nslookup global.quickconnect.to
nslookup global.quickconnect.to 223.5.5.5

:: 看谁占了 443
netstat -ano | findstr ":443"

:: 看当前 DNS 配置（IPv4 / IPv6 都要看）
netsh interface ipv4 show dnsservers
netsh interface ipv6 show dnsservers

:: 清 DNS 缓存
ipconfig /flushdns

:: 查清 DNS 缓存里这个域名解析成了什么
ipconfig /displaydns | findstr /i /c:"quickconnect" /c:"127.0.0.1"
```
