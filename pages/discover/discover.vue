<template>
  <view class="container"
    style="height:100vh">
    <scroll-view scroll-y
      style="height:100vh;padding-bottom: 100px;">
      <view class="tui-product-box tui-pb-20 tui-bg-white">
        <view class="tui-group-name">
          <text>新品拼购</text>
        </view>
        <view class="tui-new-box">
          <view class="tui-new-item"
            :class="[index!=0 && index!=1 ?'tui-new-mtop':'']"
            v-for="(item,index) in newProduct"
            :key="index"
            @tap="detail(item.goods.goods_id)">
            <!-- <img src="@/imgs/6.jpg"
              class="tui-new-label" /> -->
            <view class="tui-title-box">
              <view class="tui-new-title">{{item.pt.name}}</view>
              <view class="tui-new-price">
                <text class="tui-new-present">截止：{{item.pt.end_time}}</text>
              </view>
            </view>
            <img :src="getimg+item.goods.imgs"
              class="tui-new-img2" />
          </view>
        </view>
      </view>

      <!-- <view class="tui-product-box">
        <view class="tui-product-list">
          <view class="tui-product-container">
            <block v-for="(item,index) in productList"
              :key="index"
              v-if="(index+1)%2!=0">
              <view class="tui-pro-item"
                @tap="detail(item.goods_id)">
                <view class='pic'>
                  <image :src="getimg+item.imgs"
                    class="tui-pro-img"
                    style="height: 46vw;width: 46vw;" />
                  <view v-if="item.stock==0">
                    <view class='cont-img'> </view>
                    <view class='maiguang'>
                      <img src='@/imgs/x.png'></img>
                    </view>
                  </view>
                </view>
                <view class="tui-pro-content">
                  <view class="tui-pro-tit">{{item.goods_name}}</view>
                  <view>
                    <view class="tui-pro-price">
                      <text class="tui-sale-price"
                        v-if="is_vip">vip{{item.price}}</text>
                      <text class="tui-sale-price"
                        v-else>￥{{item.price}}</text>
                      <text class="tui-factory-price"
                        v-if="is_vip">￥{{item.market_price}}</text>
                      <xianshi v-if="item.discount && item.discount.reduce_price"
                        title="限时"
                        :price="item.price-item.discount.reduce_price*1"></xianshi>
                      <xianshi v-if="item.pt && item.pt.price"
                        title="拼购"
                        :price="(item.price*100-item.pt.price*100)/100"></xianshi>
                    </view>
                  </view>
                </view>
              </view>
            </block>
          </view>
          <view class="tui-product-container">
            <block v-for="(item,index) in productList"
              :key="index"
              v-if="(index+1)%2==0">
              <view class="tui-pro-item"
                hover-class="hover"
                :hover-start-time="150"
                @tap="detail(item.goods_id)">

                <view class='pic'>
                  <image :src="getimg+item.imgs"
                    class="tui-pro-img"
                    style="height: 46vw;width: 46vw;" />
                  <view v-if="item.stock==0">
                    <view class='cont-img'> </view>
                    <view class='maiguang'>
                      <img src='@/imgs/x.png'></img>
                    </view>
                  </view>
                </view>
                <view class="tui-pro-content">
                  <view class="tui-pro-tit">{{item.goods_name}}</view>
                  <view>
                    <view class="tui-pro-price">
                      <text class="tui-sale-price"
                        v-if="is_vip">vip {{item.price}}</text>
                      <text class="tui-sale-price"
                        v-else>￥{{item.price}}</text>
                      <text class="tui-factory-price"
                        v-if="is_vip">￥{{item.market_price}}</text>
                      <xianshi v-if="item.discount.reduce_price"
                        title="限时"
                        :price="item.price-item.discount.reduce_price*1"></xianshi>
                      <xianshi v-if="item.pt.price"
                        title="拼购"
                        :price="item.price-item.pt.price*1"></xianshi>
                    </view>
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </view> -->
    </scroll-view>
    <!--加载loadding-->
    <tui-loadmore :visible="loadding"
      :index="3"
      type="red"></tui-loadmore>
    <!--加载loadding-->
    <view class="tui-safearea-bottom"></view>
  </view>
