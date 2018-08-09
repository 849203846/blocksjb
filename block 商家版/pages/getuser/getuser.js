var app=getApp()
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  bindgetuserinfo:function(){
    app.getuser()
    wx.reLaunch({
      url: '../index/index',
    })
  }
})