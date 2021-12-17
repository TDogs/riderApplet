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
    is_share: false,
    has_gift_txt: false,
    mid:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var userInfo = app.globalData.userInfo
    this.setData({
      op: options.op,
      wx_nickname: userInfo.nickName,
      mid: options.mid
    })
    this.getGoodsDetail()
    
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
    app.service.getGoodsDetail(this.data.op, userInfo.openId,this.data.mid)
      .then(res => {
        console.log();
        wx.hideLoading()
        if (res.errcode == 0) { 
          this.setData({
            product_detail: res.data, 
          }) 
          this.getGiftTxt()
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
    app.service.giftTextByRand(2)
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

  //确认回赠并激活领取
  saveReturnPartner() {
    var op=this.data.op;
    var userInfo = app.globalData.userInfo
    var mobile='';
    if (userInfo !=null){
      mobile=userInfo.mobile
    }
    wx.showLoading({
      title: "加载中…"
    })
    
    app.service.returnPartnerGetCoupon(this.data.mid, op, mobile, this.data.gift_txt )
      .then(res => {
        console.log(res)
        wx.hideLoading()
        if (res.errcode == 0) { 
          wx.redirectTo({
            url: '../accept_success/accept_success',
          })
        }else {
          wx.showToast({
            title: res.errormsg,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  //换一则祝福语
  changeGiftTxt: function () {
    this.getGiftTxt()
  },

   
 
})