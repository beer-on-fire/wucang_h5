<template>
  <view class="cash">
    <view class="H10"></view>
    <view class='txz'>提现至微信零钱:</view>
    <view class="H10"></view>
    <view class='money'>
      <view class='ktx'>可提现金额：0.00元</view>
    </view>
    <view class='jine'>
      <view class="jine_01">¥</view>
      <view class="jine_02">
        <input type="number"
          class="uni-input"
          placeholder="请输入金额" />
      </view>
    </view>
    <!-- <view class='kg'>        
		<view class="kg_l">大额提现(单笔5万以上）</view>
		<switch checked style="transform:scale(0.7)" />            
      </view> -->
    <!-- <view class='khh'>银行名称 &emsp;<input type="text"
        v-model="form.bk_name" /></view>
    <view class='khh'>银行户名 &emsp;<input type="text"
        v-model="form.bk_uname" /></view>
    <view class='khh'>银行卡号 &emsp;<input type="number"
        v-model="form.card" /></view> -->
    <view class='txfy'>
      <view class='txfy_01'>
        <view class='txfy_01_l'>提现费用:</view>
        <view class='txfy_01_r'>0.00元</view>
      </view>
      <view class='txfy_02'>
        <view class='txfy_02_l'>预计到账时间</view>
        <view class='txfy_02_r'>当日到账</view>
      </view>
    </view>
    <view class='btn'
      @click="cash">提现</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      min_money: '',
      form: {
        bk_name: '',
        card: '',
        bk_uname: ''
      },
      money: '',
      checked: true
    }
  },
  computed: {

  },
  components: {},
  onLoad (option) {
    this.money = option.money
    this.prmSwitch()
  },
  methods: {
    async prmSwitch () {
      let obj = await this.promise_switch.then(res => (res))
      this.min_money = obj.min_money
    },
    async cash () // 提现接口，直接使用
    {
      if (this.money * 1 < this.min_money * 1) {
        uni.showToast({
          icon: "none",
          title: "提现金额小于" + this.min_money + "元",
          duration: 2000
        })
        return
      }

      const obj = await this.getData()
      if (!obj.data) {
        this.$api.msg(obj.msg)
        setTimeout(() => {
          uni.navigateBack({})
        }, 1000)
        return
      }
      await this.wxPay(obj.data)
    },
    async getData () {
      const params = {
        openid: localStorage.getItem('openId'),
        payNumber: Date.now().toString(),
      }
      const res = await this.$api.http.post('fx/user/apply_api', this.form)
      return res.data
    },
    //公众号支付
    wxPay (json) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener("WeixinJSBridgeReady", jsApiCall, false)
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", jsApiCall)
          document.attachEvent("onWeixinJSBridgeReady", jsApiCall)
        }
      } else {
        this.jsApiCall(json)
      }
    },
    jsApiCall (json) {
      const that = this
      console.log("提现开始")
      WeixinJSBridge.invoke("getBrandWCPayRequest", json, function (res) {
        WeixinJSBridge.log('a:', res.err_msg)
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          that.$api.msg("提现发起成功!")
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          that.$api.msg("提现取消")
        } else {
          that.$api.msg("提现失败，请重试")
        }
        if (this.is_kai == 1) {
          uni.navigateTo({
            url: '../invite/invite?id=' + that.pid
          })
          return
        }
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/order/order'
          })
        }, 1000)
      })
    }
  }
};
</script>

<style lang="less">
.cash {
  .uni-input {
    background-color: #ffffff;
    margin-top: 5px;
  }

  background-color: #f5f5f5;
  height: 100vh;
  font-size: 14px;

  .txz {
    padding: 15px 10px;
    background-color: #fff;
  }

  .money {
    background-color: #fff;
    padding: 10px;
  }

  .ktx {
    font-size: 12px;
    color: #949398;
  }

  .jine {
    display: flex;
    background-color: #fff;
    padding: 9px 10px;
    border-bottom: 1px solid #f8f8f8;
    border-top: 1px solid #f8f8f8;
  }

  .jine_01 {
    padding: 7px 10px 0 0;
  }

  .kg {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 9px 0px 7px 10px;
  }

  .kg_l {
    padding-top: 8px;
  }

  .khh {
    background-color: #fff;
    border-top: 1px solid #f8f8f8;
    padding: 17px 15px 12px;
  }

  .txfy {
    background-color: #fff;
    padding: 5px 10px;
    font-size: 12px;
  }

  .txfy_01 {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f8f8f8;
    padding: 10px 0 5px;
  }

  .txfy_02 {
    display: flex;
    justify-content: space-between;
    color: #b8b8bc;
    padding-bottom: 10px;
  }

  .btn {
    margin: 30px 10px 10px;
    background-color: #ff976a;
    height: 43px;
    line-height: 43px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
  }
}
</style>
