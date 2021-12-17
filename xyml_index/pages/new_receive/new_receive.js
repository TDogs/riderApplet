// pages/new_receive/new_receive.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['我已购买', '我收到的'],
    currentTab: 1,
    page: 1,
    list_arr: [],  //array 
    mid: '',
    no_data:true,
    hint:true,
    hidden_qrcode:true,
    ticket_info:[],//券资料
    ticket_pwd:'显示密码',
  },
  onShow: function () {  
    var ticket_info = {
      qrcode:'../images/QRC.jpg'
    }
    this.setData({
      currentTab: 1,
      page: 1,
      list_arr: [], 
      ticket_info:ticket_info,
      hidden_qrcode:true,
    }) 
    this.getOrderList()
  },
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    //this.getOrderList()
  },

  /**
     * 触底上拉加载
     */
  onReachBottom: function () {
    var page = this.data.page + 1; //获取当前页数并+1
     
    this.setData({
      page: page, //更新当前页数
    })
    this.getOrderList()
  },

  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    var nowTab = e.currentTarget.dataset.idx;
    this.setData({
      list_arr: [],
      currentTab: nowTab
    })
    if (nowTab == 1) {
      this.getOrderList()
    } else {
      wx.navigateTo({
        url: '../new_order/new_order',
      })
    }
  },

  //获取我收到的
  getOrderList: function() {
    wx.showLoading({
      title: "加载中…"
    })
    var userInfo = app.globalData.userInfo
    var obj=this
    app.service.myReceive(userInfo.openId, this.data.page)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) {
          var arr1 = obj.data.list_arr; //从data获取当前datalist数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          if (arr2) {
            arr1 = arr1.concat(arr2)
            for (var key in arr1) {  
              arr1[key].display =false; 
            }
            
            obj.setData({
              list_arr: arr1,
              mid: userInfo.mID,
              no_data:arr1.length>0
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

  showReturnTxt: function (e) {
    //console.log(e);
    var pid = e.currentTarget.id;
    var index = e.currentTarget.dataset.index; //index相当于创建了一个数组下标，在这里获取到他的index的值
    let list = this.data.list_arr //list就是他所有值都在这里面

    for (var key in list) {//for循环出来比对当前点击的这个块
      if (key == index) { //判断如果是当前点击的这个块的话可以进来
        list[key].display = list[key].display == true ? false : true;//给当前块的display一个相反的值
      }
    }

    this.setData({
      list_arr: list//赋值到上面的data里面供页面使用
    })
  },


  showHint:function(e){
    this.setData({
      hint:!this.data.hint,
    })
  },


  //电子券二维码
  showQRCode:function(e){ 
    console.log(e)
    var oid=e.currentTarget.dataset.oid
    var opid=e.currentTarget.dataset.opid
    wx.showLoading({
      title: "加载中…"
    })
    var userInfo = app.globalData.userInfo
    var obj=this
    app.service.getTicketQRcode(userInfo.openId, oid,opid)
      .then(res => {
        wx.hideLoading()
        if (res.errcode == 0) { 
            obj.setData({
              ticket_info: res.data, 
              hidden_qrcode:false,
              ticket_pwd:'显示密码',
            }) 
        }else {
          wx.showToast({
            title: res.errormsg,
            icon: 'none'
          })
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


  closeQRcodePopup:function(e){
    this.setData({
      hidden_qrcode:!this.data.hidden_qrcode,
    })
  },

  showPWD:function(e){
    var ticket_pwd=this.data.ticket_info.pwd
    this.setData({
      ticket_pwd:ticket_pwd
    })
  },


  
})