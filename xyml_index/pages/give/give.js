// pages/give/give.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    op: '', 
    product_detail: {},
    gift_txt: '',
    wx_nickname: '',
    is_share:false,
    has_gift_txt:false,
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    var userInfo = app.globalData.userInfo
    this.setData({
      op: options.op, 
      gift_txt: '',
      wx_nickname: userInfo.nickName,
    })
    this.getGoodsDetail()
  },

  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    var userInfo = app.globalData.userInfo
    this.setData({ 
      gift_txt:'',
      wx_nickname: userInfo.nickName,
    })
  },

  // 获取输入框的值
  getInputKey(e) { 
    let key = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [key]: value
    })
  },

  //抓订单商品资料
  getGoodsDetail() {
    wx.showLoading({
      title: "加载中…"
    })
    var userInfo = app.globalData.userInfo 
    app.service.getGoodsDetail(this.data.op, userInfo.openId, userInfo.mID)
      .then(res => { 
        wx.hideLoading()
        if (res.errcode == 0) {
          var has_gift_txt = res.data.sender_txt
          has_gift_txt = has_gift_txt.length>0?true:false
          this.setData({
            product_detail: res.data,
            has_gift_txt: has_gift_txt
          })
          if (!has_gift_txt){
             this.getGiftTxt()
          }else {
            this.setData({            
              gift_txt: res.data.sender_txt,
              wx_nickname: res.data.sender_name,
            }) 
          }
        } else {
          wx.showToast({
            title: res.errormsg,
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 1000)
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  //祝福语
  getGiftTxt() {
    wx.showLoading({
      title: "加载中…"
    })
    app.service.giftTextByRand(1)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          this.setData({
            gift_txt: res.data.txt
          })
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  //换一则祝福语
  changeGiftTxt: function() {
    this.getGiftTxt()
  },
   
  /**
   * 保存分享资料
   */
  saveCouponTransfer(mid, op, time) {
    wx.showLoading({
      title: "加载中…"
    })
    var userInfo = app.globalData.userInfo
    var wx_nickname = this.data.wx_nickname;
    if (wx_nickname==''){
       wx_nickname = userInfo.nickName
    }
    app.service.shareCouponToFriend(mid, op, time, this.data.gift_txt, wx_nickname)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          
        }else { 
          wx.showToast({
            title: res.errormsg,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var userInfo = app.globalData.userInfo
    var time=new Date().getTime()
 
    if (!this.data.is_share){
      this.setData({
        is_share:true
      }) 
      this.saveCouponTransfer(userInfo.mID, this.data.op, time);
    
      setTimeout(function () { 
        //关闭当前页面,跳转到另外一个页面
        wx.redirectTo({
          url: '../give_success/give_success',
        })
      }, 1000)
      
      return { 
        title: this.data.product_detail.goods_name,
        path: "/pages/accept_give/accept_give?mid=" + userInfo.mID + "&op=" + this.data.op + "&t=" + time,
        imgUrl: this.data.product_detail.img,
      }
    }
 
  }
})