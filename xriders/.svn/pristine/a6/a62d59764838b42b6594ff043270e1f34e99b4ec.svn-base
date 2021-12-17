//app.js
import service from './utils/service.js'
import tool from './utils/tool.js'

App({
  service: new service(),
  tool: new tool(),
  globalData: {
    isdebug: true,
    userInfo: null,
  },
  getLocationTime: '',
  newss : [],
  newss_count : '',

  login: function () {
    wx.showLoading()
    var obj = this
    console.log("app login")
    return new Promise(function (resolve, reject) {
      // 登录
      wx.login({
        success: function (r) {
          var code = r.code; //登录凭证
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.解密用户信息 获取unionId
                obj.service.decodeUserInfo(res.encryptedData, res.iv, code)
                    .then(res => {
                      if (res.errcode == 0) {
                        obj.globalData.userInfo = res.data
                        resolve(res);
                      }
                    })
                    .catch(res => {
                      console.log(res)
                      obj.tool.showToast('出错了！');
                    })

              },
              fail: function (err) {
                console.log('获取用户信息失败...')
                reject(err)
              }
            })

          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function (err) {
          reject(err)
        }

      })
    })
  },


  /**
   * 定时器
   */
  startInter : function(){
    var that = this;
    that.getLocation();   // 启动定位
    that.getLocationTime = setInterval(
        function () {
          that.getLocation();   // 启动定位
        }, 300000);
  },

  /**
   * 获取骑手位置 默认强制定位一次
   */
  getLocation:function(){
    var obj= this;
    wx.getLocation({
      type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        console.log(19999)
        console.log('经纬度 '+ res.latitude)
        console.log('经纬度 '+ res.longitude)
        console.log('速度，单位 m/s '+ res.speed)
        console.log('位置的精确度 '+ res.accuracy)
        console.log('水平精度，单位 m '+ res.horizontalAccuracy)
        console.log('垂直精度，单位 m '+ res.verticalAccuracy)

        var phone = '';
        var userInfo = obj.globalData.userInfo
        if (userInfo && userInfo.mobile) {
          phone = userInfo.mobile
        }
        obj.service.getLocation(phone,res.longitude,res.latitude)
            .then(res => {
              wx.hideLoading()
              if (res.errcode == 0) {
                clearInterval(obj.getLocationTime);
                console.log('停止定位')
              }
            })
            .catch(res => {
              wx.hideLoading()
              obj.tool.showToast('出错了！');
            })


      },fail:function (f) {
        console.log(f)
      }
    })
  },

})