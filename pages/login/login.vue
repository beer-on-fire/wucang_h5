<template>
  <view class="login">
    <view class="head">
      <view class="head-img"><img src="@/imgs/8.jpg"></img></view>
    </view>
    <view class="head-name">吾仓集市</view>
    <view class="shen">
      申请获取以下权限
    </view>
    <view class="huo">·获得你的公开信息（昵称、头像等）</view>
    <view class="btn">
      <view class="btn-l"
        @click="back">暂不登录</view>
      <view class="btn-r"
        @click="login()">立即登录</view>
    </view>
    <!-- #ifdef APP-PLUS -->
    <AppAuth :auth="auth"
      @check_login="check_login"></AppAuth>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <XcxAuth :auth="auth"
      @userinfo="get_userinfo"></XcxAuth>
    <!-- #endif -->
  </view>

</template>

<script>
import XcxAuth from "@/components/wx_auth/xcx_auth.vue"
import AppAuth from "../../components/wx_auth/app_auth.vue"
export default {
  data () {
    return {
      userinfo: '',
      auth: {
        is_name: false,
        is_address: false,
        is_phone: false,
      },
    }
  },
  components: {
    XcxAuth,
    AppAuth
  },
  methods: {
    login () {
      this.auth.is_name = !this.auth.is_name
    },
    back () {
      console.log(1)
      uni.navigateBack({})
    },
    get_userinfo (e) {
      this.userinfo = e
      uni.navigateBack({})
    },
    //APP登录成功
    check_login (e) {
      if (e) {
        uni.hideLoading()
        uni.reLaunch({
          url: "/pages/index/index"
        })
      }
    },
  }
}
</script>

<style lang="scss">
.login {
  padding: 50px 30px;
  .head {
    display: flex;
    justify-content: center;
    .head-img {
      padding: 2px 0;
      box-shadow: 0px 0px 5px #e1e1e1;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1px solid #e2e2e2;
      box-sizing: border-box;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .head-name {
    text-align: center;
    border-bottom: 2px solid #efefef;
    padding: 15px 0 30px;
    font-size: 12px;
  }
  .shen {
    padding: 25px 0 20px;
    font-size: 14px;
  }
  .huo {
    font-size: 12px;
    color: #999999;
    padding-bottom: 30px;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .btn-l {
      background-color: #efefef;
      border-radius: 3px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #9e9e9e;
      width: 45%;
    }
    .btn-r {
      background-color: #ed3f14;
      border-radius: 3px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 45%;
      color: #fff;
    }
  }
}
</style>
