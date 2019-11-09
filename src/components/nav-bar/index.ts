Component({
  properties: {
    title: {
      type: String,
      value: 'default title'
    },
    showHome: {
      type: Boolean,
      value: true
    },
    showSearchBar: {
      type: Boolean,
      value: false
    },
    showBorder: {
      type: Boolean,
      value: true
    },
    showBack: {
      type: Boolean,
      value: true
    }
  },
  data: {
    bounding: {}
  },
  lifetimes: {
    attached() {
      console.log(wx.getMenuButtonBoundingClientRect());
      
      this.setData({
        bounding: wx.getMenuButtonBoundingClientRect()
      })
    }
  },
  methods: {
    navigate(e:any) {
      const target = e.target.dataset.id;
      if (target === 'search') {
        wx.showToast({
          title: '跳转到搜索页'
        })
        // wx.redirectTo({
        //   url: '/pages/search/index'
        // })
        return;
      }
      wx.navigateBack({
        delta: target === 'home' ? getCurrentPages().length : 1
      })
    }
  }
})
