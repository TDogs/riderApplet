// pages/leading/leading.js
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
    HBConfig_arr:[],
    HotProducts_arr:[],
    tip: true,
    current_page:false,
    remind_count:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = this
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      app.login().then(function (res) {
        obj.checkAuth()
      }, (error) => {
        obj.checkAuth()
      })
    }else {
      obj.checkAuth()
    } 
  },

  //关闭可用券弹窗
  box_gb: function () {
    this.setData({
      tip: !this.data.tip
    })
  },

  //立即去使用
  clickMe: function (e) {
    wx.navigateTo({
      url: '/pages/new_order/new_order',
    })
  },
  
  // 跳转商品详情
  jumpToDetail:function(e){
    var link =  e.target.dataset.link;
    wx.navigateTo({
      url: link,
    })
  },
  jumpToList:function(e){
    var link =  e.target.dataset.link;
    wx.navigateTo({
      url: link,
    })
  },

  HotProducts(){
    var obj = this
    app.service.HotProducts()
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          console.log(res.data)
          obj.setData({
            HotProducts_arr: res.data
          })
        } else {
          app.tool.showToast(res.errormsg);
        }
      })
      .catch(res => {
        wx.hideLoading()
        app.tool.showToast('出错了！');
      })
  },

  //首页配置图片
  HBConfig() {
    var obj = this
    app.service.HBConfig()
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          console.log(res.data)
          obj.setData({
            HBConfig_arr: res.data
          })
        } else {
          app.tool.showToast(res.errormsg);
        }
      })
      .catch(res => {
        wx.hideLoading()
        app.tool.showToast('出错了！');
      })
  },


  
  /**
  * 确认会员是否授权＆是否注册
  */
 checkAuth: function () {
  var userInfo = app.globalData.userInfo
  if (userInfo == null) {
    this.setData({
      auth_show: true
    })
    wx.hideLoading()
  } else if (userInfo.mobile) {
     this.setData({
       userInfo: userInfo
     }) 
    wx.hideLoading()
  } else {
    this.setData({
      regist_show: true
    })
    wx.hideLoading()
  }
},


  onShow: function () {
    this.HBConfig()
    this.getBannerList();
    this.HotProducts();
    var newDate = new Date();
    var year = (newDate.getFullYear())
    var  mont = (newDate.getMonth() + 1)
    var  date = (newDate.getDate())
    var  hour = (newDate.getHours())
    var  minu = (newDate.getMinutes())
    var  seco = (newDate.getSeconds())
    var Storage = wx.getStorageSync('leading_show_time');
    if(!Storage){
      wx.setStorageSync('leading_show_time', year+'/'+mont+'/'+date+' '+hour+':'+minu+':'+seco)
    }

    // if(app.globalData.leading_show_time == ''){
    //   app.globalData.leading_show_time = year+'/'+mont+'/'+date+' '+hour+':'+minu+':'+seco
    // }

    var old_date = new Date(Storage)
    console.log(old_date)

    var timeDifference = newDate.getTime() - old_date.getTime(); 
    //计算出小时数
    var leave1=timeDifference%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    var leave2=leave1%(3600*1000)  
    var minutes=Math.floor(leave2/(60*1000))
    console.log(hours)
    console.log(minutes)

    if(hours >= 2){
    app.service.remind(userInfo.openId)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          console.log(res.data)
          obj.setData({
            remind_count: res.data.count,
            tip:!this.data.tip,
          })
        } else {
          wx.showToast(res.errormsg);
        }
      })
      .catch(res => {
        wx.hideLoading()
        // wx.showToast('出错了！');
      })
      wx.setStorageSync('leading_show_time', year+'/'+mont+'/'+date+' '+hour+':'+minu+':'+seco)
    }

  },

  // 跳转其他小程序
  jumpTo:function(e){
    console.log(e);
    // return
    wx.navigateToMiniProgram({
      appId: e.target.dataset.appid,
      path: e.target.dataset.link,
      extraData: {
        foo: '来自纪念日'
      },
      envVersion: 'release',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },

  toLink:function(e){
    var link =  e.target.dataset.link;
    console.log(link)
    wx.navigateTo({
      url: link,
    })
  },

  //购买历史
  toHistoryPage: function (e) {
    var userInfo = app.globalData.userInfo
    //var next_page_url = '../purchase_success/purchase_success?id=108'
    //var next_page_url = "../accept_give/accept_give?mid=3&op=15&t="  
    var next_page_url = '../new_order/new_order'

    this.setData({
      next_page_url: next_page_url,
      click_history: 'history'
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

  //收到的祝福
  toReceiveGift: function (e) {
    var next_page_url = '../new_receive/new_receive'
    this.setData({
      next_page_url: next_page_url,
      click_history: 'gift'
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

  //获取商品banner
  getBannerList() {
    app.service.getBannerList()
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

  //注册回传
  onRegistResult: function (e) {
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
    if (e.detail.result == "fail") {
      wx.showToast({
        title: '获取手机号解释失败，请重新操作',
        icon: 'none'
      })
    }
  },
  //注册关闭
  onCloseRegist: function (e) {
    this.setData({
      regist_show: false
    })
  },

  //授权回传
  onAuthResult: function (e) {
    wx.hideLoading()
    if (e.detail.result == "ok") {
      this.setData({
        auth_show: false,
        click_history:'false'
      })
      if(this.data.current_page){
        this.onShow();
        return
      }
      if (this.data.click_history == 'history') {
        this.toHistoryPage()
      } else if(this.data.click_history == 'gift'){
        this.toReceiveGift()
      }
    }
  },
  //授权关闭
  onCloseAuth: function (e) {
    this.setData({
      auth_show: false
    })
  },

})