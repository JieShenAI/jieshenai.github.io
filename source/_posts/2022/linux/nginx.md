---
title: nginx
category: linux
date: 2022-09-04 15:58:37
tags:
---



## nginx 

### 相关资料

尚硅谷 **@张一明**

> https://www.bilibili.com/video/BV1yS4y1N76R

> 笔记：https://blog.csdn.net/learning_xzj/category_11792194.html @不知名架构师

### 安装方式

#### 方式一：

`yum install nginx`

#### 方式二：

[centos下载安装nginx在线版、离线版_hmb↑的博客-CSDN博客_centos 下载nginx](https://blog.csdn.net/qq_48721706/article/details/125577122)

> 在这篇文章中，给出了如何下载nginx的压缩包，编译安装的命令

选择nginx的安装位置

`./configure --prefix=/usr/local/nginx`



#### 比较

方式一：yum安装。自动添加进环境变量。文件分散在各处。

方式二：编译安装。不会添加进环境变量，文件集中在一个文件夹下。



`ps aux|grep nginx` 查看运行的nginx的进程

`sudo /usr/sbin/nginx`  启动nginx



如果出现端口占用，会启动失败，查出占用的端口的进程：

`netstat -ano | grep 80`



设置nginx开机自启动, 参考的是[这篇文章](https://hashnode.blog.csdn.net/article/details/124502959)的做法。`systemctl start|enable nginx.service`



具体`nginx.conf`配置文件的配置参考的[这篇文章](https://www.jb51.net/article/241964.htm)。

```
user  普通用户名|root;
```

> 若不填写, nginx没有访问本地文件的权限



### 报错

若出现 `500 Internal Server Error`

直接进入nginx的配置文件去找问题，进入**nginx/logs/error.log文件**



## django部署

```shell
server{
        listen 8080;
        server_name 127.0.0.1;
        access_log /home/jie/.logs/django/access.log;
        charset utf-8;
        gzip on;
        gzip_types text/plain application/x-javascript text/css text/javascript application/x-httpd-php image/jpeg image/gif image/png;
        error_page 404  /404.html;
        error_page 500 502 503 504  /50x.html;
        location / {
                include uwsgi_params;
                uwsgi_connect_timeout 30;
                uwsgi_pass 127.0.0.1:8000;
        }
        location /static/ {
                alias /home/jie/site/mysite/app/static/;
                index index.html index.htm;
        }
}
```

要修改的地方:

* `access_log /home/jie/.logs/django;`
* `uwsgi_pass 127.0.0.1:8000;`
* `alias /opt/project_teacher/mysite/app/static/;`



`uwsgi.ini`

```shell
[uwsgi]
chdir=../mysite
uid=root
gid=root
module=mysite.wsgi:application
socket=127.0.0.1:8000
master=true
workers=2
pidfile=uwsgi.pid
vacuum=true 
thunder-lock=true
enable-threads=true
harakiri=30
post-buffering=1024
daemonize=uwsgi.log
```



### django 装包

以下以 vmware的centos7为例：

```
pip3.9 install pymysql
pip3.9 install pillow
pip3.9 install simplejson
pip3.9 install python-docx
```

> 若pip装包时，遇到如下报错：
>
> This error originates from a subprocess, and is likely not a problem with pip
>
> 只需要：`pip3 install --upgrade setuptools`



http://192.168.31.103/



## vue部署

`npm run build`   在当前目录生成 dist文件夹

`scp -r dist/* root@xxx.xxx.xxx.69:/xxx/xxx/www`

在windows中，将window dist文件夹下的内容传到服务器上。



## 开启自启动

nginx 和 uwsgi 开机自启动

nginx开机自启动，在前面已经给出了参考的[链接](https://hashnode.blog.csdn.net/article/details/124502959)。 `systemctl start|stop|status nginx.service`

uwsgi开机自启动，还没设置。不过云服务器，不需要关机，这个也不用设置。
