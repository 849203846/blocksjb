var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArrayEdu:['初中及以下', '中专', '高中', '大专', '本科', '硕士', '博士'],
    
    tankuangstatus:'none',
    tankuangname:'',
    degree:0,
    start_at:[0,0],
    multiArrayYear: [
      ['2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年', '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年', '1990年', '1990年以前'],
      ['2024年', '2023年', '2022年', '2021年', '2020年', '2019年','2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年', '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年']],
  },
  cloce:function(){
    this.setData({
      tankuangstatus: 'none',
      tankuangcontent:''
    })
  },
  onLoad:function(op){
    if(op.id&&op.id!=''){
      var id=op.id
      wx.getStorage({
        key: 'geteducation',
        success: (res) =>{
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].id==op.id){
              var data = res.data[i]
              var start_at=[]
              for (var j = 0; j < this.data.multiArrayYear[0].length;j++){
                if (this.data.multiArrayYear[0][j].split('年')[0] == data.start_at){
                  start_at[0]=j
                }
                if (this.data.multiArrayYear[0][j].split('年')[0] == data.end_at) {
                  start_at[1]=j
                }
              }
              this.setData({
                id,
                school: data.school,
                degree:data.degree,
                major_name:data.major_name,
                exper: data.exper,
                start_at: start_at
              })
            }
          }
        },
      })



    }
  },
  onShow:function(){
    if (app.globalData.exper && app.globalData.exper!=''){
        this.setData({
          exper:app.globalData.exper
        })
      app.globalData.exper=''
    }
  }, bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      degree: e.detail.value
    })
  },
  opentankuangstatus:function(){
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '学校名称',
      tankuangcontent:this.data.school
    })
  },
  addintention: function () {
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '专业名称',
      tankuangcontent: this.data.major_name
    })
  },
  baocun:function(){
    if (this.data.tankuangname ==='学校名称'){
      this.setData({
        school: this.data.tankuangcontent
      })
    } else if (this.data.tankuangname === '专业名称'){
      this.setData({
        major_name: this.data.tankuangcontent
      })
    }
    this.cloce()
  },
  setname:function(e){
    this.setData({
      tankuangcontent:e.detail.value
    })
  },
  setstart_at:function(e){
    console.log(e.detail.value)
    this.setData({
      start_at:e.detail.value
    })
  },
  addsubmit:function(){
    var start_at = this.data.multiArrayYear[0][this.data.start_at[0]].split('年')[0]
    var end_at = this.data.multiArrayYear[1][this.data.start_at[1]].split('年')[0]
    var data={
      school: this.data.school,
      degree: this.data.degree ,
      major_name: this.data.major_name,
      exper: this.data.exper,
      start_at: start_at,
      end_at:end_at
    }
    var url = 'addeducation'
    if(this.data.id&&this.data.id!=''){
      url ='saveeducation'
      data.id=this.data.id
    }else{
      url = 'addeducation'
    }
    utils.sendRrquest(url, 1, data)
    .then((res)=>{
      if(res.data.status==='200'){
        wx.showToast({
          title: '操作成功',
          duration:500,
          success:function(){
            setTimeout(function(){
                wx.navigateBack({
                  delta:1
                })
            },500)
          }
        })
      }else{
        wx.showModal({
          title: '温馨提示',
          content: '操作失败',
        })
      }
    })
  },
  delsubmit:function(){
    var data={
      id:this.data.id
    }
    utils.sendRrquest('deleducation', 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          wx.showToast({
            title: '操作成功',
            duration: 500,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 500)
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '操作失败',
          })
        }
      })
  }
})