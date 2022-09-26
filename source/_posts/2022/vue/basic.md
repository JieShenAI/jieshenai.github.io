---
title: basic
category: vue
date: 2022-09-04 16:01:44
tags:
---

# vue

## 配置项

### 允许组件名为单个单词

在vue根目录下，增加`.eslintrc.js`文件，文件内容如下：

```js
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        //在rules中添加自定义规则
        //关闭组件命名规则
        "vue/multi-word-component-names": "off",
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}

```



## 组件

### 注册为全局 组件

```
//导入需要全局注册的组件
import Count from '@/components/Count.vue'

//参数1：字符串格式，表示组件的“注册名称”
//参数2：需要被全局注册的那个组件
Vue.component('MyCount',Count)
```



## v-for

### v-for 数据修改后，页面不变化原因

```html
<div v-for="data in paper" :key="data.id">
    <PImg :textObj="data" />
    {{data}}
</div>
```

paper的数据格式如下：

```js
[
	{
        id:xxx,
        value:xxx,
    },
    ...
]
```

若只更改paper某个value的数据:

* {{data}} 中的数据会变化

* `pImg`组件的数据不会变化

  只改变了value，:key="data.id"`没有变，vue不知道数据发生了变化，仍然使用上一次的虚拟dom，故新数据显示不出来。

在修改数据时，用一个新对象替代原来对象的做法是不对的，这样也会导致vue感知到不到数据的变化

❌

```js
state.data[key] = {
      value: newValue,
      id: nanoid(),
}
```

必须逐个修改对象的值：

```js
for (const key in paper) {
    if (paper[key].id == id) {
        paper[key].id = nanoid();
        paper[key].value = newValue;
    }
}
```



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

参考[点击](https://www.csdn.net/tags/NtTaAgwsMTYxMjktYmxvZwO0O0OO0O0O.html)

>computed是在DOM执行完成后立马执行（如：赋值）
>
>created执行时挂载阶段还没有开始，模版还没有渲染成html，所以无法获取元素。created钩子函数主要用来初始化数据。通常在created钩子函数里执行访问数据库的方法，然后返回数据给前端，前端data中定义全局变量接收数据
>
>mounted钩子函数一般用来向后端发起请求，拿到数据后做一些业务处理。该函数在模版渲染完成后才被调用。DOM操作一般是在mounted钩子函数中进行。
>methods方法有一定的触发条件，如click等。
>watch用于检测vue实例上数据的变动

* 需求一

  页面上的内容，由 axios 从服务器端拿回数据，并渲染到页面上。

  问题：当 axios 从服务器取回数据后，vue如何感知到数据发生了变化，并重新渲染模板。

### 参考链接

* https://blog.csdn.net/Quindrich/article/details/123667962
* https://blog.csdn.net/weixin_45791692/article/details/124045505

### props

props，在`data`函数调用前就可以拿到；故可用props接收参数后，在data函数中。

```js
props: ['id'],
  data() {
    return {
      id2: this.id,
    }
  },
```



* 建议在`created`阶段发起ajax请求



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



## 定时器

在一个函数中，修改完数据后，网页模板会重新解析。

希望在网页模板解析完成后执行某项操作，通常情况当前函数内容全部执行完，模板才会重新解析。

解决方法：使用 `setTimeout` 将该操作添加到队尾。计时的参数可以不用填。

```javascript
this.obj = this.getData();
setTimeout(() => {
    this.arr = this.fillParagraphText();
});
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
