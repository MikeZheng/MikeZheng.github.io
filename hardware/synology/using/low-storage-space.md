# 存储池占用率过高

我买的磁盘是4T，实际只有3.6T，万恶的资本家。
我一直以为我的文件真的很大，这次我稍微怀疑了一下。于是我把看了所有最外层文件夹的大小，加起来才1.5T左右，所以是什么占用了2T。

有网友也遇到了类似的问题，[我的群晖储存空间哪儿去了——100%破案的教程](https://post.smzdm.com/p/apzenkg0/)。

我参考了网友的做法，尝试了下面这些措施
1. 在Synology Driver Server控制台里，停用了除了homes和home之外的团队文件夹。效果不明显，存储没有明显下降。
2. 在Synology Driver Server控制台里，关闭homes和home的版本控制。没啥效果。
3. 卸载重装Synology Driver Server。这个效果最好，存储马上就下来了，从3.6T降到1.5T。重装后的Synology Driver Server也没有开启版本控制，共享文件夹那也关闭了回收站。

::: warning
版本控制和回收站应该是有用，可能是哪里没有配置好。
:::