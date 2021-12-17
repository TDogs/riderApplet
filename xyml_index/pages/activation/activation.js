// pages/activation/activation.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "获取验证码",
    currentTime: 61,
    disabled: false,
    data_phone: '',
    data_code: '',
    suffix: '',
    op: '',
    mid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    console.log( app.globalData.userInfo);
    this.setData({
      op: options.op,
      mid: options.mid,
      data_phone: app.globalData.userInfo.mobile,
    })
  },



  // 获取输入框的值
  getInputKey(e) {
    let key = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [key]: value
    })
  },

  // 获取验证码
  getVerificationCode() {
    console.log(this.data);
    if (!this.data.disabled) {
      this.getCode();
    }
  },

  getCode() {
    let phone = this.data.data_phone;
    if (this.isPhoneAvailable(phone)) {
      app.service.getSMSCode(phone)
        .then(res => {
          if (res.errcode == 0) {
            wx.showToast({
              title: '已发送',
              icon: 'none'
            })
            this.setData({
              disabled: true
            })
          }
        })
        .catch(res => {
          console.log(res)
          wx.showToast({
            title: '发送失败',
            icon: 'none'
          })
        })

      // 设置发送验证码按钮样式
      let interval = null;
      let currentTime = this.data.currentTime;
      let obj = this
      interval = setInterval(function() {
        currentTime--;
        obj.setData({
          time: currentTime,
          suffix: '秒后可重新获取'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          obj.setData({
            time: '重新发送',
            suffix: '',
            currentTime: 61,
            disabled: false
          })
        }
      }, 1000)
    } else {
      wx.showToast({
        title: '请输入正确的手机号码。',
        icon: 'none'
      })
    }
  },

  toActive: function() {
    let obj = this
    if (!this.isPhoneAvailable(this.data.data_phone)) {
      wx.showToast({
        title: '请输入正确的手机号码。',
        icon: 'none'
      })
    } else {
      var userInfo = app.globalData.userInfo
      console.log(userInfo)
      obj.shareGetCoupon(userInfo.openId, userInfo.mobile)
    }

  },
  getPhoneNumber: function(e) {
    console.log(e)
    var detail = e.detail
    var obj = this
    if (detail.iv) {
      wx.showLoading({
        title: "加载中…"
      })
      wx.login({
        success: function(r) {
          var code = r.code; //登录凭证 
          if (code) {
            app.service.decodeUserInfo(detail.encryptedData, detail.iv, code)
              .then(res => {
                if (res.errcode == 0 && res.data != '') {
                  //obj.triggerEvent('registResult',res.data.phoneNumber)
                  obj.login(res.data.phoneNumber)
                }
              })
              .catch(res => {
                console.log("获取手机号解释失败")
                console.log(res)
              })
          }
        },
        fail: function() {
          callback(false)
        }
      })
    }

  },

  login: function(phone) {
    var obj = this;
    // 登录
    wx.login({
      success: function(r) {
        var code = r.code; //登录凭证 
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) {
              //3.解密用户信息 获取unionId
              app.service.regist(res.encryptedData, res.iv, code, '')
                .then(res => {
                  if (res.errcode == 0) {
                    //app.globalData.userInfo = res.data 
                    console.log(res.data)
                    obj.shareGetCoupon(res.data.openId, phone)
                  }
                })
                .catch(res => {
                  console.log("登录失败")
                  console.log(res)
                })
            },
            fail: function() {
              console.log('获取用户信息失败')
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


  //领取券
  shareGetCoupon(openid, mobile) {
    wx.showLoading({
      title: "加载中…"
    }) 
    app.service.shareGetCoupon(this.data.mid, this.data.op, openid, mobile)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          wx.redirectTo({
            url: '../accept_success/accept_success',
          })
        }else {
          wx.showModal({
            title: '',
            content: '领取失败',
            showCancel: false,
            confirmText: '返回首页',
            success: function (res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              //if (res.confirm) {
              wx.redirectTo({
                  url: '../index/index',
                })
              //}
            }
          });
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },


  isPhoneAvailable(phone) {
    var myreg = /^[1][0-9]{10}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  }

})