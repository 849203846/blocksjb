// pages/upjianli/upjianli.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    wx.showModal({
      title: '温馨提示',
      content: '程序猿正在拼命开发中',
      success:function(){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },

})