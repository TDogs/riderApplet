// pages/news_xx/news_xx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    arr:[],
    nid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nid:options.id,
    })
  },

  MessageDetails:function(){
    var than = this;
    app.service.MessageDetails(than.data.nid)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            than.setData({
              arr: res.data,
            })
          }
        })
        .catch(res => {
          wx.hideLoading()
          that.tool.showToast('出错了！');
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

    this.MessageDetails();
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