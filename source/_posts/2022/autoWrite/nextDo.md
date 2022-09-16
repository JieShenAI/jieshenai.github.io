---
title: nextDo
category: autoWrite
date: 2022-09-04 17:17:12
tags:
---





```
init(obj) {
    this.avgGdp = obj.avgGdp
    this.avgProvinceGdp = obj.avgProvinceGdp
    this.cityID = obj.cityID
    this.countryGdp = obj.countryGdp
    this.countryGdpIncrease = obj.countryGdpIncrease
    this.gdp = obj.gdp
    this.gdpIncrease = obj.gdpIncrease
    this.provinceGdp = obj.provinceGdp
    this.provinceGdpIncrease = obj.provinceGdpIncrease
    this.year = obj.year
},
```

在每个页面都这样写，太丑了。遍历data中的数据，如果obj含有该属性则对data中的数据进行赋值。



<hr/>

发起网络请求的代码，建议移到showPaper组件内。资源加载后，存放在浏览器的缓存内。

```
getData() {
      let url = "http://localhost:80/api/jsons/query?year=2021&cityID=422801";
      axios.get(url).then(
        (response) => {
          console.log("请求成功了", response.data);
          this.init(response.data);

          setTimeout(() => {
            this.fillParagraphText();
          });
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
```



<hr/>

存储在浏览器内存的内容，保存时间多久，会不会存在用户一直在本地编辑不提交，从而丢失用户数据的问题？



