
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',  
    product_detail: {}, //object 
    item:{},
    qty:0,
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    this.checkIfRegist();
    var order_id = options.id 
    console.log(order_id)
    this.setData({
      order_id: order_id
    })
    
  },

  onShow: function () {
    var order_id = this.data.order_id
    this.getOrderDetail(order_id) 
  },


  //抓取订单
  getOrderDetail: function (order_id) {
    wx.showLoading({
      title: "加载中…"
    })
    var obj=this
    var userInfo = app.globalData.userInfo 
    app.service.orderDetail(order_id, userInfo.openId)
      .then(res => { 
        wx.hideLoading()
        if (res.errcode == 0) { 
          
          if(res.data && res.data.products){
            var product=res.data.products[0]
            console.log(product)
            obj.setData({
              product_detail: res.data,
              item: product,
              qty: res.data.products.length
            })
          }
        }
      })
      .catch(res => {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  toHistoryPage() {
    wx.navigateTo({
      url: '../new_order/new_order'
    })
  },

  
  //自用
  toSelf: function () { 
    var order_product_id = this.data.product_detail.products[0].pid
    var userInfo = app.globalData.userInfo  
    wx.navigateTo({
      url: "../activation/activation?op=" + order_product_id + "&mid=" + userInfo.mID
    })
  },

  //赠送好友
  toFriend: function () {
    var order_product_id = this.data.product_detail.products[0].pid  
    wx.navigateTo({
      url: "../give/give?op=" + order_product_id
    })
  },

  //确认是否已注册
  checkIfRegist: function () {
    var userInfo = app.globalData.userInfo
    if (!userInfo.mobile) {
      wx.navigateTo({
        url: '../list/list',
      })
      return;
    }
  },

   

})