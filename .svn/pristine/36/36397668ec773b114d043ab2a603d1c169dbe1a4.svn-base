// pages/components/regist/regist.js
//import request from '../../../utils/request.js'
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {  
    regist_show: {
      type: Boolean,
      value: false,
    },  
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    regist_show:false, 
  },

  /**
   * 组件的方法列表
   */
  methods: {

    getPhoneNumber: function (e) {
      var detail = e.detail
      var obj=this
      if (detail.iv) {
        wx.showLoading({ title: "加载中…" })
        wx.login({
          success: function (r) {
            var code = r.code; //登录凭证
            if (code) { 
              app.service.decodeUserInfo(detail.encryptedData, detail.iv, code)
                .then(res => { 
                  wx.hideLoading()
                  if (res.errcode == 0) {
                    console.log(res);
                    //obj.triggerEvent('registResult',res.data.phoneNumber)
                    obj.login(res.data.phoneNumber)
                  }
                })
                .catch(res => { 
                  console.log("获取手机号解释失败")
                  console.log(res)
                  obj.triggerEvent('phoneResult', { "result": "fail" })
                })
            }
          },
          fail: function () {
             //callback(false)
          }
        })
      }

    },
 
    login: function (phone) {
      var obj = this;
      // 登录
      wx.login({
        success: function (r) {
          var code = r.code; //登录凭证 
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                console.log({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code,
                  phone: phone
                })
                //3.解密用户信息 获取unionId, 且注册会员
                app.service.regist(res.encryptedData, res.iv, code, phone)
                  .then(res => {
                    wx.hideLoading()
                    if (res.errcode == 0) {
                      app.globalData.userInfo = res.data
                      obj.triggerEvent('registResult', { "result": "ok" })
                    }
                  })
                  .catch(res => {
                    console.log("登录失败")
                    console.log(res)
                    obj.triggerEvent('registResult', { "result": "fail" })
                  })
              },
              fail: function () {
                console.log('获取用户信息失败')
                obj.triggerEvent('registResult', { "result": "fail" })
              }
            })

          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function () {
          callback(false)
        }

      })
    },
 
    closeRegistMask:function(e){
      this.triggerEvent('closeRegist', { "close": "ok" })
    },
  },

  

})