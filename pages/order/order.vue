<template>
  <view class="content">
    <view class="navbar">
      <view v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{current: tabCurrentIndex === index}"
        @click="tabClick(index)">
        {{item.text}}
      </view>
    </view>

    <swiper :current="tabCurrentIndex"
      class="swiper-box"
      duration="300"
      @change="changeTab">
      <swiper-item class="tab-content"
        v-for="(tabItem,tabIndex) in navList"
        :key="tabIndex">
        <scroll-view class="list-scroll-content"
          scroll-y>
          <!-- 空白页 -->
          <!-- <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty> -->
          <None v-if="list_empty"></None>
          <!-- 订单列表 -->
          <view v-else>
            <!-- <view v-for="(item,index) in order_list" :key="index" class="order-item" v-if="tabCurrentIndex==0 || (item.payment_state==now_pay && item.shipment_state==now_drive && item.state==now_state) "> -->
            <view v-for="(item,index) in order_list"
              :key="index"
              class="order-item"
              v-if="check_state(item)">
              <view class="i-top b-b">
                <text class="time">{{item.order_num}}</text>
                <text class="state"
                  :style="{color: item.stateTipColor}"
                  style="margin-right: 20px;">{{item.stateTip}}</text>
                <text class="state">{{item.create_time}}</text>
                <text v-if="item.payment_state == 0"
                  class="del-btn yticon icon-iconfontshanchu1"
                  @click="deleteOrder(item.order_id)"></text>
              </view>
              <scroll-view v-if="item.OrderGoods&&item.OrderGoods.length > 1"
                class="goods-box"
                scroll-x>
                <view v-for="(goodsItem, goodsIndex) in item.OrderGoods"
                  :key="goodsIndex"
                  class="goods-item"
                  @click="jumo_tomyorder(item.order_id)">
                  <image class="goods-img"
                    :src="getimg+goodsItem.imgs.url"
                    mode="aspectFill"></image>
                </view>
              </scroll-view>
              <view v-if="item.OrderGoods&&item.OrderGoods.length === 1"
                class="goods-box-single"
                v-for="(goodsItem, goodsIndex) in item.OrderGoods"
                :key="goodsIndex">
                <image class="goods-img"
                  :src="getimg+goodsItem.imgs.url"
                  mode="aspectFill"
                  @click="jumo_tomyorder(item.order_id)"></image>
                <view class="right"
                  @click="jumo_tomyorder(item.order_id)">
                  <text class="title clamp">{{goodsItem.goods_name}}</text>
                  <text class="attr-box">{{goodsItem.sku_name?goodsItem.sku_name:''}} x {{goodsItem.num}}</text>
                  <text class="price">{{item.order_money}}</text>
                </view>
              </view>

              <view class="price-box">
                共
                <text class="num">{{item.OrderGoods&&item.OrderGoods.length}}</text>
                件商品 实付款
                <text class="price">{{item.order_money}}</text>
              </view>
              <view class="action-box b-t"
                v-if="item.payment_state == 0 && item.state != -3">
                <button class="action-btn"
                  @click="deleteOrder(item.order_id)">取消订单</button>
                <button class="action-btn recom"
                  @click="pay_again(item.order_id)"
                  v-if="item.payment_state == 0">立即支付</button>
              </view>
            </view>
          </view>

          <!-- <uni-load-more :status="tabItem.loadingType"></uni-load-more> -->

        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import None from "@/components/qy/none.vue"
