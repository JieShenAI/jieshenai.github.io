---
title: less
category: css
date: 2022-09-16 15:19:35
tags:
---



# less

less官网： https://lesscss.org/

参考笔记： https://brucecai55520.gitee.io/bruceblog/notes/less/less.html

vscode安装插件：Easy LESS



浏览器测试

```css
<style type="text/less">
        .head {
            background-color: skyblue;
            p {
                color: red;
            }
        }
</style>

// 写在尾部
<script src="./less-1.3.1.min.js"></script>
```



注释

// 开头注释，不会被编译到css文件中

/**/包裹的注释，被编译到css文件中



## less 变量

```less
<style scoped lang="less">
@color: aqua;
@selector: p;
@c: color;

.head {
  @{selector} {
    @{c}: @color;
  }
}
</style>
```

`@{c}: @color;` 展示了属性名和属性值作为变量的写法；

属性名 和 选择器 作为变量需要用`{}`包裹；

### 变量的延迟加载

less 内的变量都是块级作用域， 延迟加载；

```less
@var: 0;
.class{
    @var: 1;
	.brass{
		@var: 2;
		three: @var; // 3,延迟加载
		@var: 3;
	}
	one: @var;
}
```

编译后的结果是：

```
.class{
	one: 1;
}
.class .brass{
	three: 3;
}
```



## css嵌套规则

```
.cls{
	&:hover{
		xxx
	}
}
```

&表示平级；

若不加编译之后是: `.cls :hover`，就变成了父子关系；



## less混合

混合将一系列属性从一个规则集，引入到另一个规则集；

```html
<div class="head">
    <p class="c1">
      文字
    </p>
    <p class="c2">
      文字
    </p>
</div>
```



### 普通混合

.c1 和 .c2 直接使用`.func`定义好的样式

```less
.func {
  color: red;
}

.head {
  .c1 {
    .func;
  }

  .c2 {
    .func;
  }
}
```



### 带参数的混合

带参数，指定默认值为 aqua

```
.func(@c: aqua) {
  color: @c;
}
```

调用

```
  .c1 {
    .func(pink);
  }

  .c2 {
    .func();
  }
```



### 命名参数

在传实参时，指定参数; 用于有多个参数和默认参数值时，指定传的参数；

```
.func(@c:aqua)
```



### 匹配模式

```vue
<template>
  <div class="container">
    <div class="son">
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHello"
}
</script>

<style scoped lang="less">
.pos(@_, @w, @h) {
  background-color: red;
}

.pos(L, @w, @h) {
  float: left;
  width: 200px;
  height: 200px;
}

.pos(R, @w, @h) {
  float: right;
  width: @w;
  height: @h;
}

.container {
  width: 300px;
  height: 300px;
  background-color: aquamarine;
  .son {
    .pos(R, 200px, 200px);
  }
}
</style>
```

`.pos`，通过在形参里添加标志L，R，从而避免了重新定义混合的问题；

`.pos(@_, @w, @h)` 都能匹配上，可以上公共部分放在其中。



### arguments  变量

实参列表

```less
.border(@w,@sytle,@c){
	border: @arguments;
}

.xxxClass {
	.border(1px,solid,black)
}
```



## 计算

在less计算中，双方只要有一方带单位就行了

```less
.xxxClass{
	width: (100 + 100px);
}
```



## 继承

混合的缺点：在转成css时，很多共有的css属性不能合并，这样导致文件变大；

如下的代码，在混合中实现不了

```less
h1,h2{
	...
}
```



继承不能带参数；

继承性能比混合高，灵活性没有混合强；

```less
.parent{
    background-color: aqua;
}

.div:extend(.parent){
    width: 200px;
    &:nth-child(1){
        font-size: 12px;
    }
}
```

### 父

```less
.parent{
    background-color: aqua;
}
```



错误写法❌

> 父后面不能跟()，也不能像继承那样参数

```
.parent(){
   
}
```



### 继承的两种写法

* 一

  ```less
  .div:extend(.parent){
  	
  }
  ```

* 二

  ```less
  .div{
  	&:extend(.parent);
  }
  ```

继承 all

```less
.parent{
    background-color: aqua;
}

.parent:hover{
    background-color: skyblue;
}
```

`.parent` 指定了鼠标悬浮更换背景色；在继承时，需要在其后加上 `all`, `.parent:hover` 才会生效；

```less
&:extend(.parent all);
```



编译成css

```css
.parent,
.div {
  background-color: aqua;
}
.div {
  width: 200px;
}
.div:nth-child(1) {
  font-size: 12px;
}
```

由于.div继承了.parent，故形成了如下代码

```css
.parent,
.div {
  background-color: aqua;
}
```



## 避免编译

