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
    utils.sendRrquest('getpositioninfo', 1, data)
    .then((res)=>{
      console.log(res.data.data)
      var data=res.data.data
      this.setData({
        area_name: data.area_name,
        company_shortname: data.company_shortname,
        id: data.id,
        logo_url: data.logo_url,
        max_pay: data.max_pay,
        min_education: data.min_education,
        min_pay: data.min_pay,
        position: data.position,
        recruiters: data.recruiters,
        user_id: data.user_id,
        work_exp: data.work_exp,
        wx_avatar_url: data.wx_avatar_url,
        work_exp: data.work_exp,
        real_name: data.real_name,
        min_education: data.min_education,
        tag_one:data.tag_one,
        tag_two:data.tag_two,
        tag_three:data.tag_three,
        company_fullname: data.company_fullname,
        trade: data.trade,
        logo_url: data.logo_url,
        address: data.address,
        describe: data.describe,
        com_id: data.com_id
      })
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
      url:'../chat/chat?fid=' + this.data.user_id
    })
  }
})