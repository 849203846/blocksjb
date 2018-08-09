var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArrayBegin: [
      ['2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年', '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年', '1990年', '1990年以前'],
      ['12月', '11月', '10月', '09月', '08月', '07月', '06月', '05月', '04月', '03月', '02月', '01月',]
      ],
    multiIndex:[0,0],
    multiIndexs:[0,0],
  multiArrayOver: [
      [ '2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年', '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年', '1990年', '1990年以前'],
      [ '12月', '11月', '10月', '09月', '08月', '07月', '06月', '05月', '04月', '03月', '02月', '01月',]],
    tankuangstatus:'none',
    company:'',//公司名称
    tankuangname:'',
    job_name:'',//职位名称
    division:'',//所属部门
    job_id:'',
    work_content:'',
    work_ach:''
  },
  onLoad:function(op){
    if(op.id){
      this.setData({
        saveid:op.id
      })
      wx.getStorage({
        key: 'getworks',
        success: (res) => {
          if(res.data){
            console.log(res.data)
            var update_at=[]
            var start_at=[]
            var multiArrayOver = this.data.multiArrayOver
            for(var i=0;i<res.data.length;i++){
              console.log(res.data[i].id )
              if(res.data[i].id==op.id){
                var item = res.data[i]
                var update_atOne = item.update_at.split('-')[0]
                var update_atTWO = item.update_at.split('-')[1]
                var start_atOne = item.start_at.split('-')[0]
                var start_atTwo = item.start_at.split('-')[1]
                for (var i = 0; i < multiArrayOver[0].length; i++) {
                  if (multiArrayOver[0][i].split('年')[0] === update_atOne) {
                    update_at.push(i)
                    break
                  }
                }
                for (var i = 0; i < multiArrayOver[1].length; i++) {
                  if (multiArrayOver[1][i].split('月')[0] === update_atTWO) {
                    update_at.push(i)
                    break
                  }
                }
                for (var i = 0; i < multiArrayOver[0].length; i++) {
                  if (multiArrayOver[0][i].split('年')[0] === start_atOne) {
                    start_at.push(i)
                    break
                  }
                }
                for (var i = 0; i < multiArrayOver[1].length; i++) {
                  if (multiArrayOver[1][i].split('月')[0] === start_atTwo) {
                    start_at.push(i)
                    break
                  }
                }
                this.setData({
                  company: item.company,
                  division: item.division,
                  job_id: item.job_id,
                  job_name: item.job_name,
                  tag_one: item.tag_one,
                  tag_three: item.tag_three,
                  tag_two: item.tag_two,
                  trade_id: item.trade_id,
                  trade:item.trade_name,
                  work_ach:item.work_ach,
                  work_content:item.work_content,
                  multiIndex:start_at,
                  multiIndexs: update_at
                })
              }
            }
           
          }
        },
      })
    }
  },
  onShow:function(){
    if (app.globalData.job_id_name && app.globalData.job_id_name!=''){
        this.setData({
          job_id:app.globalData.job_id,
          job_id_name: app.globalData.job_id_name
    
      })
      app.globalData.job_id = ''
      app.globalData.job_id_name=''
    } 
    console.log(app.globalData.trade)
    if (app.globalData.trade!=''){
      this.setData({
        trade: app.globalData.trade,
        trade_id: app.globalData.trade_id
      })
    }
    if (app.globalData.work_content != ''){
        this.setData({
          work_content: app.globalData.work_content
        })
      app.globalData.work_content=''
    }
    if (app.globalData.work_ach != '') {
      this.setData({
        work_ach: app.globalData.work_ach
      })
      app.globalData.work_ach = ''
    }
    if (app.globalData.tag_one != '' && app.globalData.tag_one){
      this.setData({
        tag_one: app.globalData.tag_one 
      })
    }
    if (app.globalData.tag_two != '' && app.globalData.tag_two) {
      this.setData({
        tag_two: app.globalData.tag_two
      })
    } 
    if (app.globalData.tag_three != '' && app.globalData.tag_three) {
      this.setData({
        tag_three: app.globalData.tag_three
      })
    }
  },
  close: function() {
  this.setData({
    tankuangstatus: 'none',
    name: ''
  })
},
opensetname: function() {
  this.setData({
    tankuangstatus: 'block',
    name: this.data.company,
    tankuangname:'公司名称'
  })
},
  opensetnametwo:function(){
    this.setData({
      tankuangstatus: 'block',
      name: this.data.job_name,
      tankuangname: '职位名称'
    })
  },
  setname: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  setdivision:function(){
    this.setData({
      tankuangstatus: 'block',
      name: this.data.division,
      tankuangname: '所属部门'
    })
  },
  setnames: function () {
    console.log(this.data.tankuangname)
    if (this.data.tankuangname === '职位名称'){
      this.setData({
        job_name: this.data.name,
      })
    } else if (this.data.tankuangname === '公司名称'){
      this.setData({
        company: this.data.name,
      })
    } else if (this.data.tankuangname === '所属部门'){
      this.setData({
        division: this.data.name,
      })
    }
    
    this.close()
  },

  opensetname: function () {
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '公司名称',
      name: this.data.realname
    })
  },
  posName: function () {
    this.setData({
      tankuangstatus: 'blcok',
      tankuangname: '职位名称',
      name: this.data.posName
    })
  },
  setname: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },


  gongsihangye: function () {
    wx.navigateTo({
      url: '../gongsihangye/gongsihangye',
    })
  },
  gotojinengbiaoqian: function () {
    if (this.data.job_id != '') {
      wx.navigateTo({
        url: '../getskill/getskill?job_id=' + this.data.job_id + '&id=' + this.data.saveid,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请先选择职位类型',
      })
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndexs: e.detail.value
    })
  },
  submit: function () {
    var data = {
      company: this.data.company,//公司名称
      job_id: this.data.job_id,//职位名称
      job_name: this.data.job_name,
      trade_id: this.data.trade_id,
      tag_one: this.data.tag_one,
      tag_two: this.data.tag_two,
      tag_three: this.data.tag_three,
      division: this.data.division,
      work_content: this.data.work_content,
      work_ach: this.data.work_ach,
      start_at: this.data.multiArrayBegin[0][this.data.multiIndex[0]].split('年')[0] + "-" + this.data.multiArrayBegin[1][this.data.multiIndex[1]].split('月')[0],
      end_at: this.data.multiArrayOver[0][this.data.multiIndexs[0]].split('年')[0] + "-" + this.data.multiArrayOver[1][this.data.multiIndexs[1]].split('月')[0]
    }
    console.log(data)
    var url = 'addwork'
    if (this.data.saveid && this.data.saveid != '') {
      url = 'savework'
      data.id = this.data.saveid
    } else {
      url = 'addwork'
    }
    utils.sendRrquest(url, 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 500
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
        console.log(res)
      })
  },
  delsubmit: function () {
    utils.sendRrquest('delwork', 1, { id: this.data.saveid }).then((res) => {
      if (res.data.status === '200') {
        wx.showToast({
          title: '刪除成功',
          icon: 'success',
          duration: 500,
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          }
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '删除失败，请重新打开小程序',
        })
      }
    })
  }
})