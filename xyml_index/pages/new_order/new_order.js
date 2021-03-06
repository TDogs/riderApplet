// pages/new_order/new_order.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  
  data: { 
    currentTab: 0,
    page: 1,
    list_arr: [],  //array  
    mid:'',
    navTab: ['我已购买', '我收到的'],
    no_data:true,
    display:'false',  
    pid:'',
    modal_hidden: false,
    nocancel: false,
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {

    //this.getOrderList()
  },

  onShow: function () {
    this.setData({
      currentTab: 0,
      page: 1,
      list_arr: []
    })
    this.getOrderList()
  },

  take_back: function (e) {
    this.setData({
      modal_hidden: true,
      pid:  e.target.dataset.pid,
    });
  }, 

  confirm: function (e) {
    this.setData({
      nocancel: !this.data.nocancel,
      modal_hidden: false
    });
    var id = e.target.dataset.id;
    var obj=this
    // app.service.cancelTrans(id)
    app.service.cancelTrans(this.data.pid)
      .then(res => { 
        if (res.errcode == 0) {
          obj.onShow()
        }else{
          wx.showToast({
            title: '操作失败',
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
  cancel: function () {
    this.setData({
      nocancel: !this.data.nocancel,
      modal_hidden: false
    });
  },
 
  showDetail: function (e) {
    console.log(e);
    console.log(e.currentTarget.dataset.pid);
    var pid = e.currentTarget.id;
    var index = e.currentTarget.dataset.index; //index相当于创建了一个数组下标，在这里获取到他的index的值
    let list = this.data.list_arr //list就是他所有值都在这里面
   
    for (var key in list) {//for循环出来比对当前点击的这个块
      if (key == index) { //判断如果是当前点击的这个块的话可以进来
        // list[key].display = list[key].display==true?false:true;//给当前块的display一个相反的值
        list[key].display = list[key].display==true?false:true;//给当前块的display一个相反的值
      }
    }
     
    this.setData({
      list_arr: list//赋值到上面的data里面供页面使用
    })
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
    if (nowTab==0){
      this.getOrderList()
    }else { 
      wx.navigateTo({ 
        url: '../new_receive/new_receive',
      })
    } 
  },

  //获取订单列表
  getOrderList() {
    wx.showLoading({
      title: "加载中…"
    })
    var userInfo = app.globalData.userInfo 
    var obj=this
    app.service.orderList(userInfo.openId, this.data.page, this.data.currentTab)
      .then(res => { 
        wx.hideLoading()
        if (res.errcode == 0) {
          var arr1 = obj.data.list_arr; //从data获取当前datalist数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          if (arr2) {
            arr1 = arr1.concat(arr2)
            console.log(arr1)
            obj.setData({
              list_arr: arr1,
              mid:userInfo.mID,
              no_data:arr1.length>0, // 是否有数据 
            })
          }
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

  //自用
  toSelf:function(e){ 
    wx.navigateTo({
        url: "../activation/activation?op=" + e.currentTarget.dataset.op + "&mid="+e.currentTarget.dataset.mid
      })
  },

  //赠送好友
  toView: function (e) {
    wx.navigateTo({
      url: "../give/give?op=" + e.currentTarget.dataset.op
    })
  },


})