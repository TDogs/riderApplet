import request from './request.js'
import md5 from './md5.js'
 
class service {
  constructor() { 
    this.isdebug = true
    // this.host_test ="http://zhaipei.shjieta.com.cn/"
    this.host_test ="https://miniprogram.shjieta.com.cn/zhaipei/"
    this.host = ""
    this._baseUrl =   '?md=riders&cl=service&at='
    this._defaultHeader = {
      'data-type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    var __check_code = md5.md5('shjieta');
    this.check_code = __check_code.toUpperCase().substring(0, 16);
    this.version = "10";
  }

  getdata() {
    if (this._baseUrl.indexOf("http")<0){
      this._baseUrl = (this.isdebug ? this.host_test : this.host) + this._baseUrl
      this._memberUrl = (this.isdebug ? this.host_test : this.host) + this._memberUrl
      this._payUrl = (this.isdebug ? this.host_test : this.host) + this._payUrl 
    }
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
   * 解密用户信息 获取unionId
   */
  decodeUserInfo(encryptedData, iv, code) {
    let data = this.getdata()
    data['code'] = code
    data['encryptedData'] = encryptedData
    data['iv'] = iv
    return this._request.postRequest(this._baseUrl + 'decodeUserInfo', data).then(res => res.data)
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
    return this._request.postRequest(this._baseUrl + 'decodeUserInfo', data).then(res => res.data)
  }


  /**
   * 获取订单信息
   */
  GetOrders(mobile, page,type) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['page'] = page
    data['type'] = type
    return this._request.postRequest(this._baseUrl + 'OrdersList', data).then(res => res.data)
  }

  /**
   * 抢单
   */
  grab(mobile, express_id) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['express_id'] = express_id
    return this._request.postRequest(this._baseUrl + 'grab', data).then(res => res.data)
  }

  /**
   * 取单
   */
  assPick(mobile, express_id) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['express_id'] = express_id
    return this._request.postRequest(this._baseUrl + 'assPick', data).then(res => res.data)
  }

  /**
   * 配送完成
   */
  finish(mobile, express_id,txt_info,radio_info) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['express_id'] = express_id
    data['txt_info'] = txt_info
    data['radio_info'] = radio_info
    return this._request.postRequest(this._baseUrl + 'finish', data).then(res => res.data)
  }

  /**
   * 订单详情
   */
  finishOrderDetails(mobile, express_id,type) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['express_id'] = express_id
    data['type'] = type
    return this._request.postRequest(this._baseUrl + 'finishOrderDetails', data).then(res => res.data)
  }
  /**
   * 个人信息
   */
  personageInfo(mobile, express_id,type) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['express_id'] = express_id
    data['type'] = type
    return this._request.postRequest(this._baseUrl + 'personageInfo', data).then(res => res.data)
  }

  /**
   * 定位
   */
  getLocation(mobile, lng,lat) {
    let data = this.getdata()
    data['mobile'] = mobile
    data['lng'] = lng
    data['lat'] = lat
    return this._request.postRequest(this._baseUrl + 'getLocation', data).then(res => res.data)
  }

  /**
   * 获取城市下门店列表
   */
  GetStore(area_code) {
    let data = this.getdata()
    data['area'] = area_code
    return this._request.postRequest(this._baseUrl + 'getAreaShop', data).then(res => res.data)
  }

  /**
   * 消息列表
   */
  MessageConten(mobile) {
    let data = this.getdata()
    data['mobile'] = mobile
    return this._request.postRequest(this._baseUrl + 'MessageConten', data).then(res => res.data)
  }

  /**
   * 消息详情
   */
  MessageDetails(nid) {
    let data = this.getdata()
    data['nid'] = nid
    return this._request.postRequest(this._baseUrl + 'MessageDetails', data).then(res => res.data)
  }

  /**
   * 问题
   */
  question() {
    let data = this.getdata()
    return this._request.postRequest(this._baseUrl + 'FQA', data).then(res => res.data)
  }


  /**
   * 问题详情
   */
  QuestionDetails(fid) {
    let data = this.getdata()
    data['fid'] = fid
    return this._request.postRequest(this._baseUrl + 'FQADetails', data).then(res => res.data)
  }

  /**
   * 问题详情
   */
  getMyWallet(startdt,enddt,mobile) {
    let data = this.getdata()
    data['startdt'] = startdt
    data['enddt'] = enddt
    data['mobile'] = mobile
    return this._request.postRequest(this._baseUrl + 'getMyWallet', data).then(res => res.data)
  }


  /**
   * 提交审核
   */
  riders_approve(name,sex, date, region2, detailed_address, region, store,
   id_card, FilePaths, recitePaths, health, resume, emergency_contact, emergency_contact_mobile, relation, mobile) {
    let data = this.getdata()
    data['name'] = name
    data['sex'] = sex
    data['date'] = date
    data['region2_0'] = region2[0]
    data['region2_1'] = region2[1]
    data['region2_2'] = region2[2]
    data['detailed_address'] = detailed_address
    data['region_0'] = region[0]
    data['region_1'] = region[1]
    data['region_2'] = region[2]
    data['store'] = store
    data['id_card'] = id_card
    // data['FilePaths'] = FilePaths
    // data['recitePaths'] = recitePaths
    // data['health'] = health
    data['resume'] = resume
    data['emergency_contact'] = emergency_contact
    data['emergency_contact_mobile'] = emergency_contact_mobile
    data['relation'] = relation
    data['mobile'] = mobile
    // return this._request.postRequest(this._baseUrl + 'riders_approve').then(res => res.data)
    return this._request.formSubmit(this._baseUrl + 'riders_approve', data,FilePaths,recitePaths,health).then(res => res.data)
  }

  /**
   * 骑手验证
   */
  CheckRider(mobile) {
    let data = this.getdata()
    data['mobile'] = mobile
    return this._request.postRequest(this._baseUrl + 'CheckRider', data).then(res => res.data)
  }

}
export default service