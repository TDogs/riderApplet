// pages/psz/psz.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpsd_com: true,//配送完成
    wcqr_com: true,//完成确认
    radioItems: [
      { name: '本人签收', value: '5', checked: 'true'},
      { name: '家人/门卫代签', value: '2'},
      { name: '异常订单', value: '6'},
    ],
    order_statue:true,
    list_orders: [],
    page: 1,
    stop:false,
    eid:'',
    k:'',
    txt_info:'',
    radio_info:'',
    news_count:'',

  },
  //配送完成
  hpsd_bnt: function (e) {
    this.setData({
      hpsd_com: !this.data.hpsd_com,
      eid: e.currentTarget.dataset.eid,
      k: e.currentTarget.dataset.k
    })
  },




  //确认取货
  ljqd_com_bnt: function (e) {
    this.setData({
      qrdh_com: !this.data.qrdh_com,
      eid: e.currentTarget.dataset.eid,
      k: e.currentTarget.dataset.k
    })
  },


  /**
   * 订单详情
   * @param e
   */
  finishOrderDetails: function (e) {
    let eid = e.currentTarget.dataset.eid;
    wx.navigateTo({
      url: '/pages/order_xx2/order_xx2?eid='+eid+'&type=4',
    });
  },

  /**
   * 获取配货列表
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
    app.service.GetOrders(phone,obj.data.page,4)
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



  //选择配送情况
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}

    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.setData({
      radio_info:checked,
    })
  },
  //确认送达
  qrsd_bnt: function (e) {
    this.setData({
      wcqr_com: !this.data.wcqr_com,
      hpsd_com: !this.data.hpsd_com
    })
  },

  txt_info:function(e){
    this.setData({
      txt_info: e.detail.value,
    })
  },
  cancel:function(){
    this.setData({
      wcqr_com: !this.data.wcqr_com,
    })
  },
    //完成确认
  wcqr_bnt: function (e) {
    console.log(66)
    let radio_info = this.data.radio_info ? this.data.radio_info : 5;
    console.log(this.data.txt_info)
    console.log(this.data.radioItems)
    console.log(radio_info)
    console.log(this.data.eid)
    console.log(this.data.k)


    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.finish(phone,this.data.eid,this.data.txt_info,radio_info)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            let list_orders_new = obj.data.list_orders;
            list_orders_new.splice(obj.data.k,1);
            if(obj.data.list_orders.length == 0){
              obj.setData({
                order_statue:false,
              })
            }
            obj.setData({
              qrdh_com: !obj.data.qrdh_com,
              list_orders: list_orders_new,
            });
            this.cancel();
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
    app.startInter()  //   启动定时器
    this.GetOrders()
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