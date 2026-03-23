# CA机构

CA（Certification Authority）是证书机构，负责签发数字证书。数字证书用于验证身份和加密通信。常见的证书类型包括SSL/TLS证书、代码签名证书等。

## 顶级CA

顶级CA是指直接由政府或国际组织认可的CA。例如，VeriSign、DigiCert、GlobalSign等都是顶级CA。顶级CA签发的证书具有最高的信任度，通常用于根证书和中间证书。

## 中间CA

中间CA是指由顶级CA签发的CA。中间CA负责签发最终用户证书。常见的中间CA包括Symantec、Comodo、GoDaddy等。中间CA签发的证书具有较高的信任度，通常用于网站SSL/TLS证书。

中间CA可以是很多层

## 用户证书

用户证书是指由中间CA或顶级CA签发的证书，用于验证用户的身份。用户证书可以用于电子邮件、文件传输、远程登录等多种场景。常见的用户证书包括数字签名证书和加密证书。

**只要根证书是有效的，那么中间CA和用户证书都是有效的。**

腾讯云提供的免费证书的证书路径是
AAA Certification Authority
TrustAsia RSA DV TLS CA G2
用户证书

现在免费证书的有效期只有三个月，快到期时要手动续期或更换
