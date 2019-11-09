Page({
  data: {
    images: []
  },
  onLoad() {
    const images:any = [];
    for (let i = 0; i < 100; i++) {
      images.push({
        id: i,
        src: `https://picsum.photos/id/${i}/200/200?grayscale`
      })
    }
    this.setData({
      images
    })
  }
})
