// pages/details/details.js
Page({
  data: {
    url: '',
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    // console.log(options)
    this.setData({
      url: options.url,
    })

  }
})