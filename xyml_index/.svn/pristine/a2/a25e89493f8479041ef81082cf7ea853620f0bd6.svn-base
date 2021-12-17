// pages/accept_give/accept_give.js

const app = getApp(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:"",
    op:"", 
    product_detail: {},
    is_sender:false,
    page_hidden:true, 
    imgwidth: 0,
    imgheight: 0,
    auth_show: false,
    regist_show: false,
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    console.log(options);
    this.setData({
      op: options.op,
      mid: options.mid
    })
  },

  onShow:function(){
    var obj = this
    obj.getGoodsDetail() 
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      app.login().then(function (res) {
        if (res) {
          var is_sender = res.data.mID == obj.data.mid
          obj.setData({
            is_sender: is_sender,  
          })  
        }
      }, (error) => { 
        
      })
    }else {
      var is_sender = userInfo.mID == obj.data.mid
      obj.setData({
        is_sender: is_sender,
      })  
    }
  },
  //抓订单商品资料
  getGoodsDetail() {
    wx.showLoading({
      title: "加载中…"
    })
    var obj=this
    var openid=''
    var userInfo = app.globalData.userInfo 
    if (userInfo!=null){
      openid = userInfo.openId
    }
    app.service.getGoodsDetail(this.data.op, openid, this.data.mid)
      .then(res => {
        wx.hideLoading()
        console.log(res)
        if (res.errcode == 0) { 
          obj.setData({
            product_detail: res.data,
            page_hidden: false,
            mid: res.data.memberID
          })
          console.log(obj.data)
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

  //收下祝福
  toAccept:function(){
    var userInfo = app.globalData.userInfo 
    if (userInfo == null) {
      this.setData({
        auth_show: true,
      })
    } else {
      if (userInfo.mobile) {
        if (this.data.product_detail.trans_status == 1){
          var next_page_url = '../confirm_activation/confirm_activation?op=' + this.data.op + "&mid=" + this.data.mid
          console.log(next_page_url)
          wx.navigateTo({
            url: next_page_url,
          })
        }
      } else {
        this.setData({
          regist_show: true
        })
      }
  
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
      this.toAccept() 
    }
  },
  
  //注册关闭
  onCloseRegist: function(e) {
    this.setData({
      regist_show: false
    })
  },

  //回首页
  toList: function () { 
    var next_page_url = '../index/index'
    wx.redirectTo({
      url: next_page_url,
    })
  },

  
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;   //图片的真实宽高比例
    var viewWidth = 680,           //设置图片显示宽度，
      viewHeight = viewWidth / ratio;    //计算的高度值    
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  },

  //授权回传
  onAuthResult: function (e) {
    wx.hideLoading()
    if (e.detail.result == "ok") {
      this.setData({
        auth_show: false
      }) 
      this.toAccept() 
    }
  },
  //授权关闭
  onCloseAuth: function (e) {
    this.setData({
      auth_show: false
    })
  },
 

})