<template>
  <view class="reseller">
    <view class="top">
      <view class="num"
        style="margin-left: 30px;">
        <view>昨日收益</view>
        <view class="txc">{{data.yesterday_money}}</view>
      </view>
      <view class="num1"
        style="">
        <view>当前佣金</view>
        <view style="font-size: 40px;">{{data.money}}</view>
      </view>
      <view class="num"
        style="margin-right: 30px;">
        <view>累计已提</view>
        <view>{{data.already_money}}</view>
      </view>
      <view class="tixian"
        @click="jump_cash">
        <view class="btn"
          style="font-size: 16px;">立即提现</view>
      </view>
      <!-- <view class="jilu">
        <navigator url="/pages/user/record/record">
          <view class="jl">提现记录 ></view>
        </navigator>
      </view> -->
    </view>

    <view class="icon">
      <view class="ico"
        v-for="item of list">
        <navigator :url="item.url">
          <view class="tubiao">
            <img class="img"
              :src="item.img"></img>
          </view>
          <view class="tt">
            <view class="text">{{item.title}}</view>
          </view>
        </navigator>
      </view>

    </view>
    <view class="kong"></view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      list: [{
        title: '我的名片',
        img: require("@/imgs/mp.png"),
        url: "/pages/user/spread/spread"
      },
        // {
        // 	title: '分销统计',
        // 	img: require("@/imgs/tj.png"),
        // 	url: "/pages/user/agent/agent"
        // },
        // {
        //   title: '佣金明细',
        //   img: require("@/imgs/q.png"),
        //   url: "/pages/user/mingxi"
        // },
        // {
        // 	title: '分销排行',
        // 	img: require("@/imgs/dd.png"),
        // 	url: "/pages/user/sort/sort"
        // },
      ]
    }
  },
  components: {},
  onLoad () {
    this._load()
  },
  methods: {
    _load () {
      this.$api.http.get('fx/user/get_fx_money').then(res => {
        console.log('分销所得金额：', res.data)
        this.data = res.data
      })
    },
    jump_cash () {
      const isWX = /MicroMessenger/i.test(navigator.userAgent)
      if (!isWX) {
        uni.showToast({
          icon: "none",
          title: "请在微信内打开本页",
          duration: 2000
        })
        return
      }
      uni.navigateTo({
        url: '/pages/user/cash/cash?money=' + this.data.money,
      })
    }
  },
  onPullDownRefresh () {
    //this._load()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 2000)
  }
}
</script>

<style lang="less">
page {
  background-color: #f5f5f5;
}

.reseller {
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 14px;

  .top {
    color: #ffffff;
    display: flex;
    // justify-content: flex-end;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 250px;
    background-color: #dd524d;
    background: linear-gradient(top, #4ec28e, #1c9c63);

    .title {
      background-color: #ffffff;
    }

    .num {
      font-size: 15px;
      line-height: 25px;
      text-align: center;
      margin-top: 33%;
      width: 33%;
    }

    .num1 {
      margin-top: 10%;
      text-align: center;
      width: 33%;
    }
  }

  .jilu {
    font-size: 15px;
    position: absolute;
    left: 78%;
    top: 20%;
  }

  .tixian {
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    width: 55%;
    height: 60px;
    border-radius: 60px;
    position: absolute;
    bottom: -30px;
    left: 23%;

    .btn {
      margin-top: 7%;
      text-align: center;
      width: 85%;
      background-color: #1c9c63;
      height: 40px;
      border: none;
      border-radius: 50px;
      line-height: 40px;
      color: #ffffff;
    }
  }

  .icon {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // background-color: #4CD964;

    margin-left: 3%;
    margin-right: 3%;
    margin-top: 10%;

    .ico {
      border-radius: 10px;
      border: 1px solid #c0c0c0;
      width: 49%;
      height: 100px;
      margin-top: 10px;
      display: flex;
      border: none;
      font-size: 15px;
      flex-direction: column;
      background-color: #ffffff;

      .img {
        width: 32px;
        height: 32px;
      }

      .tubiao {
        margin-top: 20px;
        text-align: center;
      }

      .text {
        color: #8f8f94;
        padding-top: 5px;
        text-align: center;
      }
    }
  }

  .kong {
    height: 100px;
  }
}
</style>
