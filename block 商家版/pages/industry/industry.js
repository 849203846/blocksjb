var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    trades: [],
    num: '0',
    trade_name_three: '',
    trade_name_two: '',
    trade_name_one: ''
  },
  onLoad: function(op) {
    if (op.id) {
      this.setData({
        id: op.id
      })
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (op.id == res.data[i].id) {
              var num = 0
              if (res.data[i].trade_name_one != '') {
                num++
              }
              if (res.data[i].trade_name_two != '') {
                num++
              }
              if (res.data[i].trade_name_three != '') {
                num++
              }
              this.setData({
                num,
                trade_id_one: res.data[i].trade_id_one, // 期望行业 多选
                trade_name_three: res.data[i].trade_name_three,
                trade_id_two: res.data[i].trade_id_two,
                trade_name_one: res.data[i].trade_name_one,
                trade_name_two: res.data[i].trade_name_two,
                trade_name_three: res.data[i].trade_name_three
              })
              break
            }
          }
        },
      })
    }
    utils.sendRrquest('gettrades', 1, {})
      .then((res) => {
        console.log(res.data.data)
        this.setData({
          trades: res.data.data
        })
      })
  },
  deltrade_name_one: function() {
    var trade_name_two = this.data.trade_name_three
    var trade_name_one = this.data.trade_name_two
    var trade_name_three = ''
    var trade_id_two = this.data.trade_id_three
    var trade_id_one = this.data.trade_id_two
    var trade_id_three = ''
    this.setData({
      trade_id_three,
      trade_id_two,
      trade_id_one,
      num: --this.data.num,
      trade_name_three,
      trade_name_two,
      trade_name_one,
    })
    if (this.data.id == 'undefined') {
      app.globalData.trade_id_three = trade_id_three
      app.globalData.trade_name_three = trade_name_three
      app.globalData.trade_id_two = trade_id_two
      app.globalData.trade_name_two = trade_name_two 
      app.globalData.trade_id_one = trade_id_one
      app.globalData.trade_name_one = trade_name_one
    }
  },
  trade_name_two: function() {
    var trade_name_two = this.data.trade_name_three
    var trade_id_two = this.data.trade_id_three
    this.setData({
      trade_id_two,
      trade_name_two,
      num: --this.data.num,
      trade_id_three: '',
      trade_name_three: ''
    })
    if (this.data.id == 'undefined') {
      app.globalData.trade_id_two=trade_id_two
      app.globalData.trade_name_two=trade_name_two
      app.globalData.trade_id_three=''
      app.globalData.trade_name_three= ''
    }
  },
  trade_name_three: function() {
    this.setData({
      num: --this.data.num,
      trade_name_three: '',
      trade_id_three: ''
    })
    if (this.data.id == 'undefined') {
      app.globalData.trade_id_three = ''
        app.globalData.trade_name_three = ''
    }
  },
  back: function(e) {
    var trade = e.target.dataset.trade,
      id = e.target.dataset.id
    console.log(this.data.id)
    if (this.data.id == 'undefined') {
      console.log(this.data.id)
      if (this.data.trade_name_three != '') {
        wx.showModal({
          title: '温馨提示',
          content: '只能选择三个标签',
        })
      } else if (this.data.trade_name_two != '') {
        app.globalData.trade_name_three = trade,
        app.globalData.trade_id_three = id
      } else if (this.data.trade_name_one != '') {
        app.globalData.trade_name_two= trade
        app.globalData.trade_id_two=id
      } else if (this.data.trade_name_one == '' && this.data.trade_name_two == "" && this.data.trade_name_three == '') {
        app.globalData.trade_name_one=trade
        app.globalData.trade_id_one= id
      }
    }

    if (this.data.trade_name_three != '') {
      wx.showModal({
        title: '温馨提示',
        content: '只能选择三个标签',
      })
    } else if (this.data.trade_name_two != '') {
      this.setData({
        num: ++this.data.num,
        trade_name_three: trade,
        trade_id_three: id
      })
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (this.data.id == res.data[i].id) {
              res.data[i].trade_name_three = trade
              res.data[i].trade_id_three = id
              wx.setStorage({
                key: 'willlist',
                data: res.data
              })
            }
          }
        },
      })
    } else if (this.data.trade_name_one != '') {
      this.setData({
        num: ++this.data.num,
        trade_name_two: trade,
        trade_id_two: id
      })
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            console.log(this.data.id, res.data[i].id)
            if (this.data.id == res.data[i].id) {
              res.data[i].trade_name_two = trade
              res.data[i].trade_id_two = id
              wx.setStorage({
                key: 'willlist',
                data: res.data
              })
            }
          }
        },
      })
    } else if (this.data.trade_name_one == '' && this.data.trade_name_two == "" && this.data.trade_name_three == '') {
      this.setData({
        num: ++this.data.num,
        trade_name_one: trade,
        trade_id_one: id
      })
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (this.data.id == res.data[i].id) {
              res.data[i].trade_name_one = trade
              res.data[i].trade_id_one = id
              wx.setStorage({
                key: 'willlist',
                data: res.data
              })
            }
          }
        },
      })
    } else {
      debugger
    }
    // console.log(e.target.dataset.trade)
    // app.globalData.trade = e.target.dataset.trade
    // app.globalData.trade_id = e.target.dataset.id
    // wx.navigateBack({
    //   delta:1
    // })
  }
  ,
  fanhui:function(){
    wx.navigateBack({
      delta:1
    })
  }
})