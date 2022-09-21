---
title: vuex
category: vue
date: 2022-09-15 16:45:12
tags:
---

# vuex



## 模块化写法

### index.js

`store/index.js`

```js
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	modules:{
		countAbout:countOptions,
		personAbout:personOptions
	}
})
```

### 子模块

`store/子模块.js`

```js
//求和相关的配置
export default {
	namespaced:true,
	actions:{
		jiaOdd(context,value){
			if(context.state.sum % 2){
				context.commit('JIA',value)
			}
		},
		jiaWait(context,value){
			setTimeout(()=>{
				context.commit('JIA',value)
			},500)
		}
	},
	mutations:{
		JIA(state,value){
			state.sum += value
		},
		JIAN(state,value){
			state.sum -= value
		},
	},
	state:{
		sum:0, //当前的和
		school:'尚硅谷',
		subject:'前端',
	},
	getters:{
		bigSum(state){
			return state.sum*10
		}
	},
}
```



### 分发请求

`personAbout/addPersonWang`:  前面是子仓库的模块名

```js
this.$store.dispatch('personAbout/addPersonWang',personObj);
this.$store.commit('personAbout/ADD_PERSON',personObj);
```



### 组件内简写形式

```vue
<template>
	<div>
		<h1>当前求和为：{{sum}}</h1>
		<h3>当前求和放大10倍为：{{bigSum}}</h3>
		<h3>我在{{school}}，学习{{subject}}</h3>
		<h3 style="color:red">Person组件的总人数是：{{personList.length}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		computed:{
			//借助mapState生成计算属性，从state中读取数据。（数组写法）
			...mapState('countAbout',['sum','school','subject']),
			...mapState('personAbout',['personList']),
			//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
			...mapGetters('countAbout',['bigSum'])
		},
		methods: {
			//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
			...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
			//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
			...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
		},
		mounted() {
			console.log(this.$store)
		},
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>
```



## 全局写法

> 不常用，不建议使用

每个子仓库都可以写成独立js文件，模板如下；

在分发请求时，无需写子仓库的模块名了；缺点很严重，不同子仓库里的函数不能重名；

`this.$store.dispatch('addPersonWang',personObj);`

```js
let state = {
    data: {},
    age: 18,
}

let actions = {

}

let mutations = {
    
}

//仓库计算属性
let getters = {

};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}
```

