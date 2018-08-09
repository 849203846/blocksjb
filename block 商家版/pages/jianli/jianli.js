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
    console.log(app.globalData.userInfo)
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        {
          this.setData({
            weChatUserphone: res.data.wechat, 
            birthday: res.data.birthday, 
            workday: res.data.workday, 
            worklong: res.data.worklong, 
            phonenum: res.data.phone === '' ? '未填写':res.data.phone, 
            work_status: res.data.work_status, 
            age: res.data.age, 
            gender: res.data.gender,
            introduce: res.data.introduce,
            username: res.data.realname,
            avatarUrl: res.data.avatar_url,
            
            userAg0: (2018 - res.data.birthday.split('-')[0]) + (res.data.gender == 1 ? '岁-男-' : '岁-女-') + (2018 - res.data.workday.split('-')[0]+'年'),
          })
        }
      },
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     weChatUserphone: app.globalData.uyserInfo.wechat,
    //     phonenum: app.globalData.uyserInfo.phone,
    //     introduce: app.globalData.userInfo.introduce,
    //     username: app.globalData.userInfo.realname,
    //     avatarUrl: app.globalData.userInfo.avatarUrl,
    //     userAg0: '24岁 男 4年',
    //   })
    // }
    utils.sendRrquest('getwilllist', 1, {})
    .then((res)=>{
      console.log(res)
      //求职意向接口
      if(res.data.status==='200'){
        this.setData({
          willlist:res.data.data
        })
        wx.setStorage({
          key: 'willlist',
          data: res.data.data,
        })
      }
    })
    utils.sendRrquest('getworks', 1, {})
      .then((res) => {
        if (res.data.status === '200') {
          this.setData({
            getworks: res.data.data
          })
          wx.setStorage({
            key: 'getworks',
            data: res.data.data,
          })
        }
      })
    utils.sendRrquest('getprojects', 1, {})
      .then((res) => {
        if (res.data.status === '200') {
          this.setData({
            getprojects: res.data.data
          })
          wx.setStorage({
            key: 'getprojects',
            data: res.data.data,
          })
        }
      })
    utils.sendRrquest('geteducation', 1, {})
      .then((res) => {
        if (res.data.status === '200') {
          this.setData({
            geteducation: res.data.data
          })
          wx.setStorage({
            key: 'geteducation',
            data: res.data.data,
          })
        }
      })
    utils.sendRrquest('getsocial', 1, {})
      .then((res) => {
        if (res.data.status === '200') {
          this.setData({
            getsocial: res.data.data
          })
        }
      })
  },
  cloce:function(){
    this.setData({
      addAddress: 'none',
      address:'',
      addressid:''
    })
  },
  setname:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  baocun:function(){
    var data = {
      address: this.data.address
    }
    var url = 'addsocial'
    if (this.data.tankuangname === '添加社交地址'){
      url = 'addsocial'
    } else if (this.data.tankuangname === '修改社交地址'){
      url = 'savesocial'
      data.id = this.data.addressid
    }
    
    utils.sendRrquest(url, 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          this.cloce()
          this.onShow()
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
      })
  },
  deladdAddress:function(){
      var data={
        id:this.data.addressid
      }
    utils.sendRrquest('delsocial', 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          this.cloce()
          this.onShow()
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
      })
  },
  addAddress:function(){
    this.setData({
      addAddress:'block',
      tankuangname:'添加社交地址'
    })
  },
  setADDress:function(e){
    console.log(e)
    var address = e.target.dataset.address    
    var addressid = e.target.dataset.addressid
    this.setData({
      addAddress: 'block',
      tankuangname: '修改社交地址',
      address: address,
      addressid: addressid
    })
  },
  wantedstatus:function(){
    wx.showActionSheet({
      itemList: ['离职-随时到岗', '在职-暂不考虑', '在职-考虑机会','在职-月内到岗'],
      success:  (res) => {
        this.setData({
          wantedstatus:res.tapIndex
        })
        var data={
          work_status: res.tapIndex
        }
        utils.sendRrquest('saveworkstatus', 1, data)
        .then((res)=>{
          console.log(res)
          if(res.status==='200'){
            app.globalData.userInfo.work_status = res.tapIndex
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 500
            })
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  gotomyname:function(){
    wx.navigateTo({
      url: '../personaldata/personaldata',
    })
  },
  gomyadvantage:function(){
    wx.navigateTo({
      url: '../myadvantage/myadvantage',
    })
  },
  addintention:function(e){
    var id = e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../addintention/addintention?id='+id,
    })
  }
})