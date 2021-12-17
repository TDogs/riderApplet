// pages/authentication/authentication.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    //性别
    sex_select: ['请选择', '男', '女'],
    sex_index:1,

    //服务门店
    store_select: [],
    store_index:0,
    store_null:'',

    date: '请选择出生日期',//出生日期

    //服务城市
    region: ['请选择'],
    region_code:[],

    //常驻地址
    region2: ['请选择'],
    region2_code: [],
    detailed_address: '',

    //上传身份证
    tempFilePaths: '',
    hidden: true, //true
    buthidden: false, //false
    sourceType: ['album', 'camera'],
    mobile:'',

  },

  /**
   * 姓名
   */
  setName:function(e){
    this.setData({
      name: e.detail.value
    })
  },


  /**
   * 简历
   */
  setResume:function(e){
    this.setData({
      resume: e.detail.value
    })
  },

  /**
   * 身份证号码
   */
  set_id_card:function(e){
    this.setData({
      id_card: e.detail.value
    })
  },

 /**
   * 联系人
   */
 setEmergencyContact:function(e){
    this.setData({
      emergency_contact: e.detail.value
    })
  },

 /**
   * 联系人号码
   */
 setEmergencyContactMobile:function(e){
    this.setData({
      emergency_contact_mobile: e.detail.value
    })
  },

 /**
   * 本人关系
   */
 setRelation:function(e){
    this.setData({
      relation: e.detail.value
    })
  },

  //性别选择
  SexPickerChange: function (e) {
    this.setData({
      sex_index: e.detail.value,
    })
  },
  //出生日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      birthday: e.detail.value
    })
  },
  //服务门店
  bindPickerChange2: function (e) {
     console.log(e)
    this.setData({
      store_index: e.detail.value,
    })
  },
  //服务城市
  bindRegionChange: function (e) {
   var obj = this;
    this.setData({
      region: e.detail.value,
        region_code: e.detail.code,
    });
    if(e.detail.code[2]) {
      app.service.GetStore(e.detail.code[2])
          .then(res => {
            wx.hideLoading()
            if (res.errcode == 1) {
              if (res.data.length > 0) {
                if (!app.tool.isEmpty(res.data)) {
                    obj.setData({
                      store_select: res.data,
                      store_index: 0,
                      store_null: ''
                    });
                  console.log(obj.data.store_null)
                } else {
                  obj.setData({
                    store_null: '该地区尚无可服务店铺'
                  })
                }
              }else{
                obj.setData({
                  store_select: [],
                  store_null: '该地区尚无可服务店铺'
                })
              }
            }else{
              obj.setData({
                store_select: [],
                store_null: '该地区尚无可服务店铺'

              })
            }
          })
          .catch(res => {
            wx.hideLoading()
            app.tool.showToast('出错了！');
          })
    }
  },
  //常住地址
  bindRegionChange2: function (e) {
    this.setData({
      region2: e.detail.value,
        region2_code: e.detail.code,
    })
  },

  //详细地址
    detailed_address: function (e) {
    this.setData({
        detailed_address: e.detail.value,
    })
  },

  //身份证正面
  frontimage: function () {
    var _this = this;
    var Type = _this.data.sourceType
    wx.chooseImage({
      count: 1, // 默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          FilePaths: res.tempFilePaths,
        })
      }
    })
  },
  //身份证背面
  reciteimage: function () {
    var _this = this;
    var Type = _this.data.sourceType
    wx.chooseImage({
      count: 1, // 默认1 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          recitePaths: res.tempFilePaths,
        })
      }
    })
  },
  //健康证
  healthimage: function () {
    var _this = this;
    var Type = _this.data.sourceType
    wx.chooseImage({
      count: 1, // 默认1 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          health: res.tempFilePaths,
        })
      }
    })
  },

  /**
   * 提交审核
   * url="../audit_in_progress/audit_in_progress"
   */
  progress:function(){
      wx.showLoading()
      if(this.data.store_null == '该地区尚无可服务店铺'){
          wx.hideLoading();
          console.log('当前选中服务城市尚未开通，请重新选择您的服务城市');
          wx.showToast({
              title: '城市尚未开通',
              icon: 'error',
              duration: 2000,
          });
          return
      }
      if(this.data.name == ''){
          wx.showToast({
              title: '姓名不可空',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(this.data.sex_select[this.data.sex_index] == '请选择'){
          wx.showToast({
              title: '请选择您的性别',
              icon: 'error',
              duration: 2000,
          });

          return
      }


      if(this.data. date == '请选择出生日期'){
          wx.showToast({
              title: '请选择出生日期',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(this.data. region2 == '请选择'){
          wx.showToast({
              title: '请选择常住地址',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(this.data. detailed_address == ''){
          wx.showToast({
              title: '请输入详细地址',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(this.data. region == '请选择'){
          wx.showToast({
              title: '选择所服务城市',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. store_select[this.data.store_index] == 'undefined'){
          wx.showToast({
              title: '请选择服务门店',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. id_card == 'undefined'){
          wx.showToast({
              title: '请输入身份证号',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. FilePaths == 'undefined'){
          wx.showToast({
              title: '请上传身份证',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. recitePaths == 'undefined'){
          wx.showToast({
              title: '请上传身份证',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. health == 'undefined'){
          wx.showToast({
              title: '请上传健康证',
              icon: 'error',
              duration: 2000,
          });
          return
      }


      if(typeof this.data. resume == 'undefined'){
          wx.showToast({
              title: '请输入您的简历',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. emergency_contact == 'undefined'){
          wx.showToast({
              title: '输入联系人姓名',
              icon: 'error',
              duration: 2000,
          });
          return
      }


      if(typeof this.data. emergency_contact_mobile == 'undefined'){
          wx.showToast({
              title: '输入联系人电话',
              icon: 'error',
              duration: 2000,
          });
          return
      }

      if(typeof this.data. relation == 'undefined'){
          wx.showToast({
              title: '输入联系人关系',
              icon: 'error',
              duration: 2000,
          });
          return
      }
      // console.log(this.data.sex_select[this.data.sex_index])
      // return
      app.service.riders_approve(this.data.name,this.data.sex_select[this.data.sex_index],this.data. date,this.data. region2_code,this.data. detailed_address,this.data. region_code,this.data. store_select[this.data.store_index].id,
          this.data. id_card,this.data. FilePaths[0],this.data. recitePaths[0],this.data. health[0],this.data. resume,this.data. emergency_contact,this.data. emergency_contact_mobile,this.data. relation,this.data. mobile)
          .then(res => {
              wx.hideLoading();
              let r_obj = JSON.parse(res);
              if (r_obj.errcode == 1) {
                  wx.redirectTo({
                      url: '/pages/audit_in_progress/audit_in_progress',
                  });
              }else{
                  wx.showToast({
                      title: r_obj.errormsg,
                      icon: 'error',
                      duration: 2000,
                  });
              }

          })
          .catch(res => {
              wx.hideLoading()
              app.tool.showToast('出错了！');
          })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mobile : app.globalData.userInfo.mobile,
    })
    try {
      var res = wx.getSystemInfoSync()
      var platform = res.platform
      if (platform == 'ios') {
        util.msg("警告", "IOS系统暂不支持拍照，请从相册选择照片")
        this.setData({
          sourceType: ['album']
        })
      }
      console.log(platform)
    } catch (e) { }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})