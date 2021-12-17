import request from './request.js'
import md5 from './md5.js'

class service {
  constructor() {
    var host = "https://shop.ganso.com.cn/giftcard/"
    var host = "https://miniprogram.shjieta.com.cn/giftcard/"
    this._baseUrl = host + '?md=service&cl=service&at='
    this._memberUrl = host + '?md=service&cl=member&at='
    this._orderUrl = host + '?md=service&cl=pay&at='
    this._defaultHeader = {
      'data-tupe': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    var __check_code = md5.md5('shjieta');
    this.check_code = __check_code.toUpperCase().substring(0, 16);
    this.version = "10";
  }

  getdata() {
    return {
      check_code: this.check_code,
      version: this.version
    }
  }
  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
     * 撤回转赠
     */
  cancelTrans(cancelTrans) {
    let data = this.getdata() 
    data['id'] = cancelTrans
    console.log(data);
    return this._request.postRequest(this._memberUrl + 'cancelTrans', data).then(res =>res.data)
  }
/**
     * 抓取最新订单
     */
  grab_order(grab_order) {
    let data = this.getdata()
    data['openid'] = grab_order
    console.log(data);
    return this._request.postRequest(this._memberUrl + 'grab_order', data).then(res => res.data)
  }

  /**
   * 保存订单
   */
  saveOrder(openid, pid, qty, needInvoice, isCompanyInvoice, personEmail, companyTitle, companyTax, companyEmail) {
    let data = this.getdata()
    data['openid'] = openid
    data['pid'] = pid
    data['qty'] = qty
    data['needInvoice'] = needInvoice
    data['isCompanyInvoice'] = isCompanyInvoice
    data['personEmail'] = personEmail
    data['companyTitle'] = companyTitle
    data['companyTax'] = companyTax
    data['companyEmail'] = companyEmail

    return this._request.postRequest(this._orderUrl + 'saveOrder', data).then(res => res.data)
  }


  /**
   * 订单列表
   */
  orderList(openid, page, status) {
    var data = this.getdata()
    data['page'] = page
    data['openid'] = openid
    data['status'] = status
    return this._request.postRequest(this._memberUrl + 'getOrderList', data).then(res => res.data)
  }

  /**
   * 订单详情
   */
  orderDetail(oid, openid) {
    var data = this.getdata()
    data['oid'] = oid
    data['openid'] = openid
    return this._request.postRequest(this._memberUrl + 'getOrderDetail', data).then(res => res.data)
  }

  

  /**
   * 我收到的祝福
   */
  myReceive(openid, page) {
    var data = this.getdata()
    data['page'] = page
    data['openid'] = openid 
    return this._request.postRequest(this._memberUrl + 'myReceive', data).then(res => res.data)
  }

  /**
   * 会员电子券
   */
  memberCoupon(status, openid) {
    var data = this.getdata()
    data['status'] = status
    data['openid'] = openid
    return this._request.postRequest(this._memberUrl + 'getMyCoupon', data).then(res => res.data)
  }

  /**
   * 抓订单商品资料
   */
  getGoodsDetail(op, openid, mid) {
    var data = this.getdata()
    data['op'] = op
    data['openid'] = openid
    data['mid'] = mid
    return this._request.postRequest(this._memberUrl + 'getGoodsDetailByOPID', data).then(res => res.data)
  }

  /**
   * 随机一则祝福语
   */
  giftTextByRand(type) {
    var data = this.getdata()
    data['type'] = type
    return this._request.postRequest(this._memberUrl + 'giftTextByRand', data).then(res => res.data)
    
  }


  /**
   * 转赠朋友
   */
  shareCouponToFriend(mid, op, time, gift_txt, wx_nickname) {
    var data = this.getdata()
    data['mid'] = mid
    data['op'] = op
    data['time'] = time
    data['gift_txt'] = gift_txt
    data['wx_nickname'] = wx_nickname
    return this._request.postRequest(this._memberUrl + 'shareCouponToFriend', data).then(res => res.data)
  }

  /**
   * 回赠朋友
   */
  saveReturnPartner(openid,op, gift_txt, wx_nickname) {
    var data = this.getdata()
    data['openid'] = openid
    data['op'] = op
    data['gift_txt'] = gift_txt
    data['wx_nickname'] = wx_nickname
    return this._request.postRequest(this._memberUrl + 'return_partner', data).then(res => res.data)
  }

  /**
   * 领取激活
   */
  shareGetCoupon(mid, op, openid, mobile) {
    var data = this.getdata()
    data['mid'] = mid
    data['op'] = op
    data['openid'] = openid
    data['mobile'] = mobile
    return this._request.postRequest(this._memberUrl + 'shareGetCoupon', data).then(res => res.data)
  }

  /**
   * 确认回赠并激领取
   */
  returnPartnerGetCoupon(mid, op,  mobile,gift_txt) {
    var data = this.getdata()
      data['mid'] = mid
      data['op'] = op 
      data['mobile'] = mobile
      data['gift_txt'] = gift_txt
    return this._request.postRequest(this._memberUrl + 'returnPartnerGetCoupon', data).then(res => res.data)
  }


  /**
   * 发送手机验证码
   */
  getSMSCode(mobile) {
    var data = this.getdata()
    data['mobile'] = mobile
    return this._request.postRequest(this._memberUrl + 'getSMSCode', data).then(res => res.data)
  }

  /**
   * 确认手机验证码
   */
  checkSMSCode(mobile, code) {
    var data = this.getdata()
    data['mobile'] = mobile
    data['code'] = code
    return this._request.postRequest(this._memberUrl + 'checkSMSCode', data).then(res => res.data)
  }

  /**
   * 取消转赠
   */
  cancelCoupon(transid, openid) {
    var data = this.getdata()
    data['transid'] = transid
    data['openid'] = openid
    return this._request.postRequest(this._memberUrl + 'cancelCoupon', data).then(res => res.data)
  }

  



  /**
   * 解密用户信息 获取unionId
   */
  decodeUserInfo(encryptedData, iv, code) {
    let data = this.getdata()
    data['code'] = code
    data['encryptedData'] = encryptedData
    data['iv'] = iv
    return this._request.postRequest(this._memberUrl + 'decodeUserInfo', data).then(res => res.data)
  }

  /**
   * 注册用户信息 获取unionId
   */
  regist(encryptedData, iv, code, phone) {
    let data = this.getdata()
    data['code'] = code
    data['encryptedData'] = encryptedData
    data['iv'] = iv
    data['phone'] = phone
    return this._request.postRequest(this._memberUrl + 'decodeUserInfo', data).then(res => res.data)
  }

  /**
   * 获取首页banner
   */
  getHomeBanner() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'HBanner', data).then(res => res.data)
  }

  /**
   * 获取商品列表banner
   */
  getProductBanner() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'HBanner', data).then(res => res.data)
  }
  /**
   * 获取商品列表banner
   */
  getBannerList() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'BannerList', data).then(res => res.data)
  }

  /**
   * 获取商品列表
   */
  getProducts() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'GoodsList', data).then(res => res.data)
  }



  
  /**
   * 获取未使用订单
   */
  remind(openid) {
    let data = this.getdata()
    data['openid'] = openid
    return this._request.postRequest(this._baseUrl + 'remind', data).then(res => res.data)
  }


  

  /**
   * 获取商品详情
   */
  getProductByID(pid) {
    let data = this.getdata()
    data['pid'] = pid
    return this._request.postRequest(this._baseUrl + 'GoodsByID', data).then(res => res.data)
  }

  /**
   * 获取商品分類
   */
  getProductCate() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'GoodsCate', data).then(res => res.data)
  }


  /**
   * 获取祝福短句
   */
  getCourseList(page = 1, size = 10, key = null) {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'BlessingCont_O', data).then(res => res.data)
  }


  /**
   * 获取回赠祝福短句
   */
  getBlessing() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'BlessingCont_P', data).then(res => res.data)
  }


  /**
   * 电子券二维码
   */
  getTicketQRcode(openid,oid, opid) {
    let data = this.getdata()
    data['openid'] = openid
    data['oid'] = oid
    data['opid'] = opid
    return this._request.postRequest(this._memberUrl + 'getTicketQRcode', data).then(res => res.data)
  }

 
      /**
       * 首页广告
       */
      HBConfig() {
        let data = this.getdata()
        return this._request.postRequest(this._baseUrl + 'HBConfig', data).then(res => res.data)
      }
      
 
      /**
       * 热门
       */
      HotProducts() {
        let data = this.getdata()
        return this._request.postRequest(this._baseUrl + 'HotProducts', data).then(res => res.data)
      }
}
export default service