Component({
  properties: {
    images: {
      type: Array,
      required: true
    }
  },
  data: {
    placeholder: 'https://via.placeholder.com/100'
  },
  lifetimes: {
    ready() {
      const images = this.data.images;
      for (const i in images) {
        wx.createIntersectionObserver(this)
          .relativeToViewport({bottom: 20})
          .observe('.item-'+i, r => {
            if (r.intersectionRatio > 0) {
              images[i].show = true
            }
            this.setData({
              images
            })
          })
      }
    }
  }
})