</template>
<script>
import uniNoticeBar from '@/components/uni/uni-notice-bar/uni-notice-bar.vue'
import Check from '@/common/check.js'
import tuiIcon from "@/components/icon/icon"
import tuiTag from "@/components/tag/tag"
import tuiLoadmore from "@/components/loadmore/loadmore"
import Cache from "@/common/cache.js"
import xianshi from "@/components/qy/xianshi"
import productModel from '@/model/product.js'
export default {
  components: {
    tuiIcon,
    tuiTag,
    tuiLoadmore,
    xianshi,
    uniNoticeBar
  },
  data () {
    return {
      is_vip: 0,
      getimg: this.$getimg,
      newProduct: [],
      productList: [],
      loadding: false,
    }
  },
  onLoad (options) {
    if (options.sfm) {
      uni.setStorageSync('level_one', options.sfm) //上级分销的身份码
    }
    this._load()
  },
  methods: {
    _load () {
      let a = productModel.getProductHotRecent()
      let b = this.$api.http.get('pt/get_pt_search', { name: '' })
      Promise.all([b]).then(res => {
        // this.productList = res[0].data
        this.newProduct = res[0].data
      })
    },
    detail: function (id) {
      let url = '/pages/extend-view/productDetail/productDetail?id=' + id
      // #ifdef H5
      let my = uni.getStorageSync('my')
      if (my && my.data && my.data.sfm) {
        url = url + '&sfm=' + my.data.sfm
      }
      // #endif
      uni.navigateTo({
        url: url
      })
    }
  },
  onPullDownRefresh () {
    this._load()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 2000)
  },

  //小程序右上角原生菜单分享按钮，也可是页面中放置的分享按钮
  onShareAppMessage (res) {
    let my = uni.getStorageSync('my')
    let path = "/pages/index/index"
    if (my && my.data && my.data.sfm) {
      path = path + '?sfm=' + my.data.sfm
    }
    return {
      title: this.shop_name,
      path: path
    }
  },
}
</script>

<style lang="scss">
page {
  background: #f7f7f7;
}

/* #ifdef MP-WEIXIN */
.btn1 {
  width: 60rpx;
  height: 60rpx;
  font-size: 30rpx;
  position: fixed;
  padding: 0px;
  margin: 0px;
  right: 10rpx;
  z-index: 999;
  background: none !important;
}

.btnImg {
  width: 60rpx;
  height: 60rpx;
  opacity: 0.8;
}

.btn1::after {
  border: 0;
}

/* #endif */

.container {
  padding-bottom: 100rpx;
  color: #333;
}

/*tabbar*/

.tui-tabbar {
  /* 
		width: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
		background: #fff;
		height: 100rpx;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	 */
}

.tui-ptop-4 {
  padding-top: 4rpx;
}

.tui-scale {
  font-weight: bold;
  transform: scale(0.8);
  transform-origin: center 100%;
  line-height: 30rpx;
}

.tui-item-active {
  color: #fb586a !important;
}

/*tabbar*/
.notice {
  width: 100%;
  height: 30px;
}

.tui-header {
  width: 100%;
  box-sizing: border-box;
  background: #fb586a;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0px;
  /* #ifdef H5 */
  top: 0px;
  /* #endif */
  z-index: 999;

  .tui-header-dis {
    display: flex;
    padding-top: 4px;
    width: 100%;
    padding: 10px 30rpx 0 20rpx;
  }
}

.tui-rolling-search {
  width: 100%;
  height: 60rpx;
  border-radius: 35rpx;
  padding: 0 40rpx 0 30rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #999;
}

.tui-category {
  font-size: 24rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  margin-right: 22rpx;
  flex-shrink: 0;
}

.tui-category-scale {
  transform: scale(0.7);
  line-height: 24rpx;
}

.tui-icon-category {
  line-height: 20px !important;
  margin-bottom: 0 !important;
}

.tui-swiper {
  font-size: 26rpx;
  height: 60rpx;
  flex: 1;
  padding-left: 12rpx;
}

.tui-swiper-item {
  display: flex;
  align-items: center;
}

