var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    area:[]
  },
  onLoad:function(op){
    if(op.id){
      this.setData({
        id:op.id
      })
    }
  },
  onShow: function () {
    var data = {}
    utils.sendRrquest('getarea', 1, data)
      .then((res) => {
        this.setData({
          area:res.data.data
        })
      })
  },
  back:function(e){
    if (this.data.id!='undefined' && this.data.id){
     var id=this.data.id
     wx.getStorage({
       key: 'willlist',
       success: function(res) {
         for (var i = 0; i < res.data.length;i++){
           if(id==res.data[i].id){
             res.data[i].area_name = e.target.dataset.area_name
             res.data[i].area_id = e.target.dataset.getareaid
             wx.setStorage({
               key: 'willlist',
               data: res.data,
             })
             wx.navigateBack({
               delta:1
             })
             return 
           }
         }
       },
     })
    }else{
      app.globalData.area_name = e.target.dataset.area_name
      app.globalData.area_id = e.target.dataset.id
      wx.navigateBack({
        delta: 1
      })
    }
   
  }
})