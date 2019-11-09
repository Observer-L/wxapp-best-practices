# 💀 小程序骨架屏解决方案
> 基于[@jayZOU](https://github.com/jayZOU/skeleton)代码进一步优化的解决方案。

## ⚡️ API

| Options  | Type   | Required | Default | Description                                                                                                                                                               |
| -------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector | String | No       | skelton | 渲染节点的标识前缀，比如```selector="skeleton"```，那么页面根节点就是```class="skeleton"```绘制矩形就是```class="skeleton-rect"```，圆形就是```class="skeleton-radius"``` |
| loading  | String | No       | flush   | 骨架屏渲染时的动画，有`flush`和`chiaroscuro`                                                                                                                              |

## 📋 使用指南
1. 引入组件
```json
// index.json
{
  "usingComponents": {
    "skeleton": "path/to/your/components/skeleton/index"
  }
}
```

2. 配置占位元素
```js
// index.ts
Page({
  data: {
    // 需要默认占位数据，以绘制骨架
    jokes: [
      {
        "id": 18,
        "joke": "According to the Encyclopedia Brittanica, the Native American &quot"
      },
        ...
      {
        "id": 18,
        "joke": "According to the Encyclopedia Brittanica, the Native American &quot"
      }
    ],
    avatar: "https://example.com/avatar.png",
    showSkeleton: true // 骨架屏开关
  },
  onLoad() {
    setTimeout(() => {
      wx.request({
        url: 'http://api.icndb.com/jokes/random/5', // 数据测试API
        success: (res: any) => {
          // 业务侧可以自行判断数据是否加载完成，进而隐藏骨架屏
          this.setData({
            showSkeleton: false,
            jokes: res.data.value
          })
        }
      })
    }, 2000) // 延迟执行数据请求以预览效果
  }
})
```

3. 在页面中引入组件
```html
<!-- 引入骨架屏模版 -->
<skeleton loading="flush" wx:if="{{showSkeleton}}"></skeleton>

<!--index.wxml-->
<view class=" container skeleton">
  <!-- 图片 -->
  <image class="userinfo-avatar skeleton-radius" src="{{avatar}}" mode="cover"></image>
  <!-- 文字 -->
  <text class="user-motto skeleton-rect">{{motto}}</text>
  <!-- 列表 -->
  <view class="list">
    <view class="skeleton-rect" wx:for="{{jokes}}" wx:key="{{item.id}}">
      {{index+1}} - {{item.joke}}
    </view>
  </view>
</view>
```

## 🎨 注意事项
1. 最小节点原则
以最小节点原则添加相应的class，比如
`<view class="box skeleton-rect">这是有margin和padding属性的文案</view>`
这里不要给view添加class，不然绘制区域会大很多，应该改成这样
`<view class="box"><text class="skeleton-rect">这是有margin和padding属性的文案</text></view>`


## 🔍 参考阅读
1. [Everything you need to know about skeleton screens - uxdesign.cc @Bill Chung ](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) 