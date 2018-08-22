//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        if (res.code) {
          // wx.request({
          //   url: 'http://192.168.1.27:8001/Api/GetSessionKey',
          //   data: {
          //     code: res.code
          //   },
          //   method: "POST",
          //   header: {
          //     'content-type': 'application/json'
          //   },
          //   success: function (resquest) {
          //     console.log(resquest)
          //     wx.getUserInfo({
          //       withCredentials: true,
          //       success: function (res) {
          //         console.log('加密数据:', res.encryptedData);
          //         console.log('向量:', res.iv);
          //         console.log('userinfo返回数据:', res);
          //         wx.request({
          //           url: 'http://192.168.1.27:8001/Api/MiniPLogin',
          //           data: {
          //             sessionKey: resquest.data.sessionKey,
          //             encryptedData: res.encryptedData,
          //             iv: res.iv
          //           },
          //           method: "POST",
          //           header: {
          //             'content-type': 'application/json'
          //           },
          //           success: function (resquest) {
          //             console.log(resquest)
          //           }
          //         })
          //       }
          //     })
          //   }
          // })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res);
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})