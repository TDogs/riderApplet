// pages/order_xx/order_xx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wfps_com: true,
    qrdh_com: true,
    eid: '',
    type: '',
    order_details: [],
    receiver_tel: '',
    store_tel: '',
  },


  assPick: function (e) {
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.assPick(phone,obj.data.eid)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            wx.showToast({
              title: res.errormsg,
              icon: 'success',
              duration: 2000,
            })
            wx.redirectTo({
              url: '/pages/psz/psz',
            });
          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },

  finishOrderDetails:function(){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.finishOrderDetails(phone,obj.data.eid,obj.data.type)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            obj.setData({
              order_details: res.data,
              receiver_tel: res.data['orderInfo'].receiver_tel,
              store_tel: res.data['shopInfo'].tel,
            })
          }else{
            wx.hideLoading()
            app.tool.showToast('出错了！');
          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },


  cancel:function(){
    this.setData({
      qrdh_com: !this.data.qrdh_com
    })
  },

  //无法配送弹窗
  wfps_bnt: function (e) {
    this.setData({
      wfps_com: !this.data.wfps_com
    })
  },
  //确认取货弹窗
  qrdh_bnt: function (e) {
    this.setData({
      qrdh_com: !this.data.qrdh_com
    })
  },
  //无法配送，拨打门店电话
  callstore_bnt() {
    wx.makePhoneCall({
      phoneNumber: '400-9121-211'//门店电话
    })
  },

  //拨打门店电话
  callstore() {
    wx.makePhoneCall({
      phoneNumber: this.data.store_tel//收货人电话

    })
  },

  //拨打收货人电话
  calluser() {
    wx.makePhoneCall({
      phoneNumber: this.data.receiver_tel//收货人电话
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      eid:options.eid,
      type:options.type,
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

    this.finishOrderDetails();
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

  }
})