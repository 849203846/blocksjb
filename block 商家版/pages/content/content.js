var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    introduce: ''
  },
  onLoad: function (optype) {
    console.log(optype)
    this.setData({
      optype: optype.type,
      introduce: optype.content
    })
  },
  setintroduce: function (e) {
    this.setData({
      introduce: e.detail.value
    })
  },
  submit: function () {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.optype&&this.data.optype==='content'){
      app.globalData.work_content = this.data.introduce
    } else if (this.data.optype && this.data.optype ==='desc'){
      app.globalData.desc = this.data.introduce
    } else if (this.data.optype && this.data.optype === 'exper'){
      app.globalData.exper = this.data.introduce
    } else {
      app.globalData.work_ach = this.data.introduce
    }
   setTimeout(()=>{
     wx.hideLoading()
     wx.navigateBack({
       delta: 1
     })
   },500)
  }

})