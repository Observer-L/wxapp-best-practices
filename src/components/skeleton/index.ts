Component({
  properties: {
    selector: {
      type: String,
      value: 'skeleton'
    },
    loading: {
      type: String,
      value: 'flush'
    }
  },
  data: {
    skeletonStyles: ['flush', 'chiaroscuro'],
    systemInfo: {},
    skeletonRectLists: [],
    skeletonCircleLists: []
  },
  lifetimes: {
    attached() {
      // 默认首屏尺寸
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        systemInfo: {
          width: systemInfo.windowWidth,
          height: systemInfo.windowHeight
        },
        loading: this.data.loading
      })
    },
    ready() {
      //绘制背景
      wx.createSelectorQuery()
        .selectAll(`.${this.data.selector}`)
        .boundingClientRect()
        .exec(res => {
          this.setData({
            'systemInfo.height': res[0][0].height + res[0][0].top
          })
        });
  
      //绘制矩形
      this.rectHandle();
  
      //绘制圆形
      this.radiusHandle();
    }
  },
  methods: {
    rectHandle() {
      wx.createSelectorQuery()
        .selectAll(`.${this.data.selector} >>> .${this.data.selector}-rect`)
        .boundingClientRect().exec(res => {
          this.setData({
            skeletonRectLists: res[0]
          })
        });
    },
    radiusHandle () {
      wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-radius`).boundingClientRect().exec(res => {
        this.setData({
          skeletonCircleLists: res[0]
        })
      });
    }
  }
})