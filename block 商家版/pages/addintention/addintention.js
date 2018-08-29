var utils = require('../..//utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    work_status:0,
    degree:0,
    work_statusArray:['全职','兼职','实习'],
    multiArrayEdu: ['初中及以下', '中专', '高中', '大专', '本科', '硕士', '博士'],
    work_expArray: ['<1年', '1年', '2年', '3年', '4年', '5年', '6年','7年','8年','9年','10年','10+年'],
    work_exp:0,
    multiArray:[],
    multiIndex: [0,1],
    tankuangstatus:'none',
    company:'',//公司名称
    tankuangname:'',
    job_name:'',//职位名称
    division:'',//所属部门
    job_id:'',
    work_content:'',
    work_ach:''
  },
  bindwork_status:function(e){
    this.setData({
      work_status: e.detail.value
    })
  },
  bindwork_exp:function(e){
    this.setData({
      work_exp: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      degree: e.detail.value
    })
  },
  onLoad:function(op){
    var multiArray = [[], []]
    for (var i = 1; i < 250; i++) {
      multiArray[0].push(i + 'k')
      multiArray[1].push(i + 'k')
    }
    this.setData({
      multiArray
    })
    if(op.id){
      console.log(op.id)
      wx.getStorage({
        key: 'positionlist',
        success: (res) => {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i]
            if (op.id == item.id){
              var multiIndex = [--item.min_pay, --item.max_pay]
              this.setData({
                id:op.id,
                com_id: item.com_id,//公司id
                job_id: item.job_id,//工作id    *****************
                area_id: item.area_id,//地区id   ---------------
                position: item.position,//职位   ***************
                address: item.address,//地址     ....................
                door_number: item.door_number,//门牌号   +++++++++++++++++++
                tag_one: item.tag_one,//*********** */
                tag_two: item.tag_two,//************** */
                tag_three: item.tag_three,//************ */
                multiIndex: multiIndex,
                work_status: item.work_status,//工作性质  ------------------
                work_exp: item.work_exp,//工作经验 ---------------
                degree: item.min_education,//最低学历      0000000000000000
                work_content: item.describe,//职位描述---------------
              })
              break
            }
          }

        },
      })
    }
    wx.getStorage({
      key: 'aduiting',
      success: (res) => {
        this.setData({
          aduiting:res.data
        })
      },
    })
  
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
    console.log(app.globalData.trade)
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
    if (app.globalData.area_name) {
      this.setData({
        area_name: app.globalData.area_name,
        area_id: app.globalData.area_id
      })
      app.globalData.area_name = ''
      app.globalData.area_id = ''
    }
  },
  close: function() {
  this.setData({
    tankuangstatus: 'none',
    name: ''
  })
},
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  opensetposition: function() {
  this.setData({
    tankuangstatus: 'block',
    name: this.data.position,
    tankuangname:'招聘职位'
  })
},
  opensetaddress:function(){
    this.setData({
      tankuangstatus: 'block',
      name: this.data.address,
      tankuangname: '公司地址'
    })
  },
  opensetdoor_numbe: function () {
    this.setData({
      tankuangstatus: 'block',
      name: this.data.door_numbe,
      tankuangname: '门牌号'
    })
  },
  setnames: function () {
    console.log(this.data.tankuangname)
    if (this.data.tankuangname === '招聘职位'){
      this.setData({
        position: this.data.name,
      })
    } else if (this.data.tankuangname === '公司地址'){
      this.setData({
        address: this.data.name,
      })
    } else if (this.data.tankuangname === '门牌号'){
      this.setData({
        door_number: this.data.name,
      })
    }
    this.close()
  },
  setname: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
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
  submit: function () {
    var data = {
      com_id: this.data.aduiting.com_id,//公司id
      job_id: this.data.job_id,//工作id    *****************
      area_id: this.data.area_id,//地区id   ---------------
      position: this.data.position,//职位   ***************
      address: this.data.address,//地址     ....................
      door_number: this.data.door_number,//门牌号   +++++++++++++++++++
      tag_one: this.data.tag_one,//*********** */
      tag_two: this.data.tag_two,//************** */
      tag_three: this.data.tag_three,//************ */
      min_pay: this.data.multiArray[0][this.data.multiIndex[0]].split('k')[0],//++++++++++++++++++
      max_pay: this.data.multiArray[1][this.data.multiIndex[1]].split('k')[0],//+++++++++++++++++++++++
      work_status: this.data.work_status,//工作性质  ------------------
      work_exp: this.data.work_exp,//工作经验 ---------------
      min_education: this.data.degree,//最低学历      0000000000000000
      describe: this.data.work_content,//职位描述---------------
    }
    var url = 'addposition'
    if(this.data.id&&this.data.id!=''){
      url ='saveposition'
      data.id=this.data.id
    }
    utils.sendRrquest(url, 1, data)
      .then((res) => {
        if (res.data.status === '200') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 500
          })
          setTimeout(() => {
           wx.reLaunch({
             url: '../index/index',
           })
          }, 500)
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '保存失败',
          })
        }
        console.log(res)
      })
  },
  delsubmit: function () {
    utils.sendRrquest('delposition', 1, { id: this.data.id }).then((res) => {
      if (res.data.status === '200') {
        wx.showToast({
          title: '刪除成功',
          icon: 'success',
          duration: 500,
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                delta:1
              })
            }, 500)
          }
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '删除失败，请重新打开小程序',
        })
      }
    })
  }
})