var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'未登录',
    userAg0:'未设定',
    avatarUrl: "/images/my_light.png",
    loginstatus:'none',//登录态
    loginClose:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo){
      this.setData({
        username: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userAg0: '点击头像可登录/注册',
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: (res) =>{
        if(res.data){
          this.setData({
            username: res.data.realname,
            userAg0: (2018 - res.data.birthday.split('-')[0]) + (res.data.gender == 1 ? '岁-男-' : '岁-女-') + (2018 - res.data.workday.split('-')[0] + '年'),
          })
        }
      },
    })
    
  },


  outuser:function(){
    // 退出登录
    wx.showModal({
      title: '确定要退出当前帐号吗？',
      content: '',
      success:(res)=>{
        if(res.cancel){
          app.globalData.userInfo=null
        }else{

        }
      }
    })
  },
  gotojianli:function(){
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/jianli/jianli',
      })
    }else{
      //登录
      this.setData({
        loginClose: 'block'
      })
    }
  
  },
  loginClose:function(){
    this.setData({
      loginClose:'none'
    })
  },
  phonelogin:function(){
    wx.navigateTo({
      url: '/pages/phonelogin/phonelogin',
    })
  },
  wechatlogin:function(){
    //获取用户手机号

  },
  showModel:function(){
    wx.showModal({
      title: '温馨提示',
      content: '使用火娉企业版小程序，发布职位，招聘牛人',
      showCancel: false,
      confirmText: '知道啦',
    })
  }
})