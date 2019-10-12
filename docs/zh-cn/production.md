---
title: kkFileView - 在线文件预览
keywords: kkFileView,文档,预览,在线,浏览,文本,doc,docx,Excel,pdf,txt,zip,rar,压缩
description: kkFileView使用spring boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
## 1. 环境要求
1. Java: 1.8+
2. OpenOffice或LiberOffice(Windows下已内置，CentOS或Ubuntu下会自动下载安装，MacOS下需要自行安装)

## 2. 部署运行
### 1). 物理机或虚拟机上运行
1. 从 [码云发行版本](https://gitee.com/kekingcn/file-online-preview/releases) 下载最新版发行包
2. 解压kkFileView-2.x.x.zip包
3. 打开解压后文件夹的bin目录，运行startup脚本（Windows下以管理员身份运行`startup.bat`，Linux以root用户运行`startup.sh`）
4. 浏览器访问本机8012端口（http://127.0.0.1:8012 ）即可看到项目演示用首页
### 2). Docker容器环境环境运行
1. 拉取镜像
```bash
docker pull keking/kkfileview
```
2. 运行
```bash
docker run -it -p 8012:8012 keking/kkfileview
```
3. 浏览器访问容器8012端口（http://xxx.xxx.xxx.xxx:8012 ）即可看到项目演示用首页

## 3. 项目接入使用
当您的项目内需要预览文件时，只需要调用浏览器打开本项目的预览接口，并传入须要预览文件的url，示例如下：
```javascript
var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
window.open('http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(previewUrl));
```
详细使用说明见 [使用指南](usage.md)