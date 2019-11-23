Page({
  data: {
    showSkeleton: true
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        showSkeleton: false
      });
    }, 3000);
  }
});
