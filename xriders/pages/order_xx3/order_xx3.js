// pages/order_xx3/order_xx3.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lid:'',
    status:'',
    receiver_tel:'',
    store_tel:'',
  },
  //拨打门店电话
  callstore() {
    wx.makePhoneCall({
      phoneNumber: this.data.store_tel//门店电话
    })
  },
  //拨打收货人电话
  calluser() {
    wx.makePhoneCall({
      phoneNumber: this.data.receiver_tel//收货人电话
    })
  },


  OrderDetails:function(){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.finishOrderDetails(phone,obj.data.lid,obj.data.status)
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lid:options.lid,
      status:options.status,
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

    this.OrderDetails();
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