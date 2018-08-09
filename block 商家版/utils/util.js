var util = require('./md5.js')
var promisemin = require('./es6-promise.min.js')
import Promise from 'es6-promise.min';

/**
 * request请求封装
 * url   传递方法名
 * types 传递方式(1,GET,2,POST)
 * data  传递数据对象
 */
function sendRrquest(url, types, data) {
  var app = getApp()
  // 公共参数
  var d = {
    xcx_type: 'laoshu',
    token: getKey(2),
    nowtime: getKey(1),
    user_id: wx.getStorageSync('userInfo').user_id,
  }
  // 合并对象
  var datas = mergeObj(d, data)
  var promise = new Promise(function (resolve, defaults) {
    wx.request({
      url: app.globalData.url + url,
      data: datas,
      method: (types === 1) ? 'GET' : 'POST',
      header: (types === 1) ? { 'content-type': 'application/json' } : { 'content-type':'application/x-www-form-urlencoded'},
      success: resolve,
      fail: function (res) {
        bounced(3, '网络错误', 2)
        var datas = { res: JSON.stringify(res), name: url }
        sendRrquest('faildata', 2, datas)
      },
      complete: defaults,
    })
  });
  return promise;
}

/**
 * object 对象合并
 * o1     对象一
 * o2     对象二
 */
function mergeObj(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key]
  }
  return o1;
}

/** 
 * 大约在地球椭球上的两个点之间的距离
 * @param  lat1 
 * @param  lng1 
 * @param  lat2 
 * @param  lng2 
 */
var EARTH_RADIUS = 6378137.0;    //单位M  
var PI = Math.PI;

function getRad(d) {
  return d * PI / 180.0;
}

function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);

  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
}    


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 自动生成token
 */
function getKey (n) {
  switch (n) {
    case 1:
      var timestamp = Date.parse(new Date()) / 1000;
      return timestamp
    break;
    case 2:
      var h = new Date();
      var y = h.getFullYear()
      var m = h.getMonth() + 1
      var d = h.getDate()
      var token = util.hexMD5(y + '-' + m + '-' + d + '04714999ce8e8cef9c6f272a6d9fb12e')
      return token
    break;
  }
}
module.exports = {
  getKey: getKey,
  formatTime: formatTime,
  sendRrquest: sendRrquest,
  getGreatCircleDistance: getGreatCircleDistance,
}
