---
title: router
category: vue
date: 2022-09-16 09:53:06
tags:
---



# 路由

## main.js 引入

```javascript
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
Vue.use(VueRouter)

new Vue({
	el:'#app',
	render: h => h(App),
	router:router
})
```





## 基本路由

### path

使用路由的path

```vue
<router-link to="{
	path: "/home/news"                                         
    }">
    ...
</router-link>
```



若有`<router-link>` 必须在当前组件指定 `<router-view></router-view>`



### name

使用路由的name

```vue
<router-link :to="{
	name:'xiangqing',				
    }">
</router-link>
```



## 路由传参

### query参数

传递query参数

```vue
<router-link :to="{
	...
	query:{
		id:m.id,
		title:m.title
		}
	}">
{{m.title}}
</router-link>
```

接收query参数

```
{{ $route.query.id }}
```



### params 参数

```vue
<router-link :to="{
	...
	params:{
		id:m.id,
		title:m.title
		}
	}">
</router-link>
```



### 路由props

目的：为了让路由读参数读的更容易；



不使用props接收参数，如下所示，这样很繁琐：

```js
this.$route.query.xxx;
this.$route.params.xxx;
```



路由的props与组件的props一样，都需要在组件中使用：`props: ['id', 'title', ...],` 来接收

不同的是，路由的props，在 `router/index.js` 中，进行配置



#### 方式一 不常用

	//props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给组件。
	props:{a:1,b:'hello'}

组件接收：

```
props:['a','b']
```



#### 方式二

props的第二种写法，值为布尔值;

若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件。

```js
props:true;
```

组件接收：

```js
props: ['xxx',..]
```

缺点：

**只处理param参数，不处理query参数**



#### 方式三

props的第三种写法，值为函数

其实工作量没有减少，将本应在组件内写的代码，移到`router/index.js`中

```js
props($route){
    return {
        id: $route.query.id,
        title: $route.query.title,
        a: 1,
        b: 'hello'
    }
}
```

组件接收：

```
props: ['id', 'title', 'a', 'b'],
```

问？组件的 props 和 路由的 props，都能在  `props: ['id', 'title']`  中接收吗？

> 试了一下，发现不能一起接收

若觉得 `$route.query.id,` 写的很长可以使用结构赋值的连续写法

```js
props({query:{id,title}}){
    return {
        id,
        title,
        a: 1,
        b: 'hello'
    }
}
```

