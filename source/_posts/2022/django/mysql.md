---
title: mysql
category: django
date: 2022-09-26 09:59:50
tags:
---



![](https://upload-images.jianshu.io/upload_images/23760537-8e4835c41def68c2.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

```sql
--两种情况
--1.新建数据库
CREATE DATABASE 数据库名称 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
--2.修改原有数据库
ALTER DATABASE 数据库名称 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

[sql django文档](https://docs.djangoproject.com/zh-hans/4.0/ref/databases/#mysql-notes)

 `utf8_general_ci` 字符序。这将导致所有字符串的平等比较以一种 *不区分大小写* 的方式
