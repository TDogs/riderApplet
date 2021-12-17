// pages/invoice/invoice.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 'gr',
        value: '个人',
        checked: true
      },
      {
        name: 'gs',
        value: '公司',
        checked: false
      },
    ],
    pid: "",
    num: 1,
    needInvoice: false,
    isCompanyInvoice: false,
    personEmail: '',
    companyTitle: '',
    companyTax: '',
    companyEmail: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.pid,
      num: options.num,
    })

    var invoiceInfo = app.globalData.invoiceInfo
    if (invoiceInfo) { 
      this.setData({
        needInvoice: invoiceInfo.needInvoice,
        isCompanyInvoice: invoiceInfo.isCompanyInvoice,
        personEmail: invoiceInfo.personEmail,
        companyTitle: invoiceInfo.companyTitle,
        companyTax: invoiceInfo.companyTax,
        companyEmail: invoiceInfo.companyEmail,
      })
      console.log(this.data)
      if (this.data.isCompanyInvoice){
        var items = this.data.items;
         items[0]['checked']=false
         items[1]['checked'] = true
        this.setData({
          items: items
        })
      }
    }

  },

  saveInvoice: function(e) {
    var isValid = true;
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');

    if (this.data.needInvoice) {
      if (this.data.isCompanyInvoice) {
        //公司发票栏位验证
        if (this.data.companyTitle == '') {
          isValid = false;
          wx.showToast({
            title: '请填写发票抬头',
            icon: 'none',
            duration: 2000
          })
          return
        } else if (this.data.companyTax=='') {
          isValid = false;
          wx.showToast({
            title: '请填写纳税人识别号',
            icon: 'none',
            duration: 2000
          })
          return
        } else
        if (!reg.test(this.data.companyEmail)) {
          isValid = false;
          wx.showToast({
            title: '请输入正确的邮箱',
            icon: 'none',
            duration: 2000
          })
          return
        }

        if (isValid) {
          this.setData({
            personEmail: '',
          })
        }

      } else {
        //个人发票栏位验证
        if (!reg.test(this.data.personEmail)) {
          isValid = false;
          wx.showToast({
            title: '请输入正确的邮箱',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (isValid) {
          this.setData({
            companyTitle: '',
            companyTax: '',
            companyEmail: '',
          })
        }
      }

    } else {
      this.setData({
        isCompanyInvoice: false,
        personEmail: '',
        companyTitle: '',
        companyTax: '',
        companyEmail: '',
      })
    }

    if (isValid) {
      var info = {
        needInvoice: this.data.needInvoice,
        isCompanyInvoice: this.data.isCompanyInvoice,
        personEmail: this.data.personEmail,
        companyTitle: this.data.companyTitle,
        companyTax: this.data.companyTax,
        companyEmail: this.data.companyEmail,
      }
      app.globalData.invoiceInfo = info
      wx.navigateTo({
        url: "../bill/bill?pid=" + this.data.pid + "&num=" + this.data.num,
      })
    }else {
      wx.showToast({
        title: '请填写发票相关资料',
        icon: 'none',
        duration: 2000
      })
    }
  },


  //是否要发票
  needInvoiceChange: function(e) {
    this.setData({
      needInvoice: e.detail.value
    })
  },

  //选个人发票或是公司
  radioChange: function(e) {
    var data = e.detail.value;
    this.setData({
      isCompanyInvoice: (data == "gr") ? false : true,
    })
  },

  setPersonEmail: function(e) { 
    this.data.personEmail = e.detail.value
  },

  setCompanyTitle: function(e) {
    this.data.companyTitle = e.detail.value
  },

  setCompanyTax: function(e) {
    this.data.companyTax = e.detail.value
  },

  setCompanyEmail: function(e) {
    this.data.companyEmail = e.detail.value
  },
 
})