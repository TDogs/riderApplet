// pages/wdqb/wdqb.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',//开始时间
    date2: '',//结束时间
    news_count:'',
    list:[],
    money:'',
    status:true,

  },
  //开始时间
  bindDateChange: function (e) {    
    this.setData({
      date: e.detail.value
    })
  },
  //结束时间
  bindDateChange2: function (e) {    
    this.setData({
      date2: e.detail.value
    })
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

  getMyWallet:function(){
    var that = this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    console.log(that.data.date)
    console.log(that.data.date2)
    app.service.getMyWallet(that.data.date,that.data.date2,phone)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            if (res.data.list.length > 0) {
              if (!app.tool.isEmpty(res.data.list)) {
                that.setData({
                  money: res.data.money,
                  list: res.data.list,
                })
              }
            }else{
              that.setData({
                status: !that.data.status,
              })
            }
          }
        })
        .catch(res => {
          wx.hideLoading()
          that.tool.showToast('出错了！');
        })
  },

  search:function(){
    this.setData({
      money: 0,
      list: [],
    })

    this.getMyWallet();
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
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth();
    var d = myDate.getDate();

    var sy = y;
    var sm = m;
    var sd = d == 1 ? d : (d - 1);
    if(m == 0){
      sy = y - 1;
      sm = 12;
    }

    let st = sy +'-'+ sm +'-'+ sd;
    let et = y +'-'+ (m+1) +'-'+ d;


    this.setData({
      date:st,
      date2:et,
    });

    this.new()
    this.getMyWallet()

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