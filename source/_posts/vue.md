---
title: vue
date: 2022-08-29 09:05:42
categories: vue
tags:
---

# vue



## 消息订阅与发布

> 用的不多，在vue中常用 事件总线

推荐包:  `pubsub-js`

装包:  `npm i pubsub-js`

导入包：`import pubsub from 'pubsub-js'`



### 订阅消息

```
this.pubId = pubsub.subscribe('hello',function(msgName,data){
	// console.log(this); 问：这里的this为什么是undefined
})
```

订阅`hello`,当有人发布`hello`后，执行回调函数。`pubsub.subscribe`回调函数里的 this 不是vc 。因为vue承诺函数内的this是vc，而第三方库函数里的this不会这样设置。若需要使用vc，可参考下述的**两种写法**。

每一次订阅后，都有一个订阅的id。避免取消订阅的函数读取不到pubId，所以把它放在 `this` 身上。

* msgName

  订阅名，即“hello”

* data

  发布的数据

 

正确写法 √

方式一,**箭头函数**：

```
mounted(){
    this.pubId = pubsub.subscribe('hello',(msgName,data) => {
        console.log(this); // 这里的this是vc
    })
}
```



方式二：

```
methods:{
	demo(msgName,data){
		console.log(data,this);// 这里的this是vc
	}
},
mounted(){
    this.pubId = pubsub.subscribe('hello',this.demo)
}
```



### 发布消息

```
pubsub.publish('hello',666)
```



### 取消订阅

```
beforeDestroy(){
	pubsub.unsubscribe(this.pubId)
}
```



## 自定义事件

> 涉及到子给父传东西

在父组件中，给子组件添加一个自定义事件，@后面跟事件名，再跟事件的回调函数。比如：`@getA="getA"`。

点击了子组件的按钮后，父组件接收到了子组件传过来的a。

父组件代码

```javascript
<template>
    <div>
        <h1>This is Father! A is {{ a }}</h1>
        <Son @getA="getA"></Son>
    </div>
</template>

<script>
import Son from '@/components/Son.vue';
export default {
    data() {
        return {
            a: 10,
        }
    },
    components: {
        Son
    },
    methods: {
        getA(value) {
            this.a = value;
        }
    }
}
</script>
```

子组件代码

```javascript
<template>
    <div>
        <h2>This is son!</h2>
        <button @click="send">点击</button>
    </div>
</template>

<script>
export default {
    methods: {
        send() {
            this.$emit("getA", "A from son");
        }
    }
}
</script>
```



## 常用操作

### 确认删除

```javascript
methods: {
        handle() {
            if (confirm('确定删除吗？')) {
                //通知App组件将对应的todo对象删除
                console.log("已删除");
            } else {
                console.log("取消");
            }
        }
    }
```



## API

### $set

在vc中添加一个数据后，这个数据的修改后不会重新加载模板

```
this.$set(obj,'attr',true);
```

 

### $nextTick



```javascript
xxxfunc(){
    //修改数据
    this.$nextTick(
        function(){
			
        }
    )
}  
```

在xxxfunc函数内，修改了数据，会导致模板重新解析。

比如，模板重新解析后，页面上会出现输入款，想拿到输入框的焦点，需要执行`this.$refs.xxx.focus()`。在`xxxfunc`函数内的操作全部执行完毕后，输入框才会解析出来。

故将获取输入框的代码，放在 `$nextTick()`内，表示在本轮解决后，再执行。
