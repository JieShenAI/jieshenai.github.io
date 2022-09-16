---
title: hexo
category: tools
date: 2022-09-04 15:32:43
tags:
---



## 文章按类别存储

原来的博客文章全部保存在 `_post`目录下，显得很杂乱。在`_config.yml`中增加 `cate`，修改后的文件的链接和保存的地址



1.  在主目录的`_config.yml`指定目录的名

   ```
   category_dir: cate
   permalink: :year/:category/:title/
   new_post_name: :year/:category/:title.md # File name of new posts
   ```

   在这里使用 `category` 而不是`categories`，因为`:categories`是一个对象，如果该文章有多个类别不易存储。

2. 修改主题目录的`_config.yml`

   ```
     分类: /categories
   ```



3. 新增文章时，指定`category`属性值

   ```
   hexo new xxx --category 类别名
   ```

   若想指定多个类别可以使用 `categories`
