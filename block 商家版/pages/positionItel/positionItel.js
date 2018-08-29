var utils = require('../..//utils/util.js')
const app = getApp()
Page({
  data: {},
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中',
    })
    console.log(options)
    var data={
      id: options.id
    }
    utils.sendRrquest('getresumeinfo', 1, data)
    .then((res)=>{
      if(res.data.status=='200'){
        this.setData({
          id: options.id,
          age:res.data.data.age,
          degree: res.data.data.degree,
          introduce: res.data.data.introduce,
          work_log: res.data.data.work_log,
          work_status: res.data.data.work_status,
          wx_avatar_url: res.data.data.wx_avatar_url,
          wx_gender: res.data.data.wx_gender,
          wx_nickname: res.data.data.wx_nickname,
          will: res.data.data.will,
          project: res.data.data.project,
          work:res.data.data.work
        })
      }
      wx.hideLoading()
    })
  },
  onShow: function () {
  
  },
  companyHome:function(){
    wx.navigateTo({
      url: '../companyHome/companyHome?id='+this.data.com_id
    })
  },
  gotochat:function(){
    wx.navigateTo({
      url: '../chat/chat?fid=' + this.data.id
    })
  }
})