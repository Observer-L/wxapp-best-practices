// index.ts
// 获取应用实例
Page({
  data: {
    motto: 'Hello World',
    jokes: [
      {
        "id": 18,
        "joke": "According to the Encyclopedia Brittanica, the Native American &quot"
      },
      {
        "id": 234,
        "joke": "According to the Encyclopedia Brittanica, the Native American &quot"
      },
      {
        "id": 16,
        "joke": "According to the Encyclopedia Brittanica, the Native American &quot"
      }
    ],
    avatar: "https://avatars0.githubusercontent.com/u/28595171",
    showSkeleton: true
  },
  togglePreview() {
    this.setData({
      showSkeleton: !this.data.showSkeleton
    })
  },
  onLoad() {
    setTimeout(() => {
      wx.request({
        url: 'http://api.icndb.com/jokes/random/5',
        success: (res: any) => {
          this.setData({
            showSkeleton: false,
            jokes: res.data.value
          })
        }
      })
    }, 2000)
  }
})
