//app.js

import service from './utils/service.js'


App({
  onLaunch: function() {
    
  },
   
  globalData: {
    userInfo: null,
    invoiceInfo: {
      needInvoice: false,
      isCompanyInvoice: false,
      personEmail: '',
      companyTitle: '',
      companyTax: '',
      companyEmail: '',
    },
    shareTicket: '',
    openGid: ''
  },
  service: new service(),

   
  login: function () {
    var obj = this
    console.log("app login")
    return new Promise(function (resolve, reject) {
      // 登录
      wx.login({
        success: function (r) {
          var code = r.code; //登录凭证 
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.解密用户信息 获取unionId
                obj.service.decodeUserInfo(res.encryptedData, res.iv, code)
                  .then(res => {  
                    if (res.errcode == 0) {
                      //res.data.openId ='otRUa4698rUyGONVz_UdHLbf6qe8'
                      obj.globalData.userInfo = res.data 
                      resolve(res);
                    }
                  })
                  .catch(res => {
                    console.log(res)
                    wx.showToast({
                      title: '出错了！',
                      icon: 'none'
                    })
                  })

              },
              fail: function (err) {
                console.log('获取用户信息失败...')
                reject(err)
              }
            })

          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function (err) {
          reject(err)
        }

      })
    })
  },


  
})