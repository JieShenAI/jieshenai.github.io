---
title: vuex
category: vue
date: 2022-09-15 16:45:12
tags:
---

# vuex

在header组件中 ，dispatch

```
this.$store.dispatch("logout");
```

我好奇的是，为何它无需指明是哪一个子store？



- 监视数据变化

​	当基本类型的 state 中的数据发生变化时，vue能感知到；但对象内部数据发生变化时，无法被vue感知到。

​	采用 computed + watch的方式，v-if ，都失效了；

​	我把这个 state的数据放在 data里，就好了, vuex中的数据更新后，data中的数据也会同步更新

```
return {
            chse: "2-3",
            paper: this.$store.state.paper.data["2-3"],
        }
```



