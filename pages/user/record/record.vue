<template>
  <view class="record">
    <view class="head">
      <view class="head_l">
        <view class="head_l_1">余额（元）</view>
        <view class="head_l_2">{{total}}</view>
      </view>
      <view class="head_r"
        @click="jump_cash">提现</view>
    </view>
    <block v-for="(item,index) of list"
      :key="index">
      <view class="list">
        <view class="list_01">
          <view class="list_01_l">提现</view>
          <view class="list_01_r">-{{item.money}}</view>
        </view>
        <view class="list_02"
          v-if="item.card!=null">
          <view class="list_01_l">卡号</view>
          <view class="list_01_l">{{item.card}}</view>

        </view>
        <view class="list_02">
          <view class="list_01_l">{{item.update_time}}</view>
          <view class="list_01_r"
            v-if="item.status==0">申请中</view>
          <view class=""
            v-if="item.status==1">已提现</view>
          <view class=""
            v-if="item.status==2">已驳回</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      list2: [{ type: "提现", money: "3000.00", time: "2019.06.29 14:00", state: 1 },
      { type: "提现", money: "3000.00", time: "2019.06.29 14:00", state: 0 },
      { type: "提现", money: "3000.00", time: "2019.06.29 14:00", state: 1 }],
      total: 0,
    }
  },
  onLoad () {
    this.get_record()
  },
  methods: {
    jump_cash () {
      const isWX = /MicroMessenger/i.test(navigator.userAgent)
      if (!isWX) {
        uni.showToast({
          icon: "none",
          title: "请在微信内打开",
          duration: 2000
        })
        return
      }
      uni.navigateTo({
        url: '/pages/user/cash/cash',
      })
    },
    get_record () {
      this.$api.http.get('fx/user/get_fx_record').then(res => {
        console.log("提现记录：", res.data)
        this.list = res.data
      })

      this.$api.http.get('fx/user/get_fx_money').then(res => {
        this.total = res.data.money
      })
    }
  }
}
</script>

<style lang="scss">
.record {
  font-size: 14px;
  .head {
    background-color: #ff4d4d;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    .head_l {
      color: #fff;
      .head_l_2 {
        font-size: 22px;
        padding-top: 10px;
      }
    }
    .head_r {
      background-color: #fff;
      color: #fd6766;
      height: 30px;
      line-height: 30px;
      width: 90px;
      text-align: center;
      border-radius: 20px;
      margin-top: 15px;
    }
  }
  .list {
    margin: 15px 10px;
    box-shadow: 0px 0px 10px #ededed;
    border-radius: 5px;
    padding: 15px 10px;
    .list_01 {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    .list_02 {
      display: flex;
      justify-content: space-between;
      color: #9a9a9a;
      .list_01_r {
        color: #fc4f50;
      }
    }
  }
}
</style>
