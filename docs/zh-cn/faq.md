---
title: kkFileView - 在线文件预览
keywords: 在线,文件,预览,word,excel,ppt,office,pdf,zip,rar,压缩,文本
description: kkFileView使用spring boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
### Q：怎么把这个项目集成到我的项目里？  
A：不需要集成，本项目只需要独立部署，向外提供http预览服务（外部系统只需要访问本项目预览接口并传入需要预览文件的url，就可以打开预览页面）  

### Q：怎么把这个项目放Tomcat里运行？  
A：不需要放进Tomcat里，编译好的发行包为zip包，直接解压运行一键启动脚本就可以完成部署（需要有java环境）具体部署步骤详见：[部署文档](production.md)

### Q：预览并发问题&预览首次打开慢？
A：可使用预览转码队列，将需要预览的文件url放入队列中，提前进行转码，本地访问接口为：http://127.0.0.1:8012/addTask?url=http://xxx/test.txt (url参数为需要需要的文件访问地址)

### Q：预览乱码  
A：乱码问题可能有如下两个原因  
* 字体问题  
大部分Linux系统上并没有预装中文字体或字体不全，需要把常用字体拷贝到Linux服务器上，具体操作如下：
将Windows下的C:\Windows\Fonts 目录下的文件完整拷贝到Linux下的 /usr/share/fonts目录。然后依次执行mkfontscale 、mkfontdir 、fc-cache使字体生效
* 编码问题  
编码问题分为如下两方面
1. Excel文件编码格式  
Excel软件是可以选择用什么编码去保存文件的  
![Excel编码](https://images.gitee.com/uploads/images/2019/0508/180042_2a806a43_528790.png "excel-encoding.png")  
目前我们读取Eecel文件是用的服务器操作系统默认编码，可以通过在启动脚本里加入如`-Dfile.encoding=UTF-8`指定，详见 [码云项目首页评论区讨论](https://gitee.com/kekingcn/file-online-preview#note_1841612)  
2. 生成html网页编码格式  
生成html网页也是用的服务器操作系统默认编码(java系统属性：`sun.jnu.encoding`)，比如用浏览器用手动更改编码格式为`utf-8`或`gbk`打开没有问题，但是用浏览器默认编码就有问题，此时可调整系统配置文件中的配置项`converted.file.charset`可解决此类乱码问题, 详见 [编码配置](config.md)


### Q：Linux下运行startup.sh脚本报错：/bin/bash^M: bad interpreter: No such file or directory  
A：一般为在Windows下用IDEA导入项目编译时，默认使用Windows(\r\n)下的文件换行符导致的，导入项目时设置默认换行符为Unix类操作系统换行符再编译即可（File->Settings->Editor->Code Style->Line separator 选择Unix and MacOs(\n) ）  
![设置换行符](https://gitee.com/uploads/images/2019/0506/154431_9153cb1e_528790.png)  


### Q：Linux下启动项目后日志报错：org.artofsolving.jodconverter.office.OfficeException: office process died with exit code 127
A：操作系统缺少libXext.so.6包，请自行下载安装：https://pkgs.org/download/libXext.so.6  

### Q：启动项目后日志报错：java.lang.IllegalStateException: a process with acceptString 'socket,host=127.0.0.1,port=8100' is already running; pid 26468
A：有正在运行的openoffice进程，kill掉相关进程再重新启动

### Q：Windows系统下启动报错：Error creating bean with name 'cacheServiceRocksDBImpl'   
A：本项目默认使用内嵌RocksDB存储引擎作缓存，需要以管理员身份运行，或配置使用其他缓存实现，详见：[缓存配置](config.md)
