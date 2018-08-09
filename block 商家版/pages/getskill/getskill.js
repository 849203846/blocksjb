var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    trades: [],
    num: '0',
    tag_three: '',
    tag_two: '',
    tag_one: ''
  },
  onLoad: function (op) {
    if (op.id!='') {
      this.setData({
        id: op.id
      })
      wx.getStorage({
        key: 'getworks',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (op.id == res.data[i].id) {
              var num = 0
              if (res.data[i].tag_one != '') {
                num++
              }
              if (res.data[i].tag_two != '') {
                num++
              }
              if (res.data[i].tag_three != '') {
                num++
              }
              this.setData({
                num,
                tag_three: res.data[i].tag_three,
                tag_one: res.data[i].tag_one,
                tag_two: res.data[i].tag_two,
              })
              break
            }
          }
        },
      })
    }
    utils.sendRrquest('getskill', 1, { id: op.job_id})
      .then((res) => {
        console.log(res.data.data)
        this.setData({
          trades: res.data.data
        })
      })
  },
  tag_one: function () {
    var tag_two = this.data.tag_three
    var tag_one = this.data.tag_two
    var tag_three = ''
    this.setData({
      num: --this.data.num,
      tag_three,
      tag_two,
      tag_one,
    })
  },
  tag_two: function () {
    var tag_two = this.data.tag_three
    this.setData({
      tag_two,
      num: --this.data.num,
      tag_three: ''
    })
  },
  tag_three: function () {
    this.setData({
      num: --this.data.num,
      tag_three: '',
    })
  },
  back: function (e) {
    var trade = e.target.dataset.trade
      if (this.data.tag_three != '') {
        wx.showModal({
          title: '温馨提示',
          content: '只能选择三个标签',
        })
        return
      } else if (this.data.tag_two != '') {
        this.setData({
          tag_three:trade,
          num:++this.data.num
        })
      } else if (this.data.tag_one != '') {
        this.setData({
          tag_two: trade,
          num: ++this.data.num
        })
      } else if (this.data.tag_one == '' && this.data.tag_two == "" && this.data.tag_three == '') {
        this.setData({
          tag_one: trade,
          num: ++this.data.num
        })
      }
    },
    submit:function(){
      app.globalData.tag_one = this.data.tag_one
      app.globalData.tag_two = this.data.tag_two
      app.globalData.tag_three = this.data.tag_three
      wx.navigateBack({
        delta:1
      })
    }
})