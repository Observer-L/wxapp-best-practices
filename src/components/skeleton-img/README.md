# 💀 小程序图片版骨架屏解决方案
> 使用图片自定义模板骨架屏，可以更灵活地实现多种骨架屏样式，也是业界主流的应用

<image src="/showcase/skeleton-IG.gif" alt="instagram 骨架屏" style="width:400px;">

<image src="/showcase/skeleton-img.gif" alt="使用效果展示" style="width:400px;">


## ⚡️ API

| Options | Type    | Required | Default | Description      |
| ------- | ------- | -------- | ------- | ---------------- |
| static  | Boolean | No       | false   | 是否关闭闪烁动画 |

## 📋 使用指南
1. 创建骨架屏模板组件并引入图片组件
```json
// skeleton-img-template.json
{
  "usingComponents": {
    "skeleton-img": "path/to/your/components/skeleton-img/index"
  }
}
```
2. 在页面中引入组件并设置相应样式
```html
<!-- skeleton-img-template.wxml -->
<view class="container">
  <view class="head">
    <skeleton-img skeleton-class="avatar" static="{{true}}"></skeleton-img>
    <view class="info">
      <skeleton-img skeleton-class="line long" static="{{true}}"></skeleton-img>
      <skeleton-img skeleton-class="line" static="{{true}}"></skeleton-img>
    </view>
  </view>
  <skeleton-img></skeleton-img>
</view>
```

```less
@avatarSize: 30px;
.container {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
}

.head {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar {
  width: @avatarSize;
  height: @avatarSize; 
  border-radius: 50%;
  margin-right: @avatarSize / 3;
}

.info {
  height: @avatarSize;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.line {
  width: @avatarSize * 2;
  height: @avatarSize / 3;
  &.long {
    width: @avatarSize * 3;
  }
}
```

3. 在实际页面中引入骨架屏模板
```json
// page.json
{
  "usingComponents": {
    "skeleton-img-template": "path/to/your/components/skeleton-img-template/index"
  }
}
```

