// 嵌套函数
function parent() {
    // let name = "parent";
    return function son() {
        console.log(this);
        return "son";
    }
}

console.log(parent()());