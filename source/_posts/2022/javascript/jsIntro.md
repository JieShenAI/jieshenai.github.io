---
title: jsIntro
category: javascript
date: 2022-09-04 20:25:14
tags:
---





[推荐阅读](https://zh.javascript.info/)

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



## 值

从对象读取值，如果为undefied，则赋值为 [ ]

```javascript
JSON.parse(localStorage.getItem('papers')) || []
```



## tips

### 键为变量

```javascript
let a = "abc";
{ [a] : "xxx"}
```

使用`[]`把作为键的变量包起来



### 单对象键值

获取单个对象的键和值

```javascript
let arr = { name: 'jie' };
let key = Object.keys(arr)[0];
let value = Object.values(arr)[0];
console.log(key, value);
```

