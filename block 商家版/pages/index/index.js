var utils = require('../..//utils/util.js')
const app = getApp()

Page({
  data: {
    page:'1',
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner2.jpg',
    ],
    interval: 5000,
    duration: 1000,
    pay:'',
    work_exp:'',
    shaixuan:'none',
    education:''
  },
  //事件处理函数
  gotosousuo: function() {
    wx.navigateTo({
      url: '../sousuo/sousuo'
    })
  },
  swiperchange:function(e){
    console.log(e.detail.current)
    var index = e.detail.current
    this.setData({
      job_id: this.data.list[index].job_id
    })
    this.getposition()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    app.getuser()
    utils.sendRrquest('getpositionnum', 1, {})
      .then((res) => {
        console.log(res.data)
        this.setData({
          list: res.data.data,
          job_id:res.data.data[0].job_id
        })
        this.getposition()
      })

  },
  getposition:function(){
    var data = {
      job_id: this.data.job_id,//职位id
      education: this.data.education,//学历0=>'初中及以下',1=>'中专/中技',2=>'高中',3=>'大专',4=>'本科',5=>'硕士',6=>'博士'
      work_exp: this.data.work_exp,//工作经验    0应届生 1一年以内 2 1-3年 3 3-5年 4 5-10年 5 10年以上
      pay: this.data.pay,//薪资范围

    }
    utils.sendRrquest('getresumelist', 1, data)
      .then((res) => {
        console.log(res.data.data.data)
        this.setData({
          positionlist:res.data.data.data,
          page: '1'
        })
      })
  },
  seteducation:function(e){
      this.setData({
          education: e.target.dataset.education
      })
    this.getposition()
  },
  setpay:function(e){
    this.setData({
      pay: e.target.dataset.pay
    })
    this.getposition()
  },
  setwork_exp:function(e){
    this.setData({
      work_exp: e.target.dataset.work_exp
    })
    this.getposition()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotopositionItel:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../positionItel/positionItel?id=' + e.target.dataset.id
    })
  },
  onReachBottom: function () {
    var page = ++this.data.page
    var data={
      page: page,
      job_id: this.data.job_id,//职位id
      education: this.data.education,//学历0=>'初中及以下',1=>'中专/中技',2=>'高中',3=>'大专',4=>'本科',5=>'硕士',6=>'博士'
      work_exp: this.data.work_exp,//工作经验    0应届生 1一年以内 2 1-3年 3 3-5年 4 5-10年 5 10年以上
      pay: this.data.pay,//薪资范围

    }
    utils.sendRrquest('getresumelist', 1, data)
      .then((res) => {
        this.setData({
          page: page,
          positionlist: [...this.data.positionlist, ...res.data.data.data]
        })
      })
  },
  openshaixuan:function(){
    if (this.data.shaixuan==='block'){
      this.setData({
        shaixuan:'none'
      })
      return
    }
    this.setData({
      shaixuan:'block'
    })
  },
  closeshaixuan:function(){
    this.setData({
      shaixuan: 'none'
    })
  },
  cleardata:function(){
    this.setData({
      page: 1,
      job_id: '',
      education: '',//学历0=>'初中及以下',1=>'中专/中技',2=>'高中',3=>'大专',4=>'本科',5=>'硕士',6=>'博士'
      work_exp: '',//工作经验    0应届生 1一年以内 2 1-3年 3 3-5年 4 5-10年 5 10年以上
      pay:'',//薪资范围
    })
    this.getposition()
  }
})
