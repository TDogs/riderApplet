// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regist_show: false,
    auth_show: false,
    auth_log: true,
  },

  gotoPage: function (e) {
    let obj = this;
    app.tool.showLoading();
    var userInfo = app.globalData.userInfo;
    if (userInfo == null) {
      app.login().then(function (res) {
        obj.checkAuth()
      }, (error) => {
        obj.checkAuth()
      })
    }else {
      obj.checkAuth()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo
    console.log(123)
    console.log(userInfo)
    console.log(this.data.auth_log)
    if (userInfo == null) {
      this.setData({
        auth_log: false
      })
      console.log(this.data.auth_log)

      wx.hideLoading()
    } else if (userInfo.mobile) {
      //console.log(userInfo)
      this.setData({
        userInfo: userInfo
      })
      if(userInfo.check == 0){
        wx.redirectTo({
          url: '/pages/authentication/authentication?status='+userInfo.check
        })
      }else{
        wx.redirectTo({
          url: '/pages/index/index?status='+userInfo.check
        })
      }

      wx.hideLoading()
    } else {
      this.setData({
        auth_log: false
      })
      wx.hideLoading()
    }
  },

  /**
   * 确认会员是否授权＆是否注册
   */
  checkAuth: function () {
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
      wx.hideLoading()
    } else if (userInfo.mobile) {
      //console.log(userInfo)
      this.setData({
        userInfo: userInfo
      })
      if(userInfo.check == 0){
        wx.redirectTo({
          url: '/pages/authentication/authentication?status='+userInfo.check
        })
      }else{
        wx.redirectTo({
          url: '/pages/index/index?status='+userInfo.check
        })
      }

      wx.hideLoading()
    } else {
      this.setData({
        regist_show: true
      })
      wx.hideLoading()
    }
  },


//注册回传
  onRegistResult: function (e) {
    wx.hideLoading()
    var userInfo = app.globalData.userInfo
    if (e.detail.result == "ok" && userInfo.mobile) {
      this.setData({
        regist_show: false
      })
      this.checkAuth()
    }
  },
//注册关闭
  onCloseRegist: function (e) {
    this.setData({
      regist_show: false
    })
  },

//授权回传
  onAuthResult: function (e) {
    wx.hideLoading()
    if (e.detail.result == "ok") {
      this.setData({
        auth_show: false
      })
      this.checkAuth()
    }
  },
//授权关闭
  onCloseAuth: function (e) {
    this.setData({
      auth_show: false
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },


})