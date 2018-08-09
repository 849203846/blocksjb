var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    introduce:''
  },
  onLoad:function(){
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        if (res.data.introduce){

          this.setData({
            userInfo:res.data,
            introduce: res.data.introduce
          })
        }
      },
    })
  },
  setintroduce:function(e){
      this.setData({
        introduce: e.detail.value
      })
  },
  submit:function(){
    var that=this
    var data={
      introduce: this.data.introduce
    }
    var userInfo=that.data.userInfo
      userInfo.introduce=this.data.introduce
    this.setData({
      userInfo: userInfo
    })
    
    utils.sendRrquest('saveintroduce', 1, data)
    .then((res)=>{
      console.log(res)
      if(res.data.status==='200'){
        wx.setStorage({
          key: 'userInfo',
          data: that.data.userInfo,
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 500,
          success:function(){
           
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },500)
          }
        })
       
      }else{
        wx.showToast({
          title: '修改失败',
          icon: 'success',
          duration: 500
        })
        wx.navigateBack({
          delta:1
        })
      }
    })
  }

})