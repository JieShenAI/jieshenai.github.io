---
title: Vue简洁之道
category: vue
date: 2022-09-22 21:56:49
tags:
---



# Vue 简化代码

下述代码是从组件中抽取出来的；

```js
export function fillParagraphText() {
    let nodes = this.$refs.content.childNodes;
    let arr = paragraphTextArr(nodes);
    this.$store.commit("paper/fill", { paperId: this.paperId, chse: this.chse, arr });
}
```



我们希望下述函数体内的this指向依然是原来的组件；只需在组件的`method`中接收上述函数即可；

```vue
methods: {
        fillParagraphText,
	}
```

因为javascript，this 它是动态的，this 由调用它的对象决定；
