// pages/list/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    regist_show: false,
    auth_show: false,
    next_page_url: '',
    mode: "scaleToFill",
    banner_arr: [],
    product_arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    click_history: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    this.getProductList();
    this.getBannerList();  
  },

  onShow:function(){
    var userInfo = app.globalData.userInfo
    if (!userInfo){
      var obj=this
      app.login().then(function (res) {
        if (res) { 
          obj.setData({ 
            auth_show: false,
          })
        }
      }, (error) => {
         
      })
    }
  },
 

  //购买历史
  toHistoryPage: function(e) {
    var userInfo = app.globalData.userInfo
    //var next_page_url = '../purchase_success/purchase_success?id=108'
    //var next_page_url = "../accept_give/accept_give?mid=3&op=15&t="  
    var next_page_url = '../new_order/new_order'
     
    this.setData({
      next_page_url: next_page_url,
      click_history: true
    })
    
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
    } else
    if (userInfo.mobile) {
      wx.navigateTo({
        url: next_page_url,
      })
    } else {
      this.setData({
        regist_show: true
      })
    }
  },


  //去赠送好友
  toSendCoupon: function(e) {
    var next_page_url = '../mcoupon/mcoupon'
    this.setData({
      next_page_url: next_page_url,
      click_history: false
    })
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
    } else
    if (userInfo.mobile) {
      wx.navigateTo({
        url: next_page_url,
      })
    } else {
      this.setData({
        regist_show: true
      })
    }
  },

  //收到的祝福
  toReceiveGift: function(e) {
    var next_page_url = '../new_receive/new_receive'
    this.setData({
      next_page_url: next_page_url,
      click_history: false
    })
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
    } else
    if (userInfo.mobile) {
      wx.navigateTo({
        url: next_page_url,
      })
    } else {
      this.setData({
        regist_show: true
      })
    }
  },

  //大图 link
  toLink: function (e) { 
    var next_page_url = e.currentTarget.dataset.link
    if (next_page_url){
      wx.navigateTo({
        url: '..'+next_page_url,
      })
    }
  },

  //注册回传
  onRegistResult: function(e) {
    wx.hideLoading()
    var userInfo = app.globalData.userInfo
    if (e.detail.result == "ok" && userInfo.mobile) {
      this.setData({
        regist_show: false
      })
      console.log(this.data.next_page_url);
      if (this.data.next_page_url) {
        wx.navigateTo({
          url: this.data.next_page_url,
        })
      }
    }
  },
  //获取手机号解释失败
  phoneResult: function (e) {
    wx.hideLoading() 
    if (e.detail.result == "fail" ) {
      wx.showToast({
        title: '获取手机号解释失败，请重新操作',
        icon: 'none'
      })
    }
  },
  //注册关闭
  onCloseRegist: function(e) {
    this.setData({
      regist_show: false
    })
  },

  //授权回传
  onAuthResult: function(e) {
    wx.hideLoading()
    if (e.detail.result == "ok") {
      this.setData({
        auth_show: false
      })
      if (this.data.click_history) {
        this.toHistoryPage()
      } else {
        this.toReceiveGift()
      }
    }
  },
  //授权关闭
  onCloseAuth: function(e) {
    this.setData({
      auth_show: false
    })
  },

  //获取商品banner
  getBannerList() {
    app.service.getProductBanner()
      .then(res => {
        wx.stopPullDownRefresh()
        if (res.errcode == 0) {
          this.setData({
            banner_arr: res.data
          })
        }
      })
      .catch(res => {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  //获取商品列表
  getProductList() {
    app.service.getProducts()
      .then(res => {
        wx.stopPullDownRefresh()
        if (res.errcode == 0) {
          this.setData({
            product_arr: res.data
          })
        }
      })
      .catch(res => {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },


  //下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.getProductList();
    this.getBannerList();
  },
 


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {


  },

  
})