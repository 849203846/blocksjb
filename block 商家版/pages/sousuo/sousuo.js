var utils = require('../..//utils/util.js')
const app = getApp()
Page({
  data: {
    area_name: '北京',
    bannum: '1',
    financ: '',
    team: '',
    trade: '',
    education: '',
    work_exp: '',
    pay: '',
    keyword:'',
    area_id: "",
    tanchustatus:'none'
  },
  onLoad:function(){
    utils.sendRrquest('gettradeskill', 1,{})
    .then((res)=>{
      console.log(res.data.data)
      this.setData({
        gettradeskill:res.data.data
      })
    })
  },
  onShow: function () {
    var area_name = app.globalData.area_name
    var area_id = app.globalData.area_id
    if (app.globalData.area_name) {
      this.setData({
        area_name,
        area_id
      })
      app.globalData.area_name = ''
      app.globalData.area_id = ''
    }
    this.getlist()
  },
  gotosetCity: function () {
    wx.navigateTo({
      url: '/pages/setCity/setCity',
    })
  },
  setbtn: function (e) {
    console.log(e.target.dataset.flag)
    if (this.data.tanchustatus === 'block' && e.target.dataset.flag == this.data.bannum) {
      this.setData({
        tanchustatus: 'none'
      })
      return
    }
    this.setData({
      tanchustatus: 'block',
      bannum: e.target.dataset.flag
    })
  },
  setfinanc: function (e) {
    this.setData({
      financ: e.target.dataset.flag
    })
    this.getlist()
  },
  setteam: function (e) {
    this.setData({
      team: e.target.dataset.flag
    })
    this.getlist()
  },



  settrade: function (e) {
    if (this.data.trade == e.target.dataset.flag){
      this.setData({
        trade:''
      })
      return 
    }
    this.setData({
      trade: e.target.dataset.flag
    })
    this.getlist()
  },
  seteducation: function (e) {
    this.setData({
      education: e.target.dataset.flag
    })
    this.getlist()
  },
  setwork_exp: function (e) {
    this.setData({
      work_exp: e.target.dataset.flag
    })
    this.getlist()
  },
  setpay: function (e) {
    this.setData({
      pay: e.target.dataset.flag
    })
    this.getlist()
  },


  setkeyword:function(e){
    this.setData({
      keyword: e.detail.value
    })
    this.getlist()
  },

  queding: function () {
    this.setData({
      tanchustatus: 'none'
    })
  },
  chongzhi: function () {
    this.setData({
      tanchustatus: 'none',
      keyword: '',
      financ: '',
      team: '',
      trade: '',
      education: '',
      work_exp: '',
      pay: '',
    })
  },
  getlist: function () {
    var data = {
      keyword: this.data.keyword,//搜索关键字
      financ: this.data.financ,//融资情况
      team: this.data.team, //公司团队
      trade: this.data.trade, //行业
      education: this.data.education, //学历
      work_exp: this.data.work_exp,//工作经验
      pay: this.data.pay,
      area_id: this.data.area_id
    }
    utils.sendRrquest('getposition', 1, data)
      .then((res) => {
        console.log(res.data)
        this.setData({
          list: res.data.data.data
        })
      })
  }
})