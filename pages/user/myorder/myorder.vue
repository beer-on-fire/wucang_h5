<template>
  <view>
    <!-- 地址 -->
    <view url="/pages/address/address?source=1"
      class="address-section">
      <view class="order-content">
        <text class="yticon icon-shouhuodizhi"></text>
        <view class="cen">
          <view class="top">
            <text class="name">{{my_order.receiver_name}}</text>
            <text class="mobile">{{my_order.receiver_mobile}}</text>
          </view>
          <text class="address">{{my_order.receiver_city}}</text>
        </view>
        <!-- <text class="yticon icon-you"></text> -->
      </view>

      <image class="a-bg"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
    </view>
    <view class="tuanzhang"
      v-if="my_order.is_captain && my_order.is_captain != 1">
      <view class="tz-l">

      </view>
      <view class="tz-m">该团由团长代收包裹（免运费）</view>
      <view class="tz-r">团长：123</view>
    </view>
    <view class="goods-section">
      <!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
      <!-- 商品列表 -->
      <view class="g-item"
        v-for="(item,index) of my_order.ordergoods">
        <image :src="getimg+item.imgs.url"
          @click="jump_pro(item.goods_id)"></image>
        <view class="right">
          <text class="title clamp"
            @click="jump_pro(item.goods_id)">{{item.goods_name}}</text>
          <text class="spec"
            v-if="item.sku_name">规格:{{item.sku_name}}</text>
          <view class="price-box">
            <text class="price">￥{{item.price}}</text>
            <text class="number">x {{item.num}}</text>
            <!-- <view class="btn_2" v-if="my_order.state==1" @click="jump_tograde">评分</view> -->
            <button v-if="my_order.state == 1 && item.state < 2"
              style="height: 30px; line-height: 30px;margin-left: 30%;"
              type="default"
              size="mini"
              @click="jump_tograde(item.goods_id)">评价</button>
          </view>

        </view>
      </view>
    </view>

    <view class="yt-list"
      v-if="my_order.payment_state == 1 && my_order.pt_state ==1">
      <view class="ptcg"
        @click="jump_pindetail">
        <block v-if="my_order.payment_state == 1 && my_order.pt_state ==1">
          <view class="ptcg_l">恭喜您拼购成功</view>
        </block>
        <block v-if="my_order.payment_state == 1 && my_order.pt_state == 2">
          <view class="ptcg_l">[拼购成功]恭喜您拼购成功</view>
        </block>

        <view class="ptcg_r">
          <block v-for="(item,index) of pt_item.item_pic">
            <view class="ptcg_img"
              :style="'right:'+ 25*index +'px'">
              <img class="img"
                :src="item"></img>
            </view>
          </block>
        </view>
        <view class="ptcg_m">
          <uni-icons type="arrowright"
            size="20"
            color='#909399'></uni-icons>
        </view>
      </view>
    </view>

    <!-- 金额明细 -->
    <view class="yt-list">
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">订单编号</text>
        <text class="cell-tip">{{my_order.order_num}}</text>
      </view>
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">商品金额</text>
        <text class="cell-tip">￥{{my_order.goods_money}}</text>
      </view>
      <view class="yt-list-cell b-b"
        v-if="my_order.coupon_money>0">
        <text class="cell-tit clamp">优惠金额</text>
        <text class="cell-tip red">-￥{{my_order.coupon_money}}</text>
      </view>
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">运费</text>
        <text class="cell-tip"
          v-if="my_order.shipping_money == 0">免运费</text>
        <text class="cell-tip"
          v-else>{{my_order.shipping_money}}</text>
      </view>
      <view class="yt-list-cell b-b"
        v-if="my_order.drive_type && my_order.drive_type!='快递'">
        <text class="cell-tit clamp">配送方式</text>
        <text class="cell-tip">{{my_order.drive_type}}</text>
      </view>
      <view class="yt-list-cell desc-cell"
        v-if="my_order.message">
        <text class="cell-tit clamp">备注</text>
        {{my_order.message}}
      </view>
      <view class="yt-list-cell b-b"
        v-if="my_order.state<0">
        <text class="cell-tit clamp">退款状态</text>
        <text class="cell-tip">{{my_order.state==-1?'退款申请中':'退款成功'}}</text>
      </view>
    </view>
    <view class="btn"
      v-if="my_order.payment_state==1">
      <view class="btn_2"
        v-if="my_order.state==0"
        @click="jump_torefund(my_order.order_id)">退款</view>
      <!-- <view class="btn_2" v-if="my_order.state==1" @click="jump_tograde">评分</view> -->
      <button class="btn_1"
        v-if="my_order.state==0 && my_order.shipment_state==1"
        @click="jump_wuliu(my_order.order_id)">物流</button>
      <view class="btn_1"
        v-if="my_order.state==0 && my_order.shipment_state==1"
        @click="set_order_finish(my_order.order_id)">确认收货</view>
    </view>
    <view v-if="my_order.payment_state==1 && my_order.shipment_state<1">
      <view class="yanz"
        style="display: flex; height: 200px;flex-direction: column;justify-content: center;width: 100%;">
        <image v-if="my_order.qrcode"
          :src="my_order.qrcode"
          style="width: 100px;height: 100px;margin-left: 37%;"></image>
        <view style="text-align: center;"
          v-if="my_order.yz_code">{{my_order.yz_code}}</view>
      </view>
    </view>
    <view class="action-box b-t"
      v-if="my_order.payment_state == 0 && my_order.state >= 0">
      <button class="action-btn recom"
        style="margin-top: 50px;"
        @click="pay_again(order_id)">立即支付</button>
    </view>
  </view>
