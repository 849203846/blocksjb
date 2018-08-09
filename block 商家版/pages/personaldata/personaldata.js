var utils=require('../..//utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat:'',
    tankuangstatus:'none',
    Sex:'1',
    realname:'未获取到',
    brith_at:' 2018-01-01',
    date: ' 2018-01-01',
    selectorArray: ['男', '女'],
    wechartel:'未填写'
  },
  onShow:function(){
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data)
        that.setData({
          userInfo:res.data,
          brith_at: res.data.birthday,
          workday: res.data.work_at,
          gender: res.data.gender,
          wechartel: res.data.wechat,
          realname: res.data.realname
        })
      },
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      DateOfNirth: e.detail.value
    })
  },
  bindMultiPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      DateOfNirths: e.detail.value
    })
  },
  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Sex: e.detail.value
    })
  },
  close:function(){
    this.setData({
      tankuangstatus: 'none'
    })
  },
  opensetname:function(){
    this.setData({
      tankuangstatus: 'block',
      tankuangname:'姓名',
      name: this.data.realname
    })
  },
  weichattel: function () {
    this.setData({
      tankuangstatus: 'blcok',
      tankuangname: '微信号',
      name: this.data.wechartel
    })
  },
  setname:function(e){
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  setnames:function(){
    if (this.data.tankuangname ==='姓名'){
      this.setData({
        realname: this.data.name
      })
    }else{
      this.setData({
        wechartel: this.data.name
      })
    }
    this.close()
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindbrith_atChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      brith_at: e.detail.value
    })
  },
  set:function(){
    var data={
      real_name: this.data.realname,
      wx_gender:++this.data.Sex,
      brith_at: this.data.brith_at,
      work_at: this.data.date,
      wechat: this.data.wechartel
    }
    utils.sendRrquest('saveuser', 1, data)
    .then((res)=>{
      var userInfo = this.data.userInfo
      userInfo.realname = this.data.realname
      userInfo.work_at = this.data.workday
      userInfo.birthday = this.data.brith_at
      userInfo.gender = this.data.gender
      userInfo.wechat = this.data.wechartel
      if (res.data.status==='200'){
        wx.setStorage({
          key: ' userInfo',
          data: userInfo,
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 500
        })
        wx.navigateBack({
          delta:1
        })
      }else{
        wx.showModal({
          title: '温馨提示',
          content: '保存失败',
        })
      }
    })
  },

})
