Component({
  options: {
    multipleSlots: true 
  },
  properties: {
    title: {
      type: String
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
    },
    backgroundColor: {
      type: String,
      value: '#FFF'
    },
    color: {
      type: String,
      value: '#000'
    },
    searchPlaceholder: {
      type: String,
      value: '搜索一下'
    }
  },
  data: {
    bounding: {}
  },
  lifetimes: {
    attached() {
      this.setData({
        bounding: wx.getMenuButtonBoundingClientRect()
      })
    }
  },
  methods: {
    navigate(e:any) {
      const target = e.target.dataset.id;
      if (target === 'search') {
        this.triggerEvent('search')
      } else if (target === 'home') {
        this.triggerEvent('home')
        wx.navigateBack({
          delta: getCurrentPages().length
        })
      } else if (target === 'back') {
        this.triggerEvent('back')
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})
