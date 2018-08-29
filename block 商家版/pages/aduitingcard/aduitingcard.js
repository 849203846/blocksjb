var utils = require('../..//utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id_card:'',
    real_name:'',
    name:'',
    tankuangstatus:'none',
    id:9,
    logo_url:'',
    phone:'',
    card_pros: '', 
    btncolor:"#1eac8a",
    sendsms:'发送验证码'
  },
  onLoad: function (options) {
    this.setData({
      id:options.id||9
    })
  },
  sendsms:function(){
    var data={
      phone:this.data.name
    }
    if(data.phone.length!=11)return;
    if (this.data.sendsms== "重新发送" || this.data.sendsms=='发送验证码'){
      utils.sendRrquest('sendsms', 1, data)
        .then((res) => {
          if (res.data.status === '200') {
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
            let timenum = 60;
            let timer = setInterval(() => {
              var sendsms = '重新发送（' + timenum + '）'
              console.log(sendsms)
              this.setData({
                sendsms: sendsms
              })
              --timenum
              console.log(timenum)
              if (timenum == 0) {
                clearInterval(timer)
                this.setData({
                  btncolor: "#1eac8a",
                  sendsms: '重新发送'
                })
              }
            }, 1000)
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '发送失败，请检查手机号填写是否正确',
            })
          }
        })
    }

  },
  setdivision: function (e) {
    this.setData({
      tankuangstatus: 'blcok',
      tankuangname: '真实姓名',
      tankuangnameOne:'情填写真实姓名',
      name: this.data.real_name
    })
  },
  setphone:function(){
    this.setData({
      tankuangstatus: 'blcok',
      tankuangnameOne:'请填写手机号',
      tankuangname: '手机验证',
      name: this.data.phone
    })
  },
  setoff_network: function (e) {
    this.setData({
      tankuangstatus: 'blcok',
      tankuangnameOne:"请填写身份证号",
      tankuangname: '身份证号',
      name: this.data.id_card
    })
  },
  setname: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  setcode:function(e){
    this.setData({
      code:e.detail.value
    })
  },
  setnames: function () {
    if (this.data.tankuangname === '真实姓名') {
      this.setData({
        real_name: this.data.name,
      })
    } else if (this.data.tankuangname === '身份证号') {
      this.setData({
        id_card: this.data.name,
      })
    }else if(this.data.tankuangname==='手机验证'){
      try{
        clearInterval(timer)
      }catch(e){

      }

      var data={
        phone:this.data.name,
        code: this.data.code
      }
      utils.sendRrquest('verifysms',1,data)
      .then((rex)=>{
        if (rex.data.status==='200'){
          this.setData({
            phone:this.data.name
          })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '验证失败请重新输入',
          })
          return 
        }
      })
    }
    this.close()
  },
  close:function(){
    this.setData({
      tankuangstatus:'none'
    })
  },
  setcard_pros:function(){
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
            type: 'idcard',
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
              that.setData({ card_pros: b.data })
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
    var that=this
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
            type: 'idcard',
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
              that.setData({ logo_url: b.data })
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
  submit:function(){
    if(this.data.phone==undefined||this.data.phone=='undefined'){
      wx.showModal({
        title: '温馨提示',
        content: '请先验证手机号',
      })
      return
    }
    var data={
      card_cons: this.data.logo_url,
      card_pros: this.data.card_pros,
      id_card: this.data.id_card,
      real_name: this.data.real_name,
      phone:this.data.phone,
      id:this.data.id
    }
    if (data.real_name == '' || data.real_name == undefined) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入您的真实姓名',
      })
      return;
    }
    if (data.id_card == '' || data.id_card == undefined) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入身份证号',
      })
      return;
    }
    if(data.card_cons==''||data.card_cons==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请上传身份证正面',
      })
      return;
    }
    if(data.card_pros==''||data.card_pros==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请上传身份证反面',
      })
      return;
    }
    if(data.phone==undefined||data.phone==''){
      wx.showModal({
        title: '温馨提示',
        content: '请验证手机号',
      })
      return;
    }
    utils.sendRrquest('aduitingcard', 1,data)
    .then((res)=>{
      if(res.data.status==='200'){
        wx.navigateTo({
          url: '../aduitinglicense/aduitinglicense?id='+this.data.id,
        })
      }else{
        wx.showModal({
          title: '温馨提示',
          content: '提交失败',
        })
      }
    })
  }
})