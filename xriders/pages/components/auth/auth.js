// pages/components/auth/auth.js

//import request from '../../../utils/request.js'

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    auth_show: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    auth_show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    login: function() {
      wx.showLoading({ title: "加载中…" })
      var obj = this
      // 登录
      wx.login({
        success: function(r) {
          var code = r.code; //登录凭证 
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function(res) {
                console.log({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                })
                //3.解密用户信息 获取unionId
                app.service.decodeUserInfo(res.encryptedData, res.iv, code)
                  .then(res => {
                    wx.hideLoading()
                    console.log(res);
                    if (res.errcode == 0) {
                      app.globalData.userInfo = res.data
                      obj.triggerEvent('authResult', {
                        "result": "ok"
                      })
                    }
                  })
                  .catch(res => {
                    console.log('login decodeUserInfo catch error')
                    console.log(res)
                  })
              },
              fail: function() {
                wx.hideLoading()
                console.log('获取用户信息失败')
                obj.triggerEvent('authResult', {
                  "result": "fail"
                })
              }
            })

          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function() {
          callback(false)
        }

      })
    },

    bindGetUserInfo: function(e) {
      if (e.detail.userInfo) {
        //用户按了允许授权按钮 
        this.login();
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    },

    closeAuthMask: function(e) {
      this.triggerEvent('closeAuth', {
        "close": "ok"
      })
    },

  },



})