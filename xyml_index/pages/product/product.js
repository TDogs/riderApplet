// pages/product/product.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    regist_show: false,
    auth_show: false,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 2000,
    num: 1, 
    minusStatus: 'disabled',
    product_detail:{},
    use_condition:'',
    items: [
      {
        id: 1,
        isSelect: false,
        count: 1
      },
  
    ]
  },


  /* 加数 */
  addCount: function (e) {
    var index = e.target.dataset.index;
    console.log(e);
    // console.log("刚刚您点击了加+");

    var count = this.data.items[index].count;
    // 商品总数量+1  
    if (count < 10) {
      this.data.items[index].count++;
    }
    // 将数值与状态写回  
    this.setData({
      items: this.data.items
    });
    // console.log("items:" + this.data.items);
  },


   /* 减数 */
   delCount: function (e) {
    var index = e.target.dataset.index;
    // console.log("刚刚您点击了加一");
    var count = this.data.items[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.items[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      items: this.data.items
    });
    // console.log("items:" + this.data.items);
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) { 
    this.getProduct(options.pid)
  },


  //注册回传
  onRegistResult: function (e) {
    wx.hideLoading()
    var userInfo = app.globalData.userInfo
    if (e.detail.result == "ok" && userInfo.mobile) {
      this.setData({
        regist_show: false
      })
      if (this.data.next_page_url) {
        wx.navigateTo({
          url: this.data.next_page_url,
        })
      }
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
        auth_show: false
      })
      this.toBill()
    }
  },
  //授权关闭
  onCloseAuth: function (e) {
    this.setData({
      auth_show: false
    })
  },
  
  //购买赠送朋友
  toBill: function (e) {
    var next_page_url = '../bill/bill'
    var pid = this.data.product_detail.id 
    var num = this.data.items[0].count

    if (num>this.data.product_detail.stock){
      wx.showToast({
        title: '库存数量仅剩'+this.data.product_detail.stock+"个",
        icon: 'none'
      })
      return;
    }

    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
    }else if (userInfo.mobile) { 
      wx.navigateTo({
        url: next_page_url + "?pid="+pid+"&num="+num,
      })
    } else {
      this.setData({
        regist_show: true
      })
    }
  },
 

  //获取商品详情
  getProduct(pid) {
    var obj=this
    wx.showLoading({
      title: "加载中…"
    })
    app.service.getProductByID(pid)
      .then(res => { 
        if (res.errcode == 0) {
          wx.hideLoading()
          var use_notice=res.data.use_notice
          use_notice = use_notice.replace('image', 'img');
          WxParse.wxParse('use_notice', 'html', use_notice, obj, 5);
          this.setData({
            product_detail: res.data,
            use_condition: use_notice
          })
          wx.setNavigationBarTitle({
            title: res.data.goods_name
          })

        }
      })
      .catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num; 
    if (num > 1) {
      num--;
    } 
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    this.setData({
      num: num
    });
  },

   
 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})