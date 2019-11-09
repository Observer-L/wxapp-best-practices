// index.ts
// 获取应用实例
Page({
  data: {
    components: [
      {
        name: 'skeleton'
      },
      {
        name: 'lazy-load'
      }
    ]
  },
  navigate(e:any) {
    wx.navigateTo({
      url: `/pages/${e.target.dataset.id}/index`
    })
  },
  onLoad() {}
})

// declare const __wxConfig: any;
// console.log(__wxConfig);