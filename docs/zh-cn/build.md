---
title: kkFileView - 在线文件预览
keywords: kkFileView,预览,office,vue,word,excel,ppt,pdf,zip,rar
description: kkFileView官网 - kkFileView使用Spring Boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
## 1. 环境要求

1. Java: 1.8+
2. Maven：3.4+

## 2. 下载代码&编译打包

### 1. 从码云仓库拉取代码

```bash
git clone https://gitee.com/kekingcn/file-online-preview.git
```

### 2. 使用maven编译打包

```bash
cd file-online-preview
mvn clean package -DskipTests
```

### 3. 使用docker构建镜像
1. 先执行位于`docker/kkfileview-jdk/Dockerfile`文件，构建基础镜像（构建命令参考`docker build.txt`文件）

2. 再执行项目根目录下的`Dockerfile`文件构建kkfileview镜像
```bash
docker build -t keking/kkfileview:v4.1.0 .
```

说明：通过两层缓存，可以非常有效的加快，日常docker镜像构建，无需每次重复安装ubuntu环境、jdk环境、libreoffice环境。
