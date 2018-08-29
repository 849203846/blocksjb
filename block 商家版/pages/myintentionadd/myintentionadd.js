var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArrayBegin: [
      "0-20人","20-99人","100-499人","500-999人","1000-9999人","10000人以上"
      ],
    multiIndex:[0],
    multiIndexs:[0],
  multiArrayOver: [
    '未融资','天使轮','A轮','B轮','C轮','D轮及以上','已上市','不需要融资'
     ],
    tankuangstatus:'none',
    company:'',//公司名称
    tankuangname:'',
    job_name:'',//职位名称
    division:'',//所属部门
    job_id:'',
    work_content:'',
    work_ach:'',
    off_network:'',
    logo_url:'',
    name:''
  },
  onLoad:function(op){
    
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
      tankuangname: '公司简称'
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
      tankuangname: '公司职位'
    })
  },
  setnames: function () {
    console.log(this.data.tankuangname)
    if (this.data.tankuangname === '公司简称'){
      this.setData({
        job_name: this.data.name,
      })
    } else if (this.data.tankuangname === '公司名称'){
      this.setData({
        company: this.data.name,
      })
    } else if (this.data.tankuangname === '公司职位'){
      this.setData({
        division: this.data.name,
      })
    } else if (this.data.tankuangname === '官网地址'){
      this.setData({
        off_network: this.data.name
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

  setoff_network: function (e) {
    this.setData({
      tankuangstatus: 'blcok',
      tankuangname: '官网地址',
      name: this.data.off_network
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
  setlogo_url:function(){
      var that = this
        // timestamp = Date.parse(new Date()) / 1000 + String(Math.random()).slice(2, 5),
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
            url:'https://recruit.zhangchaoqun.cn/api/uploadfile',
            filePath: tempFilePaths,
            name: 'file',
            header: { 'content-type': 'multipart/form-data' },
            formData: {
              type:'logo',
              user_id: wx.getStorageSync('userInfo').user_id
 
            },
            success: function (a) {
              console.log('a',a)
              if (a.statusCode === 200) {
                wx.showToast({
                  mask: true,
                  title: '上传成功',
                  icon: 'success',
                  duration: 1000
                })
                var b=JSON.parse(a.data)
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
  submit: function () {
    var data = {
      trade_id: this.data.trade_id,//行业id
      company_fullname: this.data.company,//公司名称
      company_shortname: this.data.job_name,//公司简称
      position: this.data.division,//公司职位
      off_network: this.data.off_network,//公司官网
      logo_url: this.data.logo_url,//公司logo
      financ_type: this.data.multiIndexs,//集资规模
      team_type: this.data.multiIndex,//团队规模
    }
    console.log(data)
    if (data.company_fullname == '' || data.company_fullname==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请填写公司名称',
      })
      return;
    }
    if(data.company_shortname==''||data.company_shortname==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请填写公司简称',
      })
      return;
    }
    if(data.position==''||data.position==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请填写公司职位',
      })
      return;
    }
    if(data.off_network==undefined||data.off_network==''){
      wx.showModal({
        title: '温馨提示',
        content: '请填写公司相关网站',
      })
      return;
    }
    if(data.logo_url==''||data.logo_url==undefined){
      wx.showModal({
        title: '温馨提示',
        content: '请上传公司logo',
      })
      return;
    }
    utils.sendRrquest("addaduiting", 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 500
          })
          wx.navigateTo({
            url: '../aduitingcard/aduitingcard?id='+res.data.data.id,
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
        console.log(res)
      })
  },
})