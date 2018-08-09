var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    trades: [],
    id:'undefined'
  },
  onLoad: function (op) {
    // debugger
    // if (op.saveid!='') {
    //   this.setData({
    //     saveid: op.saveid
    //   })
    // }
    utils.sendRrquest('gettrades', 1, {})
      .then((res) => {
        console.log(res.data.data)
        this.setData({
          trades: res.data.data
        })
      })
  },
  back: function (e) {
    var trade = e.target.dataset.trade,
      trade_id = e.target.dataset.id
    // if (this.data.id == '') {
      app.globalData.trade_id = trade_id
      app.globalData.trade = trade
      wx.navigateBack({
        delta: 1
      })
    // }else{

    // }
  
  }
})