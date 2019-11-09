## 👀 使用intersectionObserver实现图片懒加载
传统的图片懒加载解决方案需要开发者去处理图片与视口的距离关系：监听页面scroll事件，调用目标元素的`getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断其是否在视口之内。

缺点显而易见：
1. scroll事件带来的极大计算量容易造成性能问题
2. 即使有`debounce`处理，整体实现过于复杂难懂


近几年出的新API`IntersectionObserver`就是一个更为优雅的**视口观察者**，由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

> 浏览器支持情况见[CanIUse](https://caniuse.com/#search=IntersectionObserver)。

微信小程序也提供了[IntersectionObserver](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.html)对象，用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。


## ⚡️ API

| Options           | Type   | Required | Default | Description                                      |
| ----------------- | ------ | -------- | ------- | ------------------------------------------------ |
| images            | Array  | Yes      |         | 每个image元素都有一个源链接`src`和加载开关`show` |
| direction（TODO） | string | No       | column  | 图片流的方向（横竖）                             |


## 📋 使用指南
1. 引入组件
```json
// index.json
{
  "usingComponents": {
    "lazy-load": "path/to/your/components/lazy-load/index"
  }
}
```


2. 配置图片元素
```js
// index.ts
Page({
  data: {
    images: []
  },
  onLoad() {
    // 测试数据接口
    const images:any = [];
    for (let i = 0; i < 100; i++) {
      images.push({
        id: i,
        src: `https://picsum.photos/id/${i}/200/200?grayscale`
      })
    }
    this.setData({
      images
    })
  }
})
```

3. 页面引入组件
```html
// index.wxml
<lazy-load images="{{images}}"></lazy-load>

// lazy-load.wxml
<view wx:for="{{images}}" wx:key="{{index}}">
  <image src="{{item.show ? item.src : placeholder}}" class="pic item-{{index}}" />
</view>
```

4. 业务逻辑处理
```js
Component({

  ...

  lifetimes: {
    ready() {
      const images = this.data.images;
      for (const i in images) {
        wx.createIntersectionObserver(this)
          .relativeToViewport({bottom: 20})
          .observe('.item-'+i, r => {
            if (r.intersectionRatio > 0) {
              images[i].show = true
              // 可在此处理更多观察逻辑
            }
            this.setData({
              images
            })
          })
      }
    }
  }
})
```

## 🔍 参考阅读
1. [IntersectionObserver API 使用教程 - @阮一峰 ](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html) 