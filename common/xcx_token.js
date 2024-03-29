import { Api_url } from './config'
import Vue from 'vue'

class XcxToken {
  constructor() {
    this.tokenUrl = Api_url + 'auth/get_xcx_token'
    this.verifyUrl = Api_url + 'auth/token_verify'
    this.getInfo = Api_url + 'user/info'
  }

  //初始化登陆
  async verify() {
    var that = this
    var token = uni.getStorageSync('token') //获取缓存
    if (!token) {
      //向微信api拿code，再向tp的api拿token
      this.getTokenFromServer()
    } else {
      this._veirfyFromServer(token) //验证token是否过期，过期调用.getTokenFromServer函数获取
    }
  }
  //验证token
  _veirfyFromServer(token) {
    var that = this
    uni.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function(res) {
        var valid = res.data.isValid
        if (!valid) {
          that.getTokenFromServer()
        }
      }
    })
  }
  //获取Token
  getTokenFromServer() {
    var that = this
    uni.login({
      provider: 'weixin',
      success: function(res) {
        console.log('login:', res)
        uni.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function(res) {
            console.log('小程序', res)
            uni.setStorageSync('token', res.data.token)
          }
        })
      }
    })
  }
}
export { XcxToken }
