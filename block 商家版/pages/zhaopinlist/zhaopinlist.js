var utils = require('../..//utils/util.js')
const app = getApp()
Page({
  data: {
  
  },
  onShow: function () {
    utils.sendRrquest('getpositionnum',1,{})
    .then((res)=>{
        console.log(res.data)
        this.setData({
          list:res.data.data
        })
    })
  },
})