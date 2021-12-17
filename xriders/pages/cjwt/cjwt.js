// pages/cjwt/cjwt.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:[],
    news_count:'',
  },

  new:function(){
    var that = this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.MessageConten(phone)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            that.setData({
              news_count: res.data.count,
            })
          }
        })
        .catch(res => {
          wx.hideLoading()
          that.tool.showToast('出错了！');
        })
  },

  details:function(e){
    let id = e.currentTarget.dataset.fid;
    wx.navigateTo({
      url: '/pages/cjwt_xx/cjwt_xx?fid='+id,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.new();
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.question(phone)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            that.setData({
              question: res.data,
            })
          }
        })
        .catch(res => {
          wx.hideLoading()
          that.tool.showToast('出错了！');
        })

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