var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area_name:'未选择',
    multiIndex:[],
    multiArray: [
      ['1k', '2k','3k', '4k', '5k', '6k', '7k'],
      ['1k', '2k','3k', '4k', '5k', '6k', '7k','8k','9k','10k','11k','12k','13k','14k','15k',]],
  },
  onLoad:function(op){
    var multiArray=[[],[]]
    for(var i=1;i<250;i++){
      multiArray[0].push(i+'k')
      multiArray[1].push(i + 'k')
    }
    this.setData({
      multiArray
    })
    if (JSON.stringify(op)!='{}'){
      var id = op.id
      this.setData({
        id:op.id
      })

    }
  },
  onShow: function (options) {
    if (this.data.id != 'undefined' && this.data.id){
      var id = this.data.id
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          console.log(res.data)
          var list = res.data
          for (var i = 0; i < list.length; i++) {
            if (id == list[i].id) {
              var pay_start, pay_end
              for (var j = 0; j < this.data.multiArray[0].length; j++) {
                if (this.data.multiArray[0][j].split('k')[0] == list[i].pay_start) {
                  pay_start = j
                }
              }
              for (var j = 0; j < this.data.multiArray[1].length; j++) {
                if (this.data.multiArray[1][j].split('k')[0] == list[i].pay_end) {
                  pay_end = j
                }
              }
              console.log(pay_end, pay_start)
              this.setData({
                area_name: list[i].area_name,//城市name
                area_id: list[i].area_id,//城市id
                fidname: list[i].job_name, //职位
                job_id: list[i].job_id,
                multiIndex: [pay_start, pay_end], //薪资
                id: id,
                trade_id_one: list[i].trade_id_one, // 期望行业 多选
                trade_name_three: list[i].trade_name_three,
                trade_id_two: list[i].trade_id_two,
                trade_name_one: list[i].trade_name_one,
                trade_name_two: list[i].trade_name_two,
                trade_name_three: list[i].trade_name_three
              })
              break
            }
          }
        },
      })
      // return;
    } else if (app.globalData.fid){
      this.setData({
        job_id: app.globalData.fid,
        fidname: app.globalData.job
      })
      app.globalData.job=''
      app.globalData.fid=''
      
    }
    if (app.globalData.area_name){
      this.setData({
        area_name:app.globalData.area_name,
        area_id: app.globalData.area_id 
      })
      app.globalData.area_name=''
      app.globalData.area_id =''
    }
    if (app.globalData.trade_id_one){
      this.setData({
        trade_name_one: app.globalData.trade_name_one,
        trade_id_one: app.globalData.trade_id_one
      })
      app.globalData.trade_name_one=''
      app.globalData.trade_id_one=''
    }
    if (app.globalData.trade_name_three) {
      this.setData({
        trade_id_three: app.globalData.trade_id_three,
        trade_name_three: app.globalData.trade_name_three
      })
      app.globalData.trade_id_three=''
      app.globalData.trade_name_three=''
    }
    if (app.globalData.trade_name_two) {
      this.setData({
        trade_name_two: app.globalData.trade_name_two,
        trade_id_two: app.globalData.trade_id_two
      })
      app.globalData.trade_id_two=''
      app.globalData.trade_name_two=''
    }
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  submit:function(){
    console.log(app.globalData)
    var data={
      area_id: this.data.area_id,
      job_id: this.data.job_id,
      trade_id_one: this.data.trade_id_one||'',
      trade_id_two: this.data.trade_id_two||'',
      trade_id_three: this.data.trade_id_three||'',
      pay_start: this.data.multiArray[0][this.data.multiIndex[0]].split('k')[0],//最低薪资
      pay_end: this.data.multiArray[1][this.data.multiIndex[1]].split('k')[0],
    }
    console.log(typeof this.data.id)
    if (this.data.id && this.data.id !="undefined"){
      data.id = this.data.id
      utils.sendRrquest('savewill', 1, data)
      .then((res)=>{
          if(res.data.status==='200'){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 500
            })
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showModal({
              title: '温馨提示',
              content: '保存失败',
            })
          }
      })
      return 
    }else{
    utils.sendRrquest('addwill', 1, data)
    .then((res)=>{
      console.log(res)
      if(res.data.status==='200'){
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
    }
  },
  del:function(){
    var data={
      id:this.data.id
      }
    utils.sendRrquest('delwill', 1, data)
      .then((res) => {
        console.log(res)
        if (res.data.status === '200') {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 500
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },500)
         
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
      })
  }
})