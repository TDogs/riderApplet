 
class request {
  constructor() {
    this._header = {}
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }


  /**
   * 档案上传
   */
  formSubmit(url, data, filePath,recitePaths,health) {
    console.log("url"+url)
    console.log(data)
    console.log("filePath" + filePath)
    data.t = 1;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: filePath,
        name: 'file',
        formData: data ,
        success: function (res) {
          console.log(8989)
          console.log(res)
          let r_obj = JSON.parse(res.data);
          console.log(r_obj)
          console.log(r_obj.errcode)

          if(r_obj.errcode == 1){
            wx.uploadFile({
              url: url,
              filePath: recitePaths,
              name: 'recitePaths',
              formData: {mobile:data.mobile,t:2,check_code:data.check_code,store:data.store} ,
              success: function (res) {
                let r_obj = JSON.parse(res.data);
                if(r_obj.errcode == 1){
                  wx.uploadFile({
                    url: url,
                    filePath: health,
                    name: 'health',
                    formData: {mobile:data.mobile,t:2,check_code:data.check_code,store:data.store} ,
                    success: function (res) {
                      resolve(res)
                    },
                    fail: function (error) {
                      console.log(error)
                      reject(error)
                    }
                  })
                }else{
                  resolve(res)
                }
              },
              fail: function (error) {
                console.log(error)
                reject(error)
              }
            })
          }else{
            console.log(77)
            console.log(res)

            resolve(res)
          }
        },
        fail: function (error) {
          console.log(error)
          reject(error)
        }
      })
    })
  }


}

export default request
