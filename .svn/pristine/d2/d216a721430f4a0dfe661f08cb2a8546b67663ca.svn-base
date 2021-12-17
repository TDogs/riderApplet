class tool {

  constructor() {

  }

  /*获取元素自定义属性-当前事件元素 */
  getElementData(el, name) {
    if (name) {
      if (el.currentTarget.dataset) {
        return el.currentTarget.dataset[name];
      }
      return ''
    } else {
      return el.currentTarget.dataset;
    }
  }
  /*获取元素自定义属性-当前事件元素 */
  getFormElementData(el, name) {
    if (name) {
      if (el.detail.target.dataset) {
        return el.detail.target.dataset[name];
      }
      return ''
    } else {
      return el.detail.target.dataset;
    }
  }
  /*获取元素大小及位置 */
  getElementRect(select, callBack) {
    wx.createSelectorQuery().select(select).boundingClientRect(function (rect) {
      callBack && callBack(rect);
    }).exec();
  }
  /*信息提示 */
  showToast(title = "未知错误，请重试！", icon = "none", duration = 2000) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
      mask: true
    });

  }

  /*加载提示 */
  showLoading(title = "正在加载") {
    wx.showLoading({
      title: title,
      mask: true
    });

  }

  /**
   * 用于判断空，Undefined String Array Object
   */
  isEmpty(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
      return true
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
      Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组 
      return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false
    } else {
      return true
    }
  }

  subscription(mytmplIds) {
    if (wx.requestSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: mytmplIds, 
        success(res) {
          //此处处理多个订阅消息逻辑
          if (res[templateId] == 'accept') {
            //用户同意了订阅
            return true
          } else {
            //用户拒绝了订阅或当前游戏被禁用订阅消息
            return false
          }
        },
        fail(res) {
          console.log(res)
          return false
        },
        complete(res) {
          return true
          console.log(res) 
        }
      })
    } else {
      return false
      // 兼容处理
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }

}
export default tool