import uniLoadMore from '@/components/uni/uni-load-more/uni-load-more.vue'
import empty from "@/components/empty"
import orderModel from "@/model/order.js"
export default {
  components: {
    uniLoadMore,
    empty,
    None
  },
  data () {
    return {
      list_empty: false,
      now_pay: 0,
      now_drive: 0,
      now_state: '',
      getimg: this.$getimg,
      tabCurrentIndex: 0,
      order_list: '',
      navList: [{
        state: 0,
        text: '全部',
        loadingType: 'more',
        orderList: []
      },
      {
        state: 1,
        text: '待付款',
        loadingType: 'more',
        orderList: []
      },
      {
        state: 2,
        text: '待发货',
        loadingType: 'more',
        orderList: []
      },
      {
        state: 3,
        text: '待收货',
        loadingType: 'more',
        orderList: []
      },
      {
        state: 4,
        text: '售后',
        loadingType: 'more',
        orderList: []
      }
      ],
    }
  },
  onShow () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    this.get_order()
    this.tabCurrentIndex = +currentPage.options.state || 0
    this.tabClick(this.tabCurrentIndex)
  },
  onLoad (options) {
    this.get_order()
    /**
     * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
     * 替换onLoad下代码即可
     */
    this.tabCurrentIndex = +options.state || 0
    // #ifndef MP
    // this.loadData()
    // #endif
    // #ifdef MP
    // if (options.state == 0) {
    // this.loadData()
    // }
    // #endif

  },

  methods: {
    check_state (item) {
      if (this.tabCurrentIndex == 0) {
        return true
      }
      if (this.tabCurrentIndex == 1 || this.tabCurrentIndex == 2 || this.tabCurrentIndex == 3) {
        if (item.payment_state == this.now_pay && item.shipment_state == this.now_drive && item.state == this.now_state) {
          return true
        }
        return false
      }
      if (this.tabCurrentIndex == 4) {
        if (item.state == -2 || item.state == 1 || item.state == -1) {
          return true
        }
        return false
      }
    },
    jumo_tomyorder (id) {
      uni.navigateTo({
        url: '../user/myorder/myorder?id=' + id
      })
    },
    get_order () {
      let obj = {
        stateTip: '',
        stateTipColor: ''
      }
      const that = this
      orderModel.postOrderAll().then(res => {
        if (!res.data) {
          this.list_empty = true
        } else {
          for (let k in res.data) {
            let v = res.data[k]
            if (v.payment_state == 0) {
              obj = that.orderStateExp(1)
            }
            if (v.payment_state == 1 && v.shipment_state == 0) {
              obj = that.orderStateExp(2)
            }
            if (v.payment_state == 1 && v.shipment_state == 1) {
              obj = that.orderStateExp(3)
            }
            if (v.state == -3) {
              obj = that.orderStateExp(9)
            }
            if (v.payment_state == 1 && v.shipment_state == 2 && v.state == 1) {
              obj = that.orderStateExp(4)
            }
            if (v.state == -1) {
              obj = that.orderStateExp(5)
            }
            if (v.state == -2) {
              obj = that.orderStateExp(6)
            }
            v.stateTip = obj.stateTip
            v.stateTipColor = obj.stateTipColor
          }
          this.order_list = res.data
        }
      })
    },
    //支付
    async pay_again (id) {

      //#ifdef MP-WEIXIN 
      const pay_data = await orderModel.postOrderWxPay(id).then(res => {
        return res
      })
      await this.pay(pay_data)
      //#endif

      //#ifdef APP-PLUS  
      const app_data = await orderModel.postOrderAppPay(id).then(res => {
        return res
      })
      await this.app_pay(app_data)
      //#endif


      //#ifdef H5 
      const wx_data = await orderModel.postOrderH5Pay(id).then(res => {
        return res
      })
      this.wxPay(wx_data)
      //#endif
    },
    //支付
    pay (data) {
      const that = this
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: function (res) {
          console.log('success:' + JSON.stringify(res))
          that.get_order()
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err))
        }
      })
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
    //APP支付
    app_pay (data) {
      console.log("app支付")
      console.log(this.order_id)
      console.log("app支付")
      const order_id = this.order_id
      uni.requestPayment({
        provider: "wxpay",
        orderInfo: JSON.stringify(data),
        success: function (res) {
          console.log('success:', res)
          uni.redirectTo({
            url: '/pages/user/myorder/myorder?id=' + order_id
          })
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err))
          uni.redirectTo({
            url: '/pages/user/myorder/myorder?id=' + order_id
          })
        }
      })
    },

    jsApiCall (json) {
      const that = this
      WeixinJSBridge.invoke("getBrandWCPayRequest", json, function (res) {
        WeixinJSBridge.log('a:', res.err_msg)
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          that.$api.msg("支付成功!")
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          that.$api.msg("取消支付")
        } else {
          that.$api.msg("支付失败")
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
    },

    //获取订单列表
    loadData (source) { },

    //swiper 切换
    changeTab (e) {
      this.tabClick(e.target.current)
    },
    //顶部tab点击
    tabClick (index) {
      this.tabCurrentIndex = index
      if (index == 1) {
        this.now_pay = 0
        this.now_drive = 0
        // this.now_state=0 
      }
      if (index == 2) {
        this.now_pay = 1
        this.now_drive = 0
        this.now_state = 0
      }
      if (index == 3) {
        this.now_pay = 1
        this.now_drive = 1
        this.now_state = 0
      }
      if (index == 4) {
        this.now_pay = 1
        this.now_drive = 0
        this.now_state = -1
      }
    },
    //删除订单
    deleteOrder (id) {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确定删除订单？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            orderModel.putOrderdel(id).then(res => {
              uni.showToast({
                title: '删除成功',
                duration: 2000
              })
              that.get_order()
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    //订单状态文字和颜色
    orderStateExp (state) {
      let stateTip = '',
        stateTipColor = '#fa436a'
      switch (+state) {
        case 1:
          stateTip = '待付款'
          break
        case 2:
          stateTip = '待发货'
          break
        case 3:
          stateTip = '待收货'
          break
        case 4:
          stateTip = '已完成'
          break
        case 5:
          stateTip = '退款中'
          break
        case 6:
          stateTip = '已退款'
          break
        case 9:
          stateTip = '已关闭'
          stateTipColor = '#909399'
          break

        //更多自定义
      }
      return {
        stateTip,
        stateTipColor
      }
    }
  },
  onPullDownRefresh () {
    this.get_order()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 2000)
  },
}
</script>

<style lang="scss">
page,
.content {
  background: $page-color-base;
  height: 100%;
}

.swiper-box {
  height: calc(100% - 40px);
}

.list-scroll-content {
  height: 100%;
}

.navbar {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
    color: $font-color-dark;
    position: relative;

    &.current {
      color: $base-color;

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 44px;
        height: 0;
        border-bottom: 2px solid $base-color;
      }
    }
  }
}

