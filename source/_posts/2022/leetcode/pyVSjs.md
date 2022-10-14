---
title: pyVSjs
category: leetcode
date: 2022-10-08 10:40:25
tags:
---



# pyVSjs



## 数组赋值

### 一维数组

python

`arr = [0] * n;`

javascript

`const idx1 = new Array(n).fill(0);`



## 判真

经常会使用 `while(xxx)` 或者 `if(xxx)`

`[ ]` 空数组

python

* `[ ]` 转 bool是 False

javascript

* `[ ]` 转bool是 true



## 排序

### 排序基础知识

javascript

```javascript
arr = [...];
arr.sort((a,b)=>a-b);
```

* `arr.sort((a,b)=>a-b); `

  从小往大排序

* `arr.sort((a,b)=>b-a); `

  从大往小排序

js的 arr.sort()，与python不同，js有返回值的，但是返回值是原数组的引用，不是深拷贝；

py的arr.sort()，无返回值；

### 保留下标排序

希望数组经过排序后，依然保留着原先的下标

python

```python
n = len(nums1)
idx1 = list(range(n))
idx1.sort(key=lambda x: nums1[x])
```

javascript

```js
idx1.sort((i, j) => nums1[i] - nums1[j]);
```