.tui-hot-item {
  line-height: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tui-header-banner {
  box-sizing: border-box;
  padding: 10px 0 0px 0rpx;
  background: #fb586a;
}

.tui-hot-search {
  color: #fff;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.tui-hot-tag {
  background: rgba(255, 255, 255, 0.15);
  padding: 10rpx 24rpx;
  border-radius: 30rpx;
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin-right: 15px;
  justify-content: center;
  line-height: 24rpx;
  /* margin-left: 20rpx; */
}

.tui-banner-bg {
  display: flex;
  height: 340rpx;
  background: #fb586a;
  position: relative;
}

.tui-primary-bg {
  width: 50%;
  display: inline-block;
  height: 224rpx;
  border: 1px solid transparent;
  position: relative;
  z-index: 1;
  background: #fb586a;
}

.tui-route-left {
  transform: skewY(8deg);
}

.tui-route-right {
  transform: skewY(-8deg);
}

.tui-banner-box {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  position: absolute;
  /* overflow: hidden; */
  z-index: 99;
  bottom: -80rpx;
  left: 0;
}

.tui-category-swiper {
  width: 100%;
  height: 60rpx;
}

.tui-category-name1 {
  height: 100%;
  color: #fff;
  line-height: 60rpx !important;
  width: max-content;
}

.tui-category-swiper .uni-swiper-slide-frame {
  width: 20%;
}
.tui-banner-swiper {
  width: 100%;
  height: 240rpx;
  border-radius: 12rpx;
  overflow: hidden;
  transform: translateY(0);
}

.tui-slide-image {
  width: 100%;
  height: 240rpx;
  display: block;
}

/* #ifdef APP-PLUS || MP */
// .tui-banner-swiper .wx-swiper-dot {
// 	width: 8rpx;
// 	height: 8rpx;
// 	display: inline-flex;
// 	background: none;
// 	justify-content: space-between;
// }

// .tui-banner-swiper .wx-swiper-dot::before {
// 	content: '';
// 	flex-grow: 1;
// 	background: rgba(255, 255, 255, 0.8);
// 	border-radius: 16rpx;
// 	overflow: hidden;
// }

// .tui-banner-swiper .wx-swiper-dot-active::before {
// 	background: #fff;
// }

// .tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
// 	width: 16rpx;
// }

/* #endif */

/* #ifdef H5 */
>>> .tui-banner-swiper .uni-swiper-dot {
  width: 8rpx;
  height: 8rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

>>> .tui-banner-swiper .uni-swiper-dot::before {
  content: '';
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16rpx;
  overflow: hidden;
}

>>> .tui-banner-swiper .uni-swiper-dot-active::before {
  background: #fff;
}

>>> .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
  width: 16rpx;
}

/* #endif */

.tui-product-category {
  background: #fff;
  padding: 45px 20rpx 0rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #555;
  margin-bottom: 20rpx;
}

.tui-category-item {
  width: 25%;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin: 0px 0 0px;
  margin: 10px 0 0;
}

.tui-category-img {
  height: 80rpx;
  width: 80rpx;
}

.tui-category-name {
  line-height: 20px;
  text-align: center;
}

.tui-product-box {
  margin-top: 20rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.tui-pb-20 {
  padding-bottom: 20rpx;
}

.tui-bg-white {
  background: #fff;
}

.tui-group-name {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  padding: 24rpx 0;
}

.tui-activity-box {
  display: flex;
  border-radius: 12rpx;
  overflow: hidden;
}

.tui-activity-img {
  width: 50%;
  display: block;
}

.tui-new-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tui-new-item {
  width: 49%;
  height: 200rpx;
  padding: 0px 7px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f2f9;
  position: relative;
  border-radius: 12rpx;
}

.tui-new-mtop {
  margin-top: 2%;
}

.tui-title-box {
  width: 55%;
  font-size: 24rpx;
}

.tui-new-title {
  line-height: 32rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-new-price {
  padding-top: 18rpx;
}

.tui-new-present {
  color: #ff201f;
  font-weight: bold;
}

.tui-new-original {
  display: inline-block;
  color: #a0a0a0;
  text-decoration: line-through;
  padding-left: 12rpx;
  transform: scale(0.8);
  transform-origin: center center;
}

.tui-new-img {
  width: 140rpx;
  height: 140rpx;
  display: block;
  flex-shrink: 0;
  border-radius: 5px;
}

.tui-new-img2 {
  width: 125rpx;
  height: 125rpx;
  display: block;
  flex-shrink: 0;
  border-radius: 5px;
  margin-left: 2px;
}

.tui-new-label {
  width: 56rpx;
  height: 56rpx;
  border-top-left-radius: 12rpx;
  position: absolute;
  left: 0;
  top: 0;
}

.tui-product-list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  /* padding-top: 20rpx; */
}

.tui-product-container {
  flex: 1;
  margin-right: 2%;
}

.tui-product-container:last-child {
  margin-right: 0;
}

.tui-pro-item {
  width: 70vw;
  margin-bottom: 4%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12rpx;
  overflow: hidden;
  margin: 0 auto 20px;
  .pic {
    position: relative;

    .maiguang {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 199;
      width: 100px;
      height: 100px;
      margin: -50px 0 0 -50px;
    }

    .maiguang img {
      width: 100px;
      height: 100px;
    }

    .cont-img {
      background-color: #000000;
      opacity: 0.3;
      width: 100%;
      height: 100%;
      z-index: 99;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.tui-pro-img {
  width: 70vw !important;
  height: 320rpx;
  display: block;
}

.tui-pro-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20rpx;
}

.tui-pro-tit {
  color: #2e2e2e;
  font-size: 26rpx;
  line-height: 18px;
  height: 36px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-pro-price {
  padding-top: 18rpx;
  display: flex;
  flex-wrap: wrap;
}

.tui-sale-price {
  /* #ifndef H5 */
  font-size: 14px;
  /* #endif */
  /* #ifdef H5 */
  font-size: 12px;
  /* #endif */
  margin-bottom: 5px;
  font-weight: 500;
  color: #fb586a;
}

.tui-factory-price {
  /* #ifndef H5 */
  font-size: 14px;
  /* #endif */
  /* #ifdef H5 */
  font-size: 12px;
  /* #endif */
  color: #a0a0a0;
  padding-left: 12rpx;
}

.tui-pro-pay {
  padding-top: 10rpx;
  font-size: 24rpx;
  color: #656565;
}
</style>
