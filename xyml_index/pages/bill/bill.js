// pages/bill/bill.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: "",
    num: 1,
    product_detail: {}, //object
    needInvoice: false,
    isCompanyInvoice: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkIfRegist();
    this.setData({
      pid: options.pid,
      num: options.num,
    })
    this.getProduct(options.pid)
    var invoiceInfo = app.globalData.invoiceInfo
    if (invoiceInfo) {
      this.setData({
        needInvoice: invoiceInfo.needInvoice,
        isCompanyInvoice: invoiceInfo.isCompanyInvoice
      })
    }

  },
  //保存订单
  sendOrder: function() {

    var userInfo = app.globalData.userInfo
    var invoiceInfo = app.globalData.invoiceInfo
    app.service.saveOrder(userInfo.openId, this.data.pid, this.data.num, invoiceInfo.needInvoice, invoiceInfo.isCompanyInvoice, invoiceInfo.personEmail, invoiceInfo.companyTitle, invoiceInfo.companyTax, invoiceInfo.companyEmail)
      .then(res => {  
        if (res.error == 0) {
          var id = res.data.id;
          //呼叫微信支付 
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': function(res) {
              if (res.errMsg == 'requestPayment:ok') {
                //关闭当前页面,跳转到另外一个页面
                wx.redirectTo({
                  url: '../purchase_success/purchase_success?&id='+id,//把这里改成新页面的链接
                });
              }
            },
            'fail': function(res) {
              console.log('sendOrder fail')
              console.log(res);

            },
            'complete': function(res) {
              console.log('sendOrder complete')
              console.log(res);
            }
          })
        } else {
          wx.showToast({
            title: res.errormsg,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        console.log(res)
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })

  },

  //确认是否已注册
  checkIfRegist: function() {
    var userInfo = app.globalData.userInfo
    if (!userInfo.mobile) {
      wx.navigateTo({
        url: '../list/list',
      })
      return;
    }
  },


  //发票信息
  toInvoice: function(e) {
    var next_page_url = '../invoice/invoice'
    var pid = this.data.product_detail.id
    var num = this.data.num
    var userInfo = app.globalData.userInfo
    if (userInfo.mobile) {
      wx.navigateTo({
        url: next_page_url + "?pid=" + pid + "&num=" + num,
      })
    } else {
      this.setData({
        regsit_hidden: false
      })
    }
  },

  //获取商品详情
  getProduct(pid) {
    wx.showLoading({
      title: "加载中…"
    })
    app.service.getProductByID(pid)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          this.setData({
            product_detail: res.data
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
 


})