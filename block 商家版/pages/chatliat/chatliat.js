var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    utils.sendRrquest('getchatlist',1,{})
    .then((res)=>{
      console.log(res.data.data.data)
      this.setData({
        list:res.data.data.data
      })
    })
  },
})