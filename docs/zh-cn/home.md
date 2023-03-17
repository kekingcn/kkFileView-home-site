---
title: kkFileView - 在线文件预览
keywords: kkFileView,预览,office,vue,word,excel,ppt,pdf,zip,rar
description: kkFileView官网 - kkFileView使用Spring Boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
## 项目简介
文档在线预览项目解决方案，项目使用流行的spring boot搭建，易上手和部署。万能的文件预览开源项目，基本支持主流文档格式预览

## 项目特性

1. 使用spring boot开发，预览服务搭建部署非常简便
2. rest接口提供服务，跨平台特性(java,php,python,go,php，....)都支持，应用接入简单方便
3. 支持普通http/https文件下载url、http/https文件下载流url、ftp下载url等多种预览源
4. 提供zip，tar.gz发行包，提供一键启动脚本和丰富的配置项，方便部署使用
5. 提供Docker镜像发行包，方便在容器环境部署
6. 抽象预览服务接口，方便二次开发，非常方便添加其他类型文件预览支持

> 基于当前良好的架构模式，支持的文件类型在进一步丰富中

目前支持的文件类型如下

1. 支持 doc, docx, xls, xlsx, xlsm, ppt, pptx, csv, tsv, dotm, xlt, xltm, dot, dotx,xlam, xla 等 Office 办公文档
2. 支持 wps, dps, et, ett, wpt 等国产 WPS Office 办公文档
3. 支持 odt, ods, ots, odp, otp, six, ott, fodt, fods 等OpenOffice、LibreOffice 办公文档
4. 支持 vsd, vsdx 等 Visio 流程图文件
5. 支持 wmf, emf 等 Windows 系统图像文件
6. 支持 psd 等 Photoshop 软件模型文件
7. 支持 pdf ,ofd, rtf 等文档
8. 支持 xmind 软件模型文件
9. 支持 bpmn 工作流文件
9. 支持 eml 邮件文件
10. 支持 epub 图书文档
10. 支持 obj, 3ds, stl, ply, gltf, glb, off, 3dm, fbx, dae, wrl, 3mf, ifc, brep, step, iges, fcstd, bim 等 3D 模型文件
11. 支持 dwg, dxf 等 CAD 模型文件
12. 支持 txt, xml(渲染), md(渲染), java, php, py, js, css 等所有纯文本
13. 支持 zip, rar, jar, tar, gzip, 7z 等压缩包
14. 支持 jpg, jpeg, png, gif, bmp, ico, jfif, webp 等图片预览（翻转，缩放，镜像）
15. 支持 tif, tiff 图信息模型文件
16. 支持 tga 图像格式文件
17. 支持 svg 矢量图像格式文件
18. 支持 mp3,wav,mp4,flv 等音视频格式文件
19. 支持 avi,mov,rm,webm,ts,rm,mkv,mpeg,ogg,mpg,rmvb,wmv,3gp,ts,swf 等视频格式转码预览

## 预览展示

### 1. 文本预览

支持所有类型的文本文档预览， 由于文本文档类型过多，无法全部枚举，默认开启的类型如下 txt,html,htm,asp,jsp,xml,json,properties,md,gitignore,log,java,py,c,cpp,sql,sh,bat,m,bas,prg,cmd  
文本预览效果如下  
![文本预览效果如下](https://kkview.cn/img/preview/preview-text.png)

### 2. 图片预览

支持jpg，jpeg，png，gif等图片预览（翻转，缩放，镜像），预览效果如下  
![图片预览](https://kkview.cn/img/preview/preview-image.png)  

### 3. word文档预览

支持doc，docx文档预览，word预览有两种模式：一种是每页word转为图片预览，另一种是整个word文档转成pdf，再预览pdf。两种模式的适用场景如下  

* 图片预览：word文件大，前台加载整个pdf过慢  
* pdf预览：内网访问，加载pdf快  
图片预览模式预览效果如下  
![word文档预览1](https://kkview.cn/img/preview/preview-doc-image.png)  
pdf预览模式预览效果如下  
![word文档预览2](https://kkview.cn/img/preview/preview-doc-pdf.png)  

### 4. ppt文档预览

支持ppt，pptx文档预览，和word文档一样，有两种预览模式  
图片预览模式预览效果如下  
![ppt文档预览1](https://kkview.cn/img/preview/preview-ppt-image.png)  
pdf预览模式预览效果如下  
![ppt文档预览2](https://kkview.cn/img/preview/preview-ppt-pdf.png)  

### 5. pdf文档预览

支持pdf文档预览，和word文档一样，有两种预览模式  
图片预览模式预览效果如下  
![pdf文档预览1](https://kkview.cn/img/preview/preview-pdf-image.png)  
pdf预览模式预览效果如下  
![pdf文档预览2](https://kkview.cn/img/preview/preview-pdf-pdf.png)  

### 6. excel文档预览

支持xls，xlsx文档预览，预览效果如下  
![excel文档预览](https://kkview.cn/img/preview/preview-xls.png)  
ps，如碰到excel预览乱码问题，可参考 [预览乱码](https://kkview.cn/zh-cn/docs/faq.html)  

### 7. 压缩文件预览

支持zip,rar,jar,tar,gzip等压缩包，预览效果如下  
![压缩文件预览1](https://kkview.cn/img/preview/preview-zip.png)  
可点击压缩包中的文件名，直接预览文件，预览效果如下  
![压缩文件预览2](https://kkview.cn/img/preview/preview-zip-inner.png)  

### 8. 多媒体文件预览

理论上支持所有的视频、音频文件，由于无法枚举所有文件格式，默认开启的类型如下  
mp3,wav,mp4,flv  
如有没有未覆盖全面，可通过配置文件[指定多媒体类型](https://kkview.cn/zh-cn/docs/config.html)  
视频预览效果如下  
![多媒体文件预览1](https://kkview.cn/img/preview/preview-video.png)  
音频预览效果如下  
![多媒体文件预览2](https://kkview.cn/img/preview/preview-audio.png)  

### 9. CAD文档预览

支持CAD dwg文档预览，和word文档一样，有两种预览模式  
图片预览模式预览效果如下  
![cad文档预览1](https://kkview.cn/img/preview/preview-cad-image.png)  
pdf预览模式预览效果如下  
![cad文档预览2](https://kkview.cn/img/preview/preview-cad-pdf.png)
