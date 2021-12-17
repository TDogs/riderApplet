// pages/order_xx2/order_xx2.js
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
    eid: '',
    type: '',
    order_details: [],
    receiver_tel: '',
    store_tel: '',
    txt_info:'',
    radio_info:'',
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

  //配送完成
  hpsd_bnt: function (e) {
    this.setData({
      hpsd_com: !this.data.hpsd_com
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
  //完成确认
  wcqr_bnt: function (e) {
    this.setData({
      wcqr_com: !this.data.wcqr_com,
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

  //完成确认
  wcqr_bnt: function (e) {
    let radio_info = this.data.radio_info ? this.data.radio_info : 5;
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
              this.cancel();
                wx.showToast({
                title: res.errormsg,
                icon: 'success',
                duration: 2000,
                success:function(res) {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/psz/psz',
                    });
                  },1000)

                }
                })


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