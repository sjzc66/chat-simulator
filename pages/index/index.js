Page({
  launchChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
      success: (res) => {
        console.log('跳转成功')
      },
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showToast({
          title: '请确保本地服务已启动',
          icon: 'none'
        })
      }
    })
  }
})