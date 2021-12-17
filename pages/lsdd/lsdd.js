// pages/lsdd/lsdd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_orders: [],
    page: 1,
    stop:false,
    order_statue:true,
    news_count:'',
  },
  //返回上一页
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
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

  /**
   * 获取订单列表
   * @constructor
   */
  orderHistory:function(p){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.GetOrders(phone,p,5)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            if(res.data.length >0 ){
              if (!app.tool.isEmpty(res.data)) {
                var arr1 = this.data.list_orders; //从data获取当前datalist数组
                var arr2 = res.data; //从此次请求返回的数据中获取新数组
                if (arr2) {
                  arr1 = arr1.concat(arr2)
                  obj.setData({
                    list_orders: arr1,
                  })
                }
                if(obj.data.list_orders.length == 0){
                  obj.setData({
                    order_statue:false,
                  })
                }
              } else {
                obj.setData({
                  stop: true
                })
              }
            }
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
    this.setData({
      page: 1,
      list_orders: [],
      stop: false,
    })
    this.orderHistory(this.data.page);
    this.new();
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
    var that = this;
    if (!that.data.stop){
      var page = that.data.page + 1; //获取当前页数并+1
      that.setData({
        page: page, //更新当前页数
      })
      that.orderHistory(this.data.page);//重新调用请求获取下一页数据
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})