</template>

<script>
import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
export default {
  data () {
    return {
      pt_item: '',
      is_haoyou: false,
      order_id: '',
      getimg: this.$getimg,
      price: '',
      my_order: '',
      mr_address: '',
      maskState: 0, //红包面板显示状态
      desc: '', //备注
      payType: 1, //1微信 2支付宝
      addressData: {}
    }
  },
  components: {
    uniIcons
  },
  onLoad (option) {
    this.order_id = option.id
    console.log(this.order_id)
    // this.get_moren_addr()
    //商品数据
    //let data = JSON.parse(option.data);
    //console.log(data);
  },
  onShow () {

    this.get_my_order()
  },
  methods: {
    jump_wuliu (id) {
      console.log(id)
      uni.navigateTo({
        url: './drive/drive?id=' + id
      })
    },
    // get_moren_addr(){
    // 	this.$api.http.get('address/get_default_address').then(res=>{
    // 		this.mr_address = res.data
    // 		console.log(res.data)
    // 	})
    // }, 

    //获取订单数据
    get_my_order () {
      const that = this
      const id = this.order_id
      this.$api.http.get('order/user/get_order_one', {
        id: id
      }).then(res => {
        this.my_order = res.data
        console.log(res.data)
        if (res.data.payment_state == 1) {
          this.$api.http.get('pt/get_one_item?id=' + res.data.item_id).then(res2 => {
            that.pt_item = res2.data
            if (res2.data.is_cou_tuan == 1) {
              that.is_haoyou = true
            }
          })

        }
        let a = 0
        for (let v in res.data.ordergoods) {
          a += res.data.ordergoods[v].price * res.data.ordergoods[v].num
        }
        this.price = a.toFixed(2) * 1
        uni.setStorageSync('price', this.price)
        console.log(this.price)
      })
    },

    set_order_finish (id) {
      this.$api.http.post('order/user/receive', {
        id: id
      }).then(res => {
        if (res.data == 1) {
          this.$api.msg('操作成功')
        }

        this.get_my_order()
      })
    },

    //支付
    async pay_again (id) {

      //#ifdef MP-WEIXIN
      const pay_data = await this.$api.http.post('order/pay/pre_order', {
        id: id
      }).then(res => {
        return res
      })
      await this.pay(pay_data)
      //#endif

      //#ifdef APP-PLUS 
      const app_data = await this.$api.http.post('order/pay/pre_app', {
        id: id
      }).then(res => {
        return res
      })
      await this.app_pay(app_data)
      //#endif 

      //#ifdef H5 
      const wx_data = await this.$api.http.post('order/second_pay', {
        id: id
      }).then(res => {
        return res
      })
      this.wxPay(wx_data)
      //#endif
    },
    //小程序支付
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
      console.log("app支付", this.order_id)
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


    jump_pro (id) {
      uni.navigateTo({
        url: '/pages/extend-view/productDetail/productDetail?id=' + id
      })
    },
    jump_torefund (id) {
      uni.navigateTo({
        url: './refund/refund?id=' + id
      })
    },
    jump_tograde (id) {
      let obj = {
        order_id: this.my_order.order_id,
        data: ''
      }
      for (let k in this.my_order.ordergoods) {
        let v = this.my_order.ordergoods[k]
        if (v.goods_id == id) {
          obj.data = v
        }
      }

      uni.setStorageSync('grade_pro', obj)
      uni.navigateTo({
        url: './grade/grade?goods_id=' + id + '&order_id=' + this.my_order.order_id
      })
    },
    jump_pindetail () {
      if (this.is_haoyou) {
        let img = this.my_order.ordergoods[0].imgs.url
        let price = this.my_order.ordergoods[0].price
        let name = this.my_order.ordergoods[0].goods_name
        uni.navigateTo({
          url: '/pages/invite/invite?id=' + this.my_order.item_id + '&img=' + img + '&price=' + price + '&name=' + name
        })
      } else {
        uni.navigateTo({
          url: '/pages/pindetail/pindetail?id=' + this.my_order.item_id
        })
      }

    }
  },
  onPullDownRefresh () {
    this.get_my_order()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 2000)
  }
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
  padding-bottom: 100upx;
}

