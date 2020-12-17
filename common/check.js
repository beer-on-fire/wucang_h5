import { Api_url } from '@/common/config.js'
import Vue from 'vue'
var x = 0
export default {
  GetUrlParame(parameName) {
    /// 获取地址栏指定参数的值
    /// <param name="parameName">参数名</param>
    // 获取url中跟在问号后面的部分
    var parames = window.location.search
    // 检测参数是否存在
    if (parames.indexOf(parameName) > -1) {
      var parameValue = ''
      parameValue = parames.substring(
        parames.indexOf(parameName),
        parames.length
      )
      // 检测后面是否还有参数
      if (parameValue.indexOf('&') > -1) {
        // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
        parameValue = parameValue.substring(0, parameValue.indexOf('&'))
        // 去掉参数名, 得到最终纯值字符串
        parameValue = parameValue.replace(parameName + '=', '')
        return parameValue
      }
      return ''
    }
  },
  check_login_xcx() {
    let token = uni.getStorageSync('token')
    var that = this
    return uni.request({
      url: Api_url + 'auth/token_verify',
      method: 'POST',
      data: {
        token: token
      },
      success: function(res) {
        var valid = res.data.isValid
        if (!valid || res.data.statusCode == 401) {
          console.log('token不存在')
          x = 0
        } else {
          x = 1
        }
        return x
      }
    })
  },

  check_login_h5(e = '') {
    let type = ''
    if (e == 'userinfo') {
      type = 'userinfo'
    }
    const code = this.GetUrlParame('code') // 截取code
    var domine = window.location.href.split('#')[0] // 微信会自动识别#    并且清除#后面的内容
    var domine = domine.split('?code')[0]
    if (!code) {
      var token = uni.getStorageSync('token') //获取缓存
      console.log('获取code', token)
      if (!token) {
        console.log('token不存在')
        return (x = 0)
      } else {
        return (x = 1)
      }
    }
  },

  check_login_APP() {
    var token = uni.getStorageSync('token')
    if (!token) {
      console.log('token不存在')
      return 0
    } else {
      return 1
    }
  },

  async judge_gl() {
    //1 微信    2 微信+手机    3 手机
    const swtich = await Vue.prototype.promise_switch.then(res => {
      return res
    })
    console.log('xxa:', swtich)
    let gl = swtich.merge_mode
    // if (gl == 1) {
    // 	uni.redirectTo({
    // 		url: '/pages/login/login'
    // 	})
    // } else if (gl == 2) {
    // 	console.log('开始跳转')
    // 	uni.redirectTo({
    // 		url: '/pages/login/loginA/loginA'
    // 	})
    // } else if (gl == 3) {
    // 	uni.redirectTo({
    // 		url: '/pages/login/loginB/loginB'
    // 	})
    // }

    // #ifdef H5
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      uni.redirectTo({
        url: '/pages/login/login'
      })
    } else {
      uni.redirectTo({
        url: '/pages/login/loginB/loginB'
      })
    }
    // #endif
    // #ifdef MP-WEIXIN
    uni.redirectTo({
      url: '/pages/login/login'
    })
    // #endif
  },

  async a() {
    const that = this
    let is_login = ''
    // #ifdef MP-WEIXIN
    is_login = await that.check_login_xcx()
    // #endif

    // #ifdef H5
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //是否微信浏览器登录
      is_login = await that.check_login_xcx()
    } else {
      is_login = await that.check_login_h5()
    }

    // console.log('h5', is_login)
    // #endif

    // #ifdef APP-PLUS
    is_login = await that.check_login_APP()
    // #endif

    console.log('是否已经登录', is_login)

    if (is_login == 0) {
      that.judge_gl()
      return false
    }
    if (is_login == 1) {
      return true
    }
  }
}
