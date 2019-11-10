## 🚏 自定义自适应的导航栏组件

小程序原生导航栏有这么几个问题：
1. 不同系统表现不一致，iOS标题居中而安卓居左
2. 屏幕空间不能最大化使用
3. 不能设置字体大小和样式
4. 进入小程序非首页页面（活动页/扫码分享）时，需要先跳首页再跳目标页从而能够返回，留存用户
5. 不能监听导航栏菜单事件
6. 路由导航单一，只能够返回上一页，深层级页面的返回不够友好

> 自定义导航栏已支持指定页面使用，而非全局限定

小程序开放了自定义导航栏能力，可以很好地解决以上问题，但带来的是更多的适配工作量。

水滴屏、刘海屏。。。不同机型的顶部导航栏导致我们需要进行适配，但好在有了`getMenuButtonBoundingClientRect()`[>>>文档飞机](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html)，我们可以获取到小程序右上角胶囊菜单（位置固定）的视口位置，从而轻松定位。

![胶囊菜单定位示意图](https://camo.githubusercontent.com/b424e79021e2d5ee779c261b9e66f3941be2107b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f382f31362f313663393630326537376331333136623f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)

## ⚡️ API
#### Props
| Options           | Type    | Required | Default  | Description                                                                                         |
| ----------------- | ------- | -------- | -------- | --------------------------------------------------------------------------------------------------- |
| title             | String  | No       |          | 导航栏标题，如果不提供，则名为 `center` 的 slot 有效                                                |
| backgroundColor   | String  | No       | #FFF     | 导航背景色                                                                                          |
| color             | String  | No       | #000     | 导航栏标题字体颜色                                                                                  |
| showBack          | Boolean | No       | false    | 是否显示返回按钮，默认点击按钮会执行 `navigateBack` 返回1层；如为 false，则名为 `left` 的 slot 有效 |
| showHome          | Boolean | No       | false    | 是否显示 返回主页 按钮                                                                              |
| showBorder        | Boolean | No       | true     | 是否显示导航栏底部边界                                                                              |
| showSearchBar     | Boolean | No       | false    | 是否显示搜索框，默认点击按钮会执行 onSearch，如果为 false，则名为 center 的 slot 有效               |
| searchPlaceholder | String  | No       | 搜索一下 | 搜索框文字                                                                                          |
| loading（TODO）   | Boolean | No       | false    | 页面数据加载时loading动效                                                                           |

#### Events
| Event Name | Description        | Arguments |
| ---------- | ------------------ | --------- |
| back       | 点击返回按钮时触发 |           |
| home       | 点击主页按钮时触发 |           |
| search     | 点击搜索框时触发   |           |

#### Slot
| Slot Name | Description                                                         | Arguments |
| --------- | ------------------------------------------------------------------- | --------- |
| left      | 自定义左侧区域内容，当`showBack`为`false`时生效                     |           |
| center    | 自定义中间区域内容，当`showSearchBar`为`false`且`title`未设置时生效 |           |