.tuanzhang {
  background: #fff;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  font-size: 12px;

  .tz-l {
    width: 30px;

    input {
      border: 1px solid #000;
    }
  }

  .tz-m {
    flex-grow: 1;
    color: #ff8d42;
    padding-top: 2px;
  }

  .tz-r {
    padding-top: 3px;
  }
}

.ptcg {
  display: flex;
  padding: 10px 10px;
  color: #909399;
  font-size: 12px;
  line-height: 30px;

  .ptcg_l {
    font-size: 14px;
  }

  .ptcg_r {
    display: flex;
    line-height: 30px;
    position: relative;
    flex-grow: 1;
    text-align: right;

    .ptcg_img {
      z-index: 99;
      position: absolute;
      top: 0;

      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
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

.btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  font-size: 30upx;
  text-align: center;

  .btn_1 {
    border: 1px solid #3ab54a;
    margin: 10px;
    width: 20%;
    height: 30px;
    line-height: 25px;
    border-radius: 5px;
    background-color: #3ab54a;
    color: #f3f3f3;
  }

  .btn_2 {
    margin: 10px;
    width: 15%;
    height: 30px;
    line-height: 25px;
    border-radius: 5px;
    background-color: $uni-text-color-grey;
    color: #f3f3f3;
  }
}

.address-section {
  padding: 30upx 0;
  background: #fff;
  position: relative;

  .order-content {
    display: flex;
    align-items: center;
  }

  .icon-shouhuodizhi {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90upx;
    color: #888;
    font-size: 44upx;
  }

  .cen {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 28upx;
    color: $font-color-dark;
  }

  .name {
    font-size: 34upx;
    margin-right: 24upx;
  }

  .address {
    margin-top: 16upx;
    margin-right: 20upx;
    color: $font-color-light;
  }

  .icon-you {
    font-size: 32upx;
    color: $font-color-light;
    margin-right: 30upx;
  }

  .a-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 5upx;
  }
}

.goods-section {
  margin-top: 16upx;
  background: #fff;
  padding-bottom: 1px;

  .g-header {
    display: flex;
    align-items: center;
    height: 84upx;
    padding: 0 30upx;
    position: relative;
  }

  .logo {
    display: block;
    width: 50upx;
    height: 50upx;
    border-radius: 100px;
  }

  .name {
    font-size: 30upx;
    color: $font-color-base;
    margin-left: 24upx;
  }

  .g-item {
    display: flex;
    margin: 20upx 30upx;

    image {
      flex-shrink: 0;
      display: block;
      width: 140upx;
      height: 140upx;
      border-radius: 4upx;
    }

    .right {
      flex: 1;
      padding-left: 24upx;
      overflow: hidden;
    }

    .title {
      font-size: 30upx;
      color: $font-color-dark;
    }

    .spec {
      font-size: 26upx;
      color: $font-color-light;
    }

    .price-box {
      display: flex;
      align-items: center;
      font-size: 32upx;
      color: $font-color-dark;
      padding-top: 10upx;

      .price {
        margin-bottom: 4upx;
      }

      .number {
        font-size: 26upx;
        color: $font-color-base;
        margin-left: 20upx;
      }
    }

    .step-box {
      position: relative;
    }
  }
}

.yt-list {
  margin-top: 16upx;
  background: #fff;
}

.yt-list-cell {
  display: flex;
  align-items: center;
  padding: 10upx 30upx 10upx 40upx;
  line-height: 70upx;
  position: relative;

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b:after {
    left: 30upx;
  }

  .cell-icon {
    height: 32upx;
    width: 32upx;
    font-size: 22upx;
    color: #fff;
    text-align: center;
    line-height: 32upx;
    background: #f85e52;
    border-radius: 4upx;
    margin-right: 12upx;

    &.hb {
      background: #ffaa0e;
    }

    &.lpk {
      background: #3ab54a;
    }
  }

  .cell-more {
    align-self: center;
    font-size: 24upx;
    color: $font-color-light;
    margin-left: 8upx;
    margin-right: -10upx;
  }

  .cell-tit {
    flex: 1;
    font-size: 26upx;
    color: $font-color-light;
    margin-right: 10upx;
  }

  .cell-tip {
    font-size: 26upx;
    color: $font-color-dark;

    &.disabled {
      color: $font-color-light;
    }

    &.active {
      color: $base-color;
    }

    &.red {
      color: $base-color;
    }
  }

  &.desc-cell {
    .cell-tit {
      max-width: 90upx;
    }
  }

  .desc {
    flex: 1;
    font-size: $font-base;
    color: $font-color-dark;
  }
}

/* 支付列表 */
.pay-list {
  padding-left: 40upx;
  margin-top: 16upx;
  background: #fff;

  .pay-item {
    display: flex;
    align-items: center;
    padding-right: 20upx;
    line-height: 1;
    height: 110upx;
    position: relative;
  }

  .icon-weixinzhifu {
    width: 80upx;
    font-size: 40upx;
    color: #6bcc03;
  }

  .icon-alipay {
    width: 80upx;
    font-size: 40upx;
    color: #06b4fd;
  }

  .icon-xuanzhong2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60upx;
    height: 60upx;
    font-size: 40upx;
    color: $base-color;
  }

  .tit {
    font-size: 32upx;
    color: $font-color-dark;
    flex: 1;
  }
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 995;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90upx;
  justify-content: space-between;
  font-size: 30upx;
  background-color: #fff;
  z-index: 998;
  color: $font-color-base;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);

  .price-content {
    padding-left: 30upx;
  }

  .price-tip {
    color: $base-color;
    margin-left: 8upx;
  }

  .price {
    font-size: 36upx;
    color: $base-color;
  }

  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280upx;
    height: 100%;
    color: #fff;
    font-size: 32upx;
    background-color: $base-color;
  }
}

