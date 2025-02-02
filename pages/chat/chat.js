Page({
  data: {
    url: 'http://localhost:3000'
  },

  onLoad() {
    console.log('正在加载页面:', this.data.url)
  },

  onError(e) {
    console.error('web-view加载失败:', e.detail)
    wx.showToast({
      title: '加载失败，请检查本地服务',
      icon: 'none',
      duration: 2000
    })
  }
})