.uni-swiper-item {
  height: auto;
}

.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30upx;
  background: #fff;
  margin-top: 16upx;

  .i-top {
    display: flex;
    align-items: center;
    height: 80upx;
    padding-right: 30upx;
    font-size: $font-base;
    color: $font-color-dark;
    position: relative;

    .time {
      flex: 1;
    }

    .state {
      color: $font-color-light;
    }

    .del-btn {
      padding: 10upx 0 10upx 36upx;
      font-size: $font-lg;
      color: $font-color-light;
      position: relative;

      &:after {
        content: '';
        width: 0;
        height: 30upx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  /* 多条商品 */
  .goods-box {
    height: 160upx;
    padding: 20upx 0;
    white-space: nowrap;

    .goods-item {
      width: 120upx;
      height: 120upx;
      display: inline-block;
      margin-right: 24upx;
    }

    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20upx 0;

    .goods-img {
      display: block;
      width: 120upx;
      height: 120upx;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 30upx 0 24upx;
      overflow: hidden;

      .title {
        font-size: $font-base + 2upx;
        color: $font-color-dark;
        line-height: 1;
      }

      .attr-box {
        font-size: $font-sm + 2upx;
        color: $font-color-light;
        padding: 10upx 12upx;
      }

      .price {
        font-size: $font-base + 2upx;
        color: $font-color-dark;

        &:before {
          content: '￥';
          font-size: $font-sm;
          margin: 0 2upx 0 8upx;
        }
      }
    }
  }

  .price-box {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 20upx 30upx;
    font-size: $font-sm + 2upx;
    color: $font-color-light;

    .num {
      margin: 0 8upx;
      color: $font-color-dark;
    }

    .price {
      font-size: $font-lg;
      color: $font-color-dark;

      &:before {
        content: '￥';
        font-size: $font-sm;
        margin: 0 2upx 0 8upx;
      }
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100upx;
    position: relative;
    padding-right: 30upx;
  }

  .action-btn {
    width: 160upx;
    height: 60upx;
    margin: 0;
    margin-left: 24upx;
    padding: 0;
    text-align: center;
    line-height: 60upx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
    background: #fff;
    border-radius: 100px;

    &:after {
      border-radius: 100px;
    }

    &.recom {
      background: #fff9f9;
      color: $base-color;

      &:after {
        border-color: #f7bcc8;
      }
    }
  }
}

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  height: 80upx;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 28upx;
  color: #999;
}

.uni-load-more__img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  width: 6px;
  height: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  background: #999;
  position: absolute;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  transform: rotate(90deg);
  top: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
  transform: rotate(180deg);
  top: 11px;
  right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
  transform: rotate(270deg);
  bottom: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  height: 24px;
  width: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
