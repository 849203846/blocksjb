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
    tankuangstatus: 'none',
    start_atArray: [0, 0],
    end_at: [0, 0],
    multiArrayOver: [
      ['2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年', '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年', '1990年', '1990年以前'],
      ['12月', '11月', '10月', '09月', '08月', '07月', '06月', '05月', '04月', '03月', '02月', '01月',]],
  },
  onLoad: function (op) {
    if (op.id && op.id != '') {
      var id = op.id
      wx.getStorage({
        key: 'getprojects',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id == id) {
              var start_at = []
              var data = res.data[i]
              var nian = data.start_at.split('-')[0]
              var yue = data.start_at.split('-')[1]
              var nian2 = data.end_at.split('-')[0]
              var yue2 = data.end_at.split('-')[1]
              var end_at = []
              var multiArrayOver = this.data.multiArrayOver
              for (var j = 0; j < multiArrayOver[0].length; j++) {
                if (nian == multiArrayOver[0][j].split('年')[0]) {
                  start_at.push(j)
                }
                if (nian2 == multiArrayOver[0][j].split('年')[0]) {
                  end_at.push(j)
                }
              }
    
              for (var j = 0; j < multiArrayOver[1].length; j++) {
                if (yue == multiArrayOver[1][j].split('月')[0]) {
                  start_at.push(j)
                }
                if (yue2 == multiArrayOver[1][j].split('月')[0]) {
                  end_at.push(j)
                }
              }
              console.log(end_at)
              this.setData({
                id: id,
                name: data.name,
                link: data.link,
                role: data.role,
                desc: data.desc,
                exper: data.exper,
                start_atArray: start_at,
                end_at: end_at
              })
            }
          }
        },
      })
    }
  },
  onShow: function () {
    if (app.globalData.desc && app.globalData.desc != '') {
      this.setData({
        desc: app.globalData.desc
      })
      app.globalData.desc = ''
    }
    if (app.globalData.exper && app.globalData.exper != '') {
      this.setData({
        exper: app.globalData.exper
      })
      app.globalData.exper = ''
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_atArray: e.detail.value
    })
  },
  bindMultiPickerChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_at: e.detail.value
    })
  },
  opentankuang: function () {
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '项目名称',
      tankuangcontent: this.data.name
    })
  },
  lianjietankuang: function () {
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '项目链接',
      tankuangcontent: this.data.link
    })
  },
  jveseopentankuang: function () {
    this.setData({
      tankuangstatus: 'block',
      tankuangname: '项目角色',
      tankuangcontent: this.data.role
    })
  },
  cloce: function () {
    this.setData({
      tankuangstatus: 'none',
      tankuangcontent: ''
    })
  },
  baocun: function () {
    if (this.data.tankuangname === '项目名称') {
      this.setData({
        name: this.data.tankuangcontent,
        tankuangcontent: ''
      })
    } else if (this.data.tankuangname === '项目链接') {
      this.setData({
        link: this.data.tankuangcontent,
        tankuangcontent: ''
      })
    } else if (this.data.tankuangname === '项目角色') {
      this.setData({
        role: this.data.tankuangcontent,
        tankuangcontent: ''
      })
    } else {
      debugger
    }
    this.cloce()
  },
  setname: function (e) {
    this.setData({
      tankuangcontent: e.detail.value
    })
  },
  submit: function () {
    var data = {
      name: this.data.name,
      link: this.data.link,
      role: this.data.role,
      desc: this.data.desc,
      exper: this.data.exper,
      start_at: this.data.multiArrayOver[0][this.data.start_atArray[0]].split('年')[0] + '-' + this.data.multiArrayOver[1][this.data.start_atArray[1]].split('月')[0],
      end_at: this.data.multiArrayOver[0][this.data.end_at[0]].split('年')[0] + '-' + this.data.multiArrayOver[1][this.data.end_at[1]].split('月')[0]
    }
    var url = 'addproject'
    if (this.data.id && this.data.id != '') {
      url = 'saveprojet'
      data.id = this.data.id
    } else {
      url = 'addproject'
    }
    utils.sendRrquest(url, 1, data)
      .then((res) => {
        console.log(res.data)
        if (res.data.status === '200') {
          wx.showToast({
            title: '操作成功',
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
            content: '添加失败',
          })
        }
      })
  },
  delsubmit:function(){
    utils.sendRrquest('delproject', 1, {id:this.data.id})
      .then((res) => {
        console.log(res.data)
        if(res.data.status==='200'){
          wx.showToast({
            title: '操作成功',
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
            content: '操作失败',
          })
        }
      })
  }
})