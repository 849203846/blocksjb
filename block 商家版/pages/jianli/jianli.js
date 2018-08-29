var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addAddress:'none',
    username: '未登录',
    userAg0: '点击头像可登录/注册', 
    avatarUrl: "/images/my_light.png",
    phonenum:'',
    wantedlist: ['离职-随时到岗', '在职-暂不考虑', '在职-考虑机会', '在职-月内到岗'],
    weChatUserphone:'',
    wantedstatus:'1',
    myadvantagetext:'月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗月内到岗'
  },
  onShow:function(){
    app.onLaunch()
    wx.getStorage({
      key: 'aduiting',
      success: (res) => {
        this.setData({
          aduiting:res.data
        })
        var data={
          com_id: res.data.com_id
        }
        utils.sendRrquest('getpositionlist', 1, data)
          .then((res) => {
            console.log(res)
            //求职意向接口
            if (res.data.status === '200') {
              this.setData({
                positionlist: res.data.data
              })
              wx.setStorage({
                key: 'positionlist',
                data: res.data.data,
              })
            }
          })
      },
    })
  },
  addintention:function(e){
    wx.navigateTo({
      url: '../addintention/addintention?id=' + e.target.dataset.id,
    })
  }
})