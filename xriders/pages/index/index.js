// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ljqd_com: true,
    yty_com: true,
    mandate: true,
    regist_show: false,
    auth_show: false,
    list_orders: [],
    page: 1,
    stop:false,
    check_rider:true,
    check_rider_msg:'',
    order_statue:true,
    eid:'',
    k:'',
    news_count:'',
  },


  ljqd_com_bnt: function (e) {
    this.setData({
      ljqd_com: !this.data.ljqd_com,
      eid: e.currentTarget.dataset.eid,
      k: e.currentTarget.dataset.k
    })
  },

  grab: function (e) {
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.grab(phone,this.data.eid)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            let list_orders_new = obj.data.list_orders;
            list_orders_new.splice(obj.data.k,1);
            if(obj.data.list_orders.length == 0){
              obj.setData({
                order_statue:false,
              })
            }
            obj.setData({
              ljqd_com: !obj.data.ljqd_com,
              list_orders: list_orders_new,
            });
            wx.showToast({
              title: res.errormsg,
              icon: 'success',
              duration: 2000,
            })

          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },


  yty_com_bnt: function (e) {
    this.setData({
      yty_com: !this.data.yty_com
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  new:function(){
    var that = this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.MessageConten(phone)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            that.setData({
              news_count: res.data.count,
            })
          }
        })
        .catch(res => {
          wx.hideLoading()
          that.tool.showToast('出错了！');
        })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = app.globalData.userInfo;
    var ogj = this;
    ogj.setData({
      list_orders: [],
    });
    if (userInfo == null) {
      app.login().then(function (res) {
        if(res.data.mobile == null){
          ogj.setData({
            regist_show: true
          })
        }
        if(res.errcode != 0){
          ogj.setData({
            mandate: false
          })
        }
        app.startInter()  //   启动定时器
        ogj.CheckRider();
      }, (error) => {
        ogj.setData({
          mandate: false
        })
      });
      wx.hideLoading()
    } else if (userInfo.mobile) {
      ogj.setData({
        userInfo: userInfo
      });
      ogj.CheckRider();
      wx.hideLoading()
    } else {
      ogj.setData({
        mandate: false
      })
      wx.hideLoading()
    }
  },


  /**
   * 骑手验证
   * @constructor
   */
  CheckRider:function(type){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    obj.new();
    app.service.CheckRider(phone)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            if (!app.tool.isEmpty(res.data)) {
              if(res.data.status == 10){
                wx.redirectTo({
                  url: '/pages/authentication/authentication',
                });
              }else if(res.data.status == 1){
                let u = 'null';
                if(type  == 1){
                  u = '/pages/index/index';
                }else if(type == 2){
                  u = '/pages/dqh/dqh';
                }else if(type == 3){
                  u = '/pages/psz/psz';
                }else{
                  u = 'list';
                }
                if(u == 'list'){
                  obj.GetOrders();
                }else{
                  wx.redirectTo({
                    url: u
                  });
                }

              }else if(res.data.status == 0){
                obj.setData({
                  check_rider_status:0,
                  check_rider:false,
                  check_rider_msg:"亲爱的元祖骑手，您资料已提交成功，管理员正在加速审核中，请耐心等待"
                });
                // 0 = 已经提交未审核
              }else if(res.data.status == 3){
                obj.setData({
                  check_rider_status:3,
                  check_rider:false,
                  check_rider_msg:"骑手认证资料审核未通过，请查看未通过理由后，可重新填写再次提交认证。未通过理由："+res.data.remark
                });
              }
            } else {
              obj.setData({
              })
            }
          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },


  /**
   * 骑手状态跳转页
   */
  clickMe:function(e){
    let s = e.currentTarget.dataset.status;
    let u = '';
    if(s == 0){
      u = '/pages/audit_in_progress/audit_in_progress';
    }else if(s == 3){
      u = '/pages/audit_failed/audit_failed';
    }
    wx.redirectTo({
      url: u,
    });
  },

  /**
   * 获取订单列表
   * @constructor
   */
  GetOrders:function(){
    app.tool.showLoading()
    var obj= this;
    var userInfo = app.globalData.userInfo
    var phone = '';
    if (userInfo && userInfo.mobile) {
      phone = userInfo.mobile
    }
    app.service.GetOrders(phone,obj.data.page,2)
        .then(res => {
          wx.hideLoading()
          if (res.errcode == 1) {
            if(res.data.length >0 ){
              if (!app.tool.isEmpty(res.data)) {
                var arr1 = this.data.list_orders; //从data获取当前datalist数组
                var arr2 = res.data; //从此次请求返回的数据中获取新数组
                if (arr2) {
                  arr1 = arr1.concat(arr2)
                  obj.setData({
                    list_orders: arr1,
                  })
                }
                if(obj.data.list_orders.length == 0){
                  console.log(123)
                  obj.setData({
                    order_statue:false,
                  })
                }
              } else {
                obj.setData({
                  stop: true
                })
              }
            }else {
              obj.setData({
                order_statue:false,
              })
            }
          }
        })
        .catch(res => {
          wx.hideLoading()
          app.tool.showToast('出错了！');
        })
  },




  JumpPage: function (e) {
    let obj = this;
    let type = e.currentTarget.dataset.type;
    var userInfo = app.globalData.userInfo;
    app.tool.showLoading();
    if (userInfo == null) {
      app.login().then(function (res) {
        console.log(112)
        console.log(res)

        obj.checkAuth(type)
      }, (error) => {
        obj.checkAuth(type)
      })
    }else {
      obj.checkAuth(type)
    }
  },

  /**
   * 确认会员是否授权＆是否注册
   */
  checkAuth: function (type) {
    var userInfo = app.globalData.userInfo
    if (userInfo == null) {
      this.setData({
        auth_show: true
      })
      wx.hideLoading()
    } else if (userInfo.mobile) {
      this.CheckRider(type)
      //console.log(userInfo)
      // this.setData({
      //   userInfo: userInfo
      // });
      // let u = '';
      // if(userInfo.check == 10){
      //   u = '/pages/authentication/authentication';
      // }
      // else{
      //   if(type  == 1){
      //     u = '/pages/index/index';
      //   }else if(type == 2){
      //     u = '/pages/dqh/dqh';
      //   }else{
      //     u = '/pages/psz/psz';
      //   }
      //
      // }
      // wx.redirectTo({
      //   url: u
      // });
      wx.hideLoading()
    } else {
      this.setData({
        regist_show: true
      })
      wx.hideLoading()
    }
  },



//注册回传
  onRegistResult: function (e) {
    wx.hideLoading()
    var userInfo = app.globalData.userInfo
    if (e.detail.result == "ok" && userInfo.mobile) {
      this.setData({
        regist_show: false
      })
      this.checkAuth(1)
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
      this.checkAuth(1)
    }
  },
//授权关闭
  onCloseAuth: function (e) {
    this.setData({
      auth_show: false
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!this.data.stop){
      var page = that.data.page + 1; //获取当前页数并+1
      that.setData({
        page: page, //更新当前页数
      })
      that.GetOrders();//重新调用请求获取下一页数据
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})