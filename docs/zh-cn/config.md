---
title: kkFileView - 在线文件预览
keywords: kkFileView,预览,office,vue,word,excel,ppt,pdf,zip,rar
description: kkFileView官网 - kkFileView使用Spring Boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,Excel,pdf,txt,zip,rar,图片等等
---
打开conf目录，下面有一个application.properties配置文件，有部分配置是可以在程序运行中变更的，其他的变更需要重新启动程序

## 不可动态配置，需要重启生效部分

### server.context-path

说明：kkFileView运行时tomcat的ServletContext
默认值：`/`
示例：`server.context-path = /preview`

### file.dir

说明：预览文件存储路径，当有大量文件要预览时需要保证该目录所在磁盘有足够的容量  
默认值：程序根目录下的file目录下  
示例：`file.dir = D:\\kkFileview\\`

### office.home

说明：openoffice或libreoffice安装目录，一般情况下不用配置，如果需要使用自己安装openoffice或libreoffice，可以自行指定  
默认值：不同操作系统各自对应的默认安装目录  
示例：`office.home = C:\\Program Files (x86)\\OpenOffice 4`

### cache.type

说明：缓存实现方式，默认为内嵌[RocksDB](https://rocksdb.org)实现，可选项：'default', 'jdk', 'redis'  

* default：默认实现，使用RocksDB存储引擎，使用磁盘存储，会占用少量磁盘空间；Windows下需要使用管理员身份启动程序  
* jdk：java对象实现，使用纯内存对象存储，速度极快，外部依赖最少，调试部署方便，会占用内存，推荐调试时和预览文件量不是很大时（<50万）使用，预览文件量极大或有大量压缩包时不推荐使用  
* redis: redis作为缓存实现，速度快，不占用内存和磁盘空间，但是需要有外部redis服务  

当配置为redis实现时，需要同时配置redis连接相关配置，如下：

```properties  
spring.redisson.address = 127.0.0.1:6379
spring.redisson.password = xxxxxx
```

### cache.clean

说明：是否需要自动定时清理缓存及预览过的文件，默认开启（如果不清理缓存，同一个url下如果文件发生变更是不会重新拉取新的文件再去预览的），开启的情况下会在每天凌晨3点清理所有缓存及预览文件，推荐预览量不大，对预览速度要求不高，且同一url下文件经常更新的用户开启，预览量大、预览速度要求高的用户不推荐开启

* true: 默认值，开启
* false: 不开启
* 空：注释掉，不开启

## 可在运行时动态改变部分

### base.url

说明：提供预览服务的地址，默认从接收请求url读，如果使用nginx等反向代理，需要手动设置为通过nginx访问预览服务的地址  
默认值：未设置  
示例：`base.url = https://file.keking.cn`  
例如nginx的访问地址为 `http://file.keking.cn` 想要使用 `http://file.keking.cn/preview/`来做预览，kkFileView部署在内网`192.168.1.233`服务器上，需要在nginx中添加反向代理如下

```propertis
location /preview {
    proxy_pass 192.168.1.233:8012;
}
```

修改kkFileView的配置文件如下两项

```propertis
server.context-path = /preview
base.url = http://file.keking.cn/preview
```

使用如下地址来访问预览页面

```javascript
var url = 'http://file.keking.cn/file/test.txt'; //要预览文件的访问地址
window.open('http://file.keking.cn/preview/onlinePreview?url='+encodeURIComponent(url));
```

### trust.host

说明：信任站点，设置了之后，会限制只能预览来自信任站点列表的文件，默认不限制，多个用','隔开，
默认值：未设置
示例：`trust.host = file.keking.cn,kkfileview.keking.cn`

### simText

说明：用来配置预览方式为纯文本的文件类型  
默认值：txt,html,htm,asp,jsp,xml,json,properties,md,gitignore,log,java,py,c,cpp,sql,sh,bat,m,bas,prg,cmd

### media

说明：用来配置预览方式为多媒体（视频、音频）的文件类型  
默认值：mp3,wav,mp4,flv

### converted.file.charset

说明：文件转换编码，默认根据操作系统获取，一般情况下不用改  
默认值：从java系统属性sun.jnu.encoding获取，操作系统的默认编码  
示例：`converted.file.charset = GBK`

### office.preview.type

说明：office文件（doc、docx、ppt、pptx）、pdf 文件预览方式，默认为图片方式，预览时也有按钮相互切换，可选项：'image', 'pdf'

* image: 默认预览方式，将office文件每一页后台转成图片，前台懒加载（只加载当前页面内容），推荐预览文件大且前台加载慢的时候使用
* pdf: 统一转成pdf加一次加载，推荐内网访问，网速快时使用

### ftp.username

说明：预览url为FTP地址时，默认的ftp用户名，可过url参数中的`ftp.username=xxx`覆盖，即优先使用url参数中的，如果url参数中没有，则取本配置的  
默认值：null

### ftp.password

说明：预览url为FTP地址时，默认的ftp密码，可过url参数中的`ftp.password=xxx`覆盖，即优先使用url参数中的，如果url参数中没有，则取本配置的  
默认值：null

### ftp.control.encoding

说明：预览源为FTP时, FTP连接默认的ControlEncoding，根据FTP服务器的操作系统选择，Linux一般为设置UTF-8，Windows一般为设置GBK。可过url参数中的`ftp.control.encoding=xxx`覆盖，即优先使用url参数中的，如果url参数中没有，则取本配置的  
默认值：UTF-8

### watermark.txt

默认水印内容，如需取消水印，内容设置为空即可，例如：`watermark.txt = ${WATERMARK_TXT:}`  
默认值：''

### watermark.x.space

水印x轴间隔  
默认值：10

### watermark.y.space

水印y轴间隔  
默认值：10

### watermark.font

水印字体  
默认值：微软雅黑

### watermark.fontsize

水印字体大小  
默认值：18px

### watermark.color

水印字体颜色  
默认值：black

### watermark.alpha

水印透明度，要求设置在大于等于0.005，小于1  
默认值：0.2

### watermark.width

水印宽度  
默认值：180

### watermark.height

水印高度
默认值：80

### watermark.angle

水印倾斜度数，要求设置在大于等于0，小于90  
默认值：10
