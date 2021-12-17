// pages/grxx/grxx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member:'',
    order_statue:true,
  },
  //返回上一页
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.personageInfo(phone,this.data.eid)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
              obj.setData({
                member:res.data,
                order_statue:false,
              });
          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
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