/* 红包面板 */
.mask {
  display: flex;
  align-items: flex-end;
  position: fixed;
  left: 0;
  top: var(--window-top);
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 9995;
  transition: 0.3s;

  .mask-content {
    width: 100%;
    min-height: 30vh;
    max-height: 70vh;
    background: #f3f3f3;
    transform: translateY(100%);
    transition: 0.3s;
    overflow-y: scroll;
  }

  &.none {
    display: none;
  }

  &.show {
    background: rgba(0, 0, 0, 0.4);

    .mask-content {
      transform: translateY(0);
    }
  }
}

/* 红包列表 */
.coupon-item {
  display: flex;
  flex-direction: column;
  margin: 20upx 24upx;
  background: #fff;

  .con {
    display: flex;
    align-items: center;
    position: relative;
    height: 120upx;
    padding: 0 30upx;

    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: 0;
      border-bottom: 1px dashed #f3f3f3;
      transform: scaleY(50%);
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    height: 100upx;
  }

  .title {
    font-size: 32upx;
    color: $font-color-dark;
    margin-bottom: 10upx;
  }

  .time {
    font-size: 24upx;
    color: $font-color-light;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26upx;
    color: $font-color-base;
    height: 100upx;
  }

  .price {
    font-size: 44upx;
    color: $base-color;

    &:before {
      content: '￥';
      font-size: 34upx;
    }
  }

  .tips {
    font-size: 24upx;
    color: $font-color-light;
    line-height: 60upx;
    padding-left: 30upx;
  }

  .circle {
    position: absolute;
    left: -6upx;
    bottom: -10upx;
    z-index: 10;
    width: 20upx;
    height: 20upx;
    background: #f3f3f3;
    border-radius: 100px;

    &.r {
      left: auto;
      right: -6upx;
    }
  }
}
</style>
