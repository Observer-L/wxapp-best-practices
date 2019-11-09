declare const __wxConfig: any
const components = __wxConfig.pages.slice(1).map((i:string) => {
  return {
    name: i.split('/')[1]
  }
})

Page({
  data: {
    components
  },
  navigate(e:any) {
    wx.navigateTo({
      url: `/pages/${e.target.dataset.id}/index`
    })
  },
  onLoad() {}
})
