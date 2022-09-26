---
title: jsIntro
category: javascript
date: 2022-09-04 20:25:14
tags:
---



# js基础知识

建议阅读 [现代 JavaScript 教程](https://zh.javascript.info/) ，分类细，写的水平也高

## promise

```javascript
function proDemo(num) {
    return new Promise(
        function (resolve, reject) {
            let a = num;
            if (a % 2) {
                resolve(a);
            } else {
                reject(a);
            }
        }
    );
}

function odd(params) {
    console.log(params + "是奇数");
}

function even(params) {
    throw new Error(params + " even error");
}

let promise = proDemo(10);
promise.then(odd, even).catch((err) => console.log(err + " catch"));
```





## 读取值

从对象读取值，如果为undefied，则赋值为 [ ]

```javascript
JSON.parse(localStorage.getItem('papers')) || []
```





## 对象



### 键

#### 键为变量

```javascript
let a = "abc";
{ [a] : "xxx"}
```

使用`[]`把作为键的变量包起来

#### 判断键是否存在

```js
a["age"];
a.hasOwnProperty('ndfaame');

```



在ECMAScript 5.1中，`Object.create`添加了该方法，该方法可以创建具有指定[[Prototype]]的对象。Object.create（null）是用于创建将用作Map的对象的常见模式。当假设对象将具有from的属性时，这可能会导致错误`Object.prototype`。该规则`no-prototype-builtins`防止`Object.prototype`直接从对象调用方法。有关no-prototype- [builtins的](https://link.segmentfault.com/?enc=FsNxJomTQgzXbjEhitvqQA%3D%3D.VHkpcZJbNlgkWLgDbVrmZUUf0oaFItnP6OFYpnVwch8EUIDvlxoZVXfBu9ptwc32XsPU2YtpSE8BHFDohMKQK6aYUOAPcUxJUhm%2B%2BKG8gF67svfB4U%2BLv%2BtYAJVLQKPs)更多信息，[请在此处访问ESLint的官方文档](https://link.segmentfault.com/?enc=O9WgdPCmtM%2BR5WU8AcCEOg%3D%3D.sDWCiaI0DokWtjXRjm286YDswrLZQB8se9fJvTytZEc37wSGXLSiDu9SwqQOvank35LfBI8G%2FeY02AYfqtvFJPnykog00DbdPfS5iAz6%2B3oUySi7xUX6iNk6ijPIX2Aq)。

```js
Object.prototype.hasOwnProperty.call(a, "jie");
```



### 单对象键值

获取单个对象的键和值

```javascript
let arr = { name: 'jie' };
let key = Object.keys(arr)[0];
let value = Object.values(arr)[0];
console.log(key, value);
```



### 结构赋值

直接拿到参数内部的属性，简化代码；

```js
let obj = {
    person: {
        name: "jie"
    }
}

const show1 = ({ person }) => {
    console.log(person);
}

// 结构赋值连续写法
const show2 = ({ person: { name } }) => {
    console.log(name);
}

show1(obj);
show2(obj);
```



输入结果如下：

```
{ name: 'jie' }
jie
```





## 数组

### 一维数组

指定声明数组的长度

`new Array(3)`;

如下所示，即使不指定数组长度，也无需担心数组越界

```js
let arr = new Array();
console.log(arr.length);

arr[10] = 11;
console.log(arr.length);
console.log(arr);
```

> [<10 empty items>, 11 ]



### 二维数组

#### 初始化

```js
let m = 3;
let n = 2;
const mat = new Array(m).fill(0).map(() => new Array(n).fill(0));
```

