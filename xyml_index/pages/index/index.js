// pages/index/index.js
import request from '../../utils/request.js'
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: '',
    auth_hidden: true, 
    op:'',
    mid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     var obj=this 
      this.setData({
        op: options.op != undefined ? options.op:'',
        mid: options.mid != undefined ? options.mid : ''
      }) 
    app.login().then(function (res) {   
      if(res){ 
        var next_page_url = '../list/list'
        if (obj.data.op != '' && obj.data.mid!=''){
          next_page_url = "../accept_give/accept_give?mid=" + obj.data.mid + "&op=" + obj.data.op
        }
        wx.redirectTo({ 
          url: next_page_url,
        })
      } 
    }, (error) => { 
      this.getHomeBanner(); 
      this.setData({
        auth_hidden: false
      }) 
    })
  },
 
  login: function() {
    var obj=this
    console.log("login...")
    console.log(obj.data)
    // 登录
    wx.login({
      success: function(r) {
        var code = r.code; //登录凭证 
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) { 
              //3.解密用户信息 获取unionId
              app.service.decodeUserInfo(res.encryptedData, res.iv, code)
                .then(res => {
                  var next_page_url="../list/list"
                  if (obj.data.op != '' && obj.data.mid != '') {
                    next_page_url = "../accept_give/accept_give?mid=" + obj.data.mid + "&op=" + obj.data.op
                  }
                  if (res.errcode == 0) {
                    app.globalData.userInfo=res.data
                    wx.redirectTo({
                      url: next_page_url,
                    })
                  }
                })
                .catch(res => { 
                  console.log('login decodeUserInfo catch error')
                  console.log(res) 
                })
            },
            fail: function() { 
              console.log('获取用户信息失败')
              obj.setData({
                auth_hidden: false
              })
            }
          })

        } else {
          wx.hideLoading()
          console.log('获取用户登录态失败！' + r.errMsg)
          auth_hidden: false
        }
      },
      fail: function() {
        callback(false)
        wx.hideLoading()
        auth_hidden: false
      }

    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮 
      this.login();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  //获取首页banner
  getHomeBanner() {
    app.service.getHomeBanner()
      .then(res => {
        if (res.errcode == 0) {
          if (res.data.length > 0) {
            var img = res.data[0]['img'];
            this.setData({
              banner: img
            })
          }
        }
      })
      .catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { 
  },

 
})