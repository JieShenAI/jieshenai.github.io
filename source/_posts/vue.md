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



## 生命周期

* 需求一

  页面上的内容，由 axios 从服务器端拿回数据，并渲染到页面上。

  问题：当 axios 从服务器取回数据后，vue如何感知到数据发生了变化，并重新渲染模板。



## 自定义事件

> 涉及到子给父传东西

在父组件中，给子组件添加一个自定义事件，@后面跟事件名，再跟事件的回调函数。比如：`@getA="getA"`。

点击了子组件的按钮后，父组件接收到了子组件传过来的a。

子组件执行 `this.$emit("getA", "xxx")`后，只有对应的父组件才会对此响应。

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



## 全局事件总线

前面的自定义事件，只能是父子组件之间传递数据，孙子组件则不能传递数据；故引出了总线；

### 导入

在`main.js`中，进行引入

```
new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})
```

### 绑定

```javascript
mounted() {
    this.$bus.$on('checkTodo',this.checkTodo);
}
```

### 解绑

```javascript
beforeDestroy() {
	this.$bus.$off('checkTodo');
}
```

### emit

```javascript
methods: {
    //勾选or取消勾选
    handleCheck(id){
        //通知App组件将对应的todo对象的done值取反
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo',id)
    }
}
```



## 本地存储

### 写入

`deep:true `表示当 `todos` 对象的数据发生变化后，也能监视到；若不写`deep`，则只能监视到值的变化，不能监视到对象内部值的变化。

```javascript
watch: {
			todos:{
				deep:true,
				handler(value){
					localStorage.setItem('todos',JSON.stringify(value))
				}
			}
		}
```

### 读取

```
data() {
			return {
				//由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
				todos:JSON.parse(localStorage.getItem('todos')) || []
			}
		},
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



案例：

```
if(todo.hasOwnProperty('isEdit')){
    todo.isEdit = true;
}else{
    // console.log('@')
    this.$set(todo,'isEdit',true)
}

todo.isEdit = false;
```

给对象绑定属性，得先用 `xxxobj.hasOwnProperty("xxxattr")`，判断它是否有某个属性。

没有该属性，才 `this.$set(xxxobj,"xxxattr","初始值")`



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
