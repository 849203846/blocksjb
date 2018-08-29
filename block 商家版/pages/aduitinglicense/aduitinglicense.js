var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_url:'',
    license_url:'',
    id:9
  },
  onLoad: function (options) {
    this.setData({
      id: options.id||9
    })
  },
  setcard_pros: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({ tempFilePaths: tempFilePaths })
        wx.showToast({
          mask: true,
          title: '上传中',
          icon: 'loading',
          duration: 1000
        })
        wx.uploadFile({
          url: 'https://recruit.zhangchaoqun.cn/api/uploadfile',
          filePath: tempFilePaths,
          name: 'file',
          header: { 'content-type': 'multipart/form-data' },
          formData: {
            type: 'license',
            user_id: wx.getStorageSync('userInfo').user_id

          },
          success: function (a) {
            if (a.statusCode === 200) {
              wx.showToast({
                mask: true,
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
              var b = JSON.parse(a.data)
              console.log(b)
              that.setData({ license_url: b.data })
            } else {
              wx.showToast({
                mask: true,
                title: '上传失败',
                icon: 'fail',
                duration: 1000
              })
            }
          },
          fail: function (a) {
            wx.showToast({
              mask: true,
              title: '上传失败',
              icon: 'fail',
              duration: 1000
            })
          }
        })
      }
    })
  },
  setlogo_url: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({ tempFilePaths: tempFilePaths })
        wx.showToast({
          mask: true,
          title: '上传中',
          icon: 'loading',
          duration: 1000
        })
        wx.uploadFile({
          url: 'https://recruit.zhangchaoqun.cn/api/uploadfile',
          filePath: tempFilePaths,
          name: 'file',
          header: { 'content-type': 'multipart/form-data' },
          formData: {
            type: 'joburl',
            user_id: wx.getStorageSync('userInfo').user_id

          },
          success: function (a) {
            if (a.statusCode === 200) {
              wx.showToast({
                mask: true,
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
              var b = JSON.parse(a.data)
              console.log(b)
              that.setData({ job_url: b.data })
            } else {
              wx.showToast({
                mask: true,
                title: '上传失败',
                icon: 'fail',
                duration: 1000
              })
            }

          },
          fail: function (a) {
            wx.showToast({
              mask: true,
              title: '上传失败',
              icon: 'fail',
              duration: 1000
            })
          }
        })
      }
    })
  },
  submit: function () {
    var url = this.data.license_url != "" ? 'aduitinglicense' :'aduitingjob'
    var data = {
      license_url: this.data.license_url,
      job_url: this.data.job_url,
      id: this.data.id
    }
    console.log(data)
    if (data.job_url==''&&data.license_url==''){
      wx.showModal({
        title: '温馨提示',
        content: '请上传营业执照或者工作证明',
      })
      return;
    }
    utils.sendRrquest(url, 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          wx.navigateTo({
            url: '../shenheluodi/shenheluodi'
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '提交失败',
          })
        }
      })
  }
})