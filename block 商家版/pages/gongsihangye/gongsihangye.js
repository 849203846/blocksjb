var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    jobsOne: [],
    rightbox: 'none',
    rightboxtwo: 'none'
  },
  onLoad: function (op) {
    if (op.id) {
      this.setData({
        id: op.id
      })
    }
  },
  onShow: function () {
    var data = {
      level: 0,
      // level: 1,
      id: ''
    }
    utils.sendRrquest('getjobs', 1, data)
      .then((res) => {
        console.log(res.data.data)
        this.setData({
          jobsOne: res.data.data
        })
      })
  },
  click: function (e) {
    console.log(e)
    var id = e.target.dataset.id
    var data = {
      level: 1,
      fid: id
    }
    utils.sendRrquest('getjobs', 1, data)
      .then((res) => {
        console.log(res)
        if (res.data.status === '200') {
          console.log(res.data.data)
          this.setData({
            rightbox: 'block',
            jobstwo: res.data.data
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '获取失败',
          })
        }

      })

  },
  getrightbox: function (e) {
    var id = e.target.dataset.id
    if (this.data.rightboxtwo === 'block') {
      this.back(e)
      return
    }
    console.log(id)
    var data = {
      level: 2, fid: id
    }

    utils.sendRrquest('getjobs', 1, data)
      .then((res) => {
        console.log(res)
        if (res.data.status === '200') {
          console.log(res.data.data)
          this.setData({
            rightboxtwo: 'block',
            jobstwo: res.data.data
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '获取失败',
          })
        }

      })
  },
  back: function (e) {
    var fid = e.target.dataset.id
    var job = e.target.dataset.job
    if (this.data.id != 'undefined' && this.data.id) {
      wx.getStorage({
        key: 'willlist',
        success: (res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id == this.data.id) {
              res.data[i].job_id = fid
              res.data[i].job_name = job
              debugger
              wx.setStorage({
                key: 'willlist',
                data: res.data,
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
              break;
            }
          }
        },
      })
    } else {
      app.globalData.job_id = fid
      app.globalData.job_id_name = job
      wx.navigateBack({
        delta: 1
      })
    }

  }
})