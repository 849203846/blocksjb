let toast = require('../../utils/toast.js');
let chatInput = require('../../modules/chat-input/chat-input');
var utils = require('../..//utils/util.js')
var app = getApp()
Page({
  data: {
    page:1,
    fid:5,
    list:[],
    friendHeadUrl: '',
    textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
    toView:'red',
    scrollTop:500
  },
  onLoad: function(options) {
    var fid = options.fid
    this.setData({
      fid: fid,
      
    })
    setTimeout(()=>{
      this.setData({
        scrollTop: 500,
      })
    },200)
    var data={
      fid,
      page:1,
      uid: wx.getStorageSync('userInfo').user_id,
    }
    utils.sendRrquest('getchatinfo', 1, data)
      .then((res) => {
        console.log(res.data.data)
        this.setData({
          list: res.data.data.chatData.data,
          fid_avatar_url: res.data.data.fid_avatar_url,
          uid_avatar_url: res.data.data.uid_avatar_url
        })
      })
    this.initData();
    this.opensoit()
  },
  getpage:function(){
    this.setData({
      page:++this.data.page
    })
    var data = {
      fid:this.data.fid,
      page:this.data.page,
      uid: wx.getStorageSync('userInfo').user_id,
    }
    utils.sendRrquest('getchatinfo', 1, data)
      .then((res) => {
        if (res.data.data.chatData.data.length==0)return 
        var list=this.data.list
        this.setData({
          list: [...res.data.data.chatData.data,...list]
        })
      })
  },
  initData: function() {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      format: 'mp3', //aac/mp3
      sendButtonBgColor: 'mediumseagreen',
      sendButtonTextColor: 'white',
      extraArr: [
        // {
        //   picName: 'choose_picture',
        //   description: '照片'
        // }, {
        //   picName: 'take_photos',
        //   description: '拍摄'
        // },
        // {
        //     picName: 'close_chat',
        //     description: '自定义功能'
        // }
      ],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
    });
    wx.setNavigationBarTitle({
      title: '好友'
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  opensoit: function() {
    var data={
      type: 'login',
      uid: wx.getStorageSync('userInfo').user_id,
      fid :this.data.fid
    }
    wx.connectSocket({
      url: 'wss://workerman.zhangchaoqun.cn:3088',
      data:data
    })
    wx.onSocketMessage((res) =>{
      console.log('收到服务器内容：' + res.data)
      var data = JSON.parse(res.data)
      console.log(data)
      var list = this.data.list
      if (data.type == 'ping' || data.type == 'login' || data.uid == wx.getStorageSync('userInfo').user_id){
        return 
      }
      list.push(data)
      this.setData({
        list,
        scrollTop:99999
      })
    })
    wx.onSocketOpen((res) => {
        var data = {
          type: 'login',
          uid: wx.getStorageSync('userInfo').user_id,
          fid: this.data.fid,
        };
        wx.sendSocketMessage({
          data: JSON.stringify(data)
        })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
    wx.onSocketError(function(res) {
      console.log('WebSocket连接打开失败，请检查！')
    })


  },
  textButton: function() {
    var that=this
    chatInput.setTextMessageListener(function(e) {
      let content = e.detail.value;
      console.log(content);
        var data = {
          type: 'say',
          uid: wx.getStorageSync('userInfo').user_id,
          fid: that.data.fid,
          content: content
        };
        wx.sendSocketMessage({
          data: JSON.stringify(data)
        })
        var newdata={
          content: content,
          fid:that.data.fid,
          time:new Date(),
          uid: wx.getStorageSync('userInfo').user_id
        }
        var list = that.data.list
        list.push(newdata)
        that.setData({
            list,
          scrollTop: 99999 + that.data.scrollTop
          })
    });
  },
  voiceButton: function() {
    chatInput.recordVoiceListener(function(res, duration) {
      let tempFilePath = res.tempFilePath;
      let vDuration = duration;
      console.log(tempFilePath, vDuration);
    });
    chatInput.setVoiceRecordStatusListener(function(status) {
      switch (status) {
        case chatInput.VRStatus.START: //开始录音

          break;
        case chatInput.VRStatus.SUCCESS: //录音成功

          break;
        case chatInput.VRStatus.CANCEL: //取消录音

          break;
        case chatInput.VRStatus.SHORT: //录音时长太短

          break;
        case chatInput.VRStatus.UNAUTH: //未授权录音功能

          break;
        case chatInput.VRStatus.FAIL: //录音失败(已经授权了)

          break;
      }
    })
  },
  extraButton: function() {
    let that = this;
    chatInput.clickExtraListener(function(e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function(res) {
          let tempFilePath = res.tempFilePaths[0];
        }
      });
    });
    chatInput.setExtraButtonClickListener(function(dismiss) {
      console.log('Extra弹窗是否消息', dismiss);
    })
  },
  myFun: function() {
    wx.showModal({
      title: '小贴士',
      content: '这是用于拓展的自定义功能！',
      confirmText: '确认',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          toast.show('success', '自定义功能')
        }
      }
    })
  },

  resetInputStatus: function() {
    chatInput.closeExtraView();
  },
  gotothis:function(e){
    if (this.data.fid == e.target.dataset.fid)return
    var id=this.data.id
    wx.navigateTo({
      url: '../positionItel/positionItel?id=' + id
    })
  }
});