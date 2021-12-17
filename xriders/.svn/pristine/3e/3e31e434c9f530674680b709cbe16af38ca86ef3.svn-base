// pages/dqh/dqh.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrdh_com: true,//确认取货弹窗
    order_statue:true,
    list_orders: [],
    page: 1,
    stop:false,
    eid:'',
    k:'',
    news_count:'',

  },
  //确认取货
  ljqd_com_bnt: function (e) {
    this.setData({
      qrdh_com: !this.data.qrdh_com,
      eid: e.currentTarget.dataset.eid,
      k: e.currentTarget.dataset.k
    })
  },


  assPick: function (e) {
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.assPick(phone,this.data.eid)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            let list_orders_new = obj.data.list_orders;
            list_orders_new.splice(obj.data.k,1);
            if(obj.data.list_orders.length == 0){
              clearInterval(app.getLocationTime); //   清除定时器
              obj.setData({
                order_statue:false,
              })
            }
            obj.setData({
              qrdh_com: !obj.data.qrdh_com,
              list_orders: list_orders_new,
            });
            wx.showToast({
              title: res.errormsg,
              icon: 'success',
              duration: 2000,
            })

          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },


  /**
   * 订单详情
   * @param e
   */
  finishOrderDetails: function (e) {
   let eid = e.currentTarget.dataset.eid;
    wx.navigateTo({
      url: '/pages/order_xx/order_xx?eid='+eid+'&type=3',
    });
  },

  /**
   * 获取取货列表
   * @constructor
   */
  GetOrders:function(){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.GetOrders(phone,obj.data.page,3)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            if(res.data.length >0 ){
              if (!app.tool.isEmpty(res.data)) {
                console.log(123)
                console.log(res.data)
                var arr1 = this.data.list_orders; //从data获取当前datalist数组
                var arr2 = res.data; //从此次请求返回的数据中获取新数组
                if (arr2) {
                  arr1 = arr1.concat(arr2)
                  obj.setData({
                    list_orders: arr1,
                  })
                }
                app.startInter()  //   启动定时器

              } else {
                obj.setData({
                  stop: true,
                  order_statue:false,
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
      list_orders: [],
    });
    this.new();
    this.GetOrders();
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
    if (!this.data.stop){
      var page = that.data.page + 1; //获取当前页数并+1
      that.setData({
        page: page, //更新当前页数
      })
      that.GetOrders();//重新调用请求获取下一页数据
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})