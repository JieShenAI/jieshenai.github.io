---
title: this
category: javascript
date: 2022-09-21 09:54:35
tags:
---



# this

## 函数的this

### 单个函数的this是什么

window

### 嵌套函数的this

```javascript
function parent() {
        let name = "parent";
        function son() {
            let name = "son";
            console.log(this);
        }
        son();
    }
parent();
```

输出也是window



## 对象

### 单层函数

```js
let obj = {
    name: "obj",
    sayHi: function () {
    	console.log(this);
    },
}
obj.sayHi();
```

obj 这个对象

### 



```html
<script>
    let parent = {
        name: "parent",
        son() {
            let name = "son";
            let arrow = () => {
                console.log("arrow", this);
            };
            function th() {
                console.log("th", this);
            }
            return {
                name: "re",
                arrow,
                th,
            }
        }
    }
    parent.son().arrow();
    parent.son().th();
</script>

```



```
arrow {name: 'parent', son: ƒ}
th {name: 're', arrow: ƒ, th: ƒ}
```





```html
<script>
    grandPa = {
        name: "gradnPa",
        parent() {
            // let name = "parent";
            return function son() {
                let name = "son";
                let arrow = () => {
                    console.log("arrow", this);
                };
                function th() {
                    console.log("th", this);
                }
                return {
                    name: "re",
                    arrow,
                    th,
                }
            }
        }
    }
    grandPa.parent()().arrow();
    grandPa.parent()().th();
</script>
```



> arrow Window {window: Window, self: Window, document: document, name: '', location: Location, …}
> th {name: 're', arrow: ƒ, th: ƒ}
