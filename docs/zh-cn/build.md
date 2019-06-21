---
title: kkFileView - 在线文件预览
keywords: 在线,文件,预览,word,excel,ppt,office,pdf,zip,rar,压缩,文本
description: kkFileView使用spring boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
## 1. 环境要求
1. Java: 1.8+
2. Maven：3.4+
3. IDE: 没有特殊要求
4. OpenOffice或LiberOffice(MacOS或Linux下需要，Windows下已内置)

## 2. 下载代码&编译打包
### 1. 从码云仓库拉取代码
```bash
git clone https://gitee.com/kekingcn/file-online-preview.git
```
### 2. 使用maven编译打包
```bash
cd file-online-preview
mvn clean package -DskipTests -Prelease
```
### 3. 使用docker构建镜像
```bash
docker build -t keking/kkfileview:v2.1.0 .
```