# WSL

[官方网址](https://learn.microsoft.com/zh-cn/windows/wsl/install)

## WSL1 vs WSL2

## 前提

1. 开启hper-v
2. 开启两个windows功能
   1. 虚拟机平台
   2. 适用于Linux的windows子系统

## 使用

### 安装

安装默认Linux系统，默认是Ubuntu，也可以选择其他发行版

```bash
wsl --install  --web-install
```

查看其他发行版列表

```bash
wsl --list --online

C:\Users\Zrich-desktop>wsl --list --online
The following is a list of valid distributions that can be installed.
Install using 'wsl.exe --install <Distro>'.

NAME                            FRIENDLY NAME
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
kali-linux                      Kali Linux Rolling
openSUSE-Tumbleweed             openSUSE Tumbleweed
openSUSE-Leap-15.6              openSUSE Leap 15.6
Debian                          Debian GNU/Linux
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
```

安装Linux其他发行版，例如Debian

```bash
wsl --install -d Debian
```

### 查看已安装的WSL发行版

```bash
wsl --list

C:\Users\Zrich-desktop>wsl --list
Windows Subsystem for Linux Distributions:
docker-desktop-data (Default)
Ubuntu
docker-desktop
```

### 查看明细

```bash
wsl --list --verbose
#wsl --list -v

C:\Users\Zrich-desktop>wsl --list --verbose
  NAME                   STATE           VERSION
* docker-desktop-data    Stopped         2
  Ubuntu                 Stopped         2
  docker-desktop         Stopped         2
```

带*的表示默认发行版。

- 设置默认发行版

```bash
wsl --setdefault Debian
```

### 卸载WSL发行版

```bash
wsl --unregister Ubuntu
```

### 备份wsl

```bash
wsl --export <DistributionName> <FileName>
wsl --export Ubuntu D:\WSL\Ubuntu.tar.gz
```

### 还原wsl发行版

```bash
wsl --import <DistributionName> <InstallLocation> <FileName>
wsl --import Ubuntu D:\WSL\Ubuntu D:\WSL\Ubuntu.tar.gz
```

### wsl文件共享

linux系统里访问windows文件，进入wsl终端，输入以下命令来查看当前挂载点：

```bash
df -f

Filesystem      Size  Used Avail Use% Mounted on
none            7.8G     0  7.8G   0% /usr/lib/modules/5.15.167.4-microsoft-standard-WSL2
none            7.8G  4.0K  7.8G   1% /mnt/wsl
drivers         953G  190G  764G  20% /usr/lib/wsl/drivers
/dev/sdc       1007G  6.1G  950G   1% /
none            7.8G   72K  7.8G   1% /mnt/wslg
none            7.8G     0  7.8G   0% /usr/lib/wsl/lib
rootfs          7.8G  2.4M  7.8G   1% /init
none            7.8G     0  7.8G   0% /dev
none            7.8G  8.0K  7.8G   1% /run
none            7.8G     0  7.8G   0% /run/lock
none            7.8G     0  7.8G   0% /run/shm
none            7.8G     0  7.8G   0% /run/user
tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
none            7.8G   76K  7.8G   1% /mnt/wslg/versions.txt
none            7.8G   76K  7.8G   1% /mnt/wslg/doc
C:\             953G  190G  764G  20% /mnt/c
D:\             954G  419G  536G  44% /mnt/d
E:\             932G  891G   42G  96% /mnt/e
F:\             299G  260G   39G  87% /mnt/f
G:\             233G   34G  200G  15% /mnt/g
```

使用这种方式，性能不好，建议直接使用复制文件的方式。

Windows系统访问Linux文件：

1. 打开我的电脑
2. 左下角有个linux的图标小企鹅，点击它即可看到安装的Linux发行版。

### 命令混用

在linux终端调用windows应用

```bash
zrich@DESKTOP-J968JKV:/mnt/c/Users/Zrich-desktop$ notepad.exe tk.csv
zrich@DESKTOP-J968JKV:/mnt/c/Users/Zrich-desktop$
```

用这个方式可以打开记事本，也可以运行其他Windows应用，比如explorer.exe等。

在windows终端调用linux命令

```bash
C:\Users\Zrich-desktop> get-childitem -path C:\mnt\c\Users\zrich-desktop -name tk.csv | wsl grep vm 
#  我本地没有执行成功
```

### WSLG

wslg 是 Windows Subsystem for Linux Graphics 的缩写，它允许你在 Windows 上运行图形化的 Linux 应用。要使用 WSLG，你需要在 WSL 中安装一个支持图形的发行版，比如 Ubuntu 20.04 或更高版本。然后你可以通过以下命令启动 WSLG：

```bash
```

### 显卡直通

在linux中使用NVIDIA显卡，可以通过以下命令查看显卡信息：

```bash
zrich@DESKTOP-J968JKV:~$ nvidia-smi
Fri Feb  7 21:14:58 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 560.35.02              Driver Version: 560.94         CUDA Version: 12.6     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 4060 Ti     On  |   00000000:01:00.0  On |                  N/A |
| 33%   34C    P8              7W /  165W |    9686MiB /  16380MiB |      4%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A        27      G   /Xwayland                                   N/A      |
+-----------------------------------------------------------------------------------------+
zrich@DESKTOP-J968JKV:~$
```

### wsl高级配置

- .wslconfig是全局配置，对所有的wsl生效
- wsl.config只对当前的wsl实例生效

### wsl.config

systemd支持：

vi /etc/wsl.conf

```ini
[boot]
systemd=true
```

关闭wsl，8秒后重启生效

