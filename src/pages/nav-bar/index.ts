Page({
  data: {},
  handleSearch() {
    wx.showToast({
      title: '跳转到搜索页'
    })
  },
  handleBack() {
    console.log('回到上一级页面')
  },
  handleBackHome() {
    console.log('回到首页')
  },
  onLoad() {}
})
