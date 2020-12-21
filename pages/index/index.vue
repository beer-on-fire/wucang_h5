<template>
  <view class="container">

    <!--header-->
    <view class="tui-header">
      <view class="notice"
        v-if="gundong">
        <uni-notice-bar scrollable="true"
          single="true"
          :text="gundong"></uni-notice-bar>
      </view>
      <view class="tui-header-dis">
        <view class="tui-category"
          hover-class="opcity"
          :hover-stay-time="150"
          @tap="classify">
          <tui-icon name="manage-fill"
            color="#fff"
            :size="22"></tui-icon>
          <view class="tui-category-scale">所有</view>
        </view>
        <view class="tui-rolling-search"
          @click="search">
          <!-- #ifdef APP-PLUS || MP -->
          <icon type="search"
            :size='13'
            color='#999'></icon>
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <view>
            <tui-icon name="search"
              :size='16'
              color='#999'></tui-icon>
          </view>
          <!-- #endif -->
          <swiper vertical
            autoplay
            circular
            interval="8000"
            class="tui-swiper">
            <swiper-item v-for="(item,index) in hotSearch"
              :key="index"
              class="tui-swiper-item">
              <view class="tui-hot-item">{{item}}</view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>

    <!--header-->
    <view class="tui-header-banner">
      <view class="tui-hot-search"
        :style="gundong?'margin-top: 70px':'margin-top: 40px'"
        v-if="sys_switch && sys_switch.hot_swicth == 1">
        <view style="width: 50px;flex-shrink: 0;">热搜</view>
        <view class="tui-hot-tag"
          v-for="(item,index) of resou"
          :key="index"
          v-if="index<4">
          <view @click="tosearch(item)">{{item}}</view>
        </view>
      </view>
      <view class="tui-banner-bg">
        <view class="tui-primary-bg tui-route-left"></view>
        <view class="tui-primary-bg tui-route-right"></view>
        <!--banner-->
        <view class="tui-banner-box">
          <view class="tui-category-box">
            <swiper :indicator-dots="false"
              :autoplay="true"
              :interval="3000"
              :circular="false"
              :display-multiple-items="4"
              class="tui-category-swiper">
              <swiper-item v-for="(item,index) in flist"
                :key="index"
                @click="tabtap(item)">
                <view class="tui-category-name1">{{item.category_name}}</view>
              </swiper-item>
            </swiper>
          </view>
          <swiper :indicator-dots="true"
            :autoplay="true"
            :interval="5000"
            :duration="150"
            class="tui-banner-swiper"
            :circular="true"
            indicator-color="rgba(255, 255, 255, 0.8)"
            indicator-active-color="#fff">
            <swiper-item v-for="(item,index) in banner"
              :key="index"
              @click="jump_article(item.jump_id,item.type)">
              <image :src="getimg+item.imgs"
                class="tui-slide-image"
                mode="scaleToFill" />
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>

    <!-- <view class="tui-product-category">
      <view class="tui-category-item"
        v-for="(item,index) in category"
        :key="index"
        :data-key="item.name">
        <navigator :url="item.url">
          <image :src="getimg+item.img_id"
            class="tui-category-img"
            mode="scaleToFill"></image>
          <view class="tui-category-name">{{item.nav_name}}</view>
        </navigator>
      </view>
    </view> -->

    <!-- 	 <view class="tui-product-box tui-pb-20 tui-bg-white">
			<view class="tui-group-name" @tap="more">
				<text>新人专享</text>
				<tui-icon name="arrowright" :size="20" color="#555"></tui-icon>
			</view>
			<view class="tui-activity-box" @tap="detail">
				<image src="../../static/images/mall/activity/activity_1.jpg" class="tui-activity-img" mode="widthFix"></image>
				<image src="../../static/images//mall/activity/activity_2.jpg" class="tui-activity-img" mode="widthFix"></image>
			</view>
		</view> -->
    <!-- #ifdef MP-WEIXIN -->

    <button class="btn1"
      open-type="contact"
      v-if="sys_switch && sys_switch.is_serve == 1">
      <image class="btnImg"
        src="../../static/images/kefu.png"></image>
      <!-- <view>客服</view> -->
    </button>
    <!-- #endif -->

    <view class="tui-product-box tui-pb-20 tui-bg-white">
      <view class="tui-group-name">
        <text>商品分类</text>
      </view>
      <view class="t-list"
        v-if="slist.length">
        <view v-for="item in slist"
          :key="item.category_id"
          @click="navToList(item.category_id)"
          class="t-item">
          <image :src="getimg+item.imgs"></image>
          <text>{{item.category_name}}</text>
        </view>
      </view>
      <None v-else></None>
    </view>

    <!--加载loadding-->
    <tui-loadmore :visible="loadding"
      :index="3"
      type="red"></tui-loadmore>
    <!-- <tui-nomore visible="{{!pullUpOn}}"></tui-nomore> -->
    <!--加载loadding-->
    <view class="tui-safearea-bottom"></view>
    <!-- <Coupon :coupon="coupon" :coulist="coulist" @close_add="close_add"></Coupon> -->
    <!-- 弹出 -->
    <!-- #ifdef APP-PLUS -->
    <Xieyi></Xieyi>
    <!-- #endif -->
  </view>
</template>
<script>
import uniNoticeBar from '@/components/uni/uni-notice-bar/uni-notice-bar.vue'
import Check from '@/common/check.js'
import Xieyi from "@/components/qy/xieyi"
import tuiIcon from "@/components/icon/icon"
import Coupon from "@/components/qy/Coupon"
import None from "@/components/qy/none"
import tuiTag from "@/components/tag/tag"
import tuiLoadmore from "@/components/loadmore/loadmore"
import tuiNomore from "@/components/nomore/nomore"
import Cache from "@/common/cache.js"
import xianshi from "@/components/qy/xianshi"
import productModel from '@/model/product.js'
import categoryModel from '@/model/category.js'
export default {
  components: {
    tuiIcon,
    tuiTag,
    tuiLoadmore,
    tuiNomore,
    Coupon,
    xianshi,
    Xieyi,
    uniNoticeBar,
    None
  },
  data () {
    return {
      sys_switch: '',
      gundong: '',
      xy: true,
      resou: '',
      coulist: [1, 2, 3, 4],
      coupon: true,
      is_vip: 0,
      getimg: this.$getimg,
      current: 0,
      flist: [],
      listAll: [],//ALL
      listAlls: [],//2
      hotSearch: [],
      banner: [],
      category: [],
      currentId: 1,
      currentName: '',
      pageIndex: 1,
      loadding: false,
      pullUpOn: true,
      switch_list: '',
      fx_switch: false
    }
  },
  onLoad (options) {
    this.prmSwitch()

    if (options.sfm) {
      uni.setStorageSync('level_one', options.sfm) //上级分销的身份码
    }

    this.check_switch()
    this._load()
  },
  computed: {
    slist () {
      return this.listAlls.filter(item => {
        if (item.pid && item.pid === this.currentId) {
          return true
        }
        return false
      })
    }
  },
  methods: {
    async prmSwitch () {
      this.sys_switch = await this.promise_switch.then(res => (res))
      this.switch_list = this.sys_switch
    },
    async check_switch () {
      const that = this
      await this.prmSwitch()
      that.fx_switch = that.switch_list.fx_status == 0 ? false : true
    },
    jump (url, id, name, item) {
      const that = this
      if (name == "红包") { //红包
        if (!Check.a()) {
          return
        }
      }
      if (name == '分销商品') { //分销
        //判断分销开关是否开启
        if (!this.fx_switch) {
          this.$api.msg('未开启分销模式')
          return
          url = '/pages/extend-view/productList/productList?type=no_fx'
          uni.navigateTo({
            url: url
          })
          return
        }
      }
      //九宫格
      if (item.game && item.game.game_type == 0) {
        uni.navigateTo({
          url: url
        })
      }
      //大转盘
      if (item.game && item.game.game_type == 1) {
        uni.navigateTo({
          url: url
        })
      }

      uni.navigateTo({
        url: url
      })

    },
    close_add () {
      this.coupon = false
    },
    tabbarSwitch: function (e) {
      let index = e.currentTarget.dataset.index
      this.current = index
      if (index != 0) {
        if (index == 1) {
          this.classify()
        } else if (index == 2) {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        } else if (index == 3) {
          uni.switchTab({
            url: '/pages/user/user'
          })
        }
      }
    },
    _load () {
      this.$api.http.get('article/type_article?type=3').then(res => {
        if (res.data && res.data[0]) {
          this.gundong = res.data[0].title
        }
      })
      this.$api.http.get('search/record').then(res => { //首页banner 
        this.resou = res.data
        if (res.data == 1) return
        this.hotSearch = res.data.slice(0, 3)
        uni.setStorageSync('hotSearch', this.resou)
      })
      let c = this.$api.http.get('nav/user_getNav') //导航
      let d = this.$api.http.get('banner/banner_all_item') //轮播图
      let e = categoryModel.getCategoryAll()
      Promise.all([c, d, e]).then(res => {
        this.category = res[0].data
        this.banner = res[1].data
        let list = res[2].data
        this.listAll = list
        this.flist = list.filter(item => !item.pid)
        this.listAlls = list.filter(item => item.pid)
        if (list.length) {
          this.currentName = list[0].category_name
          this.currentId = list[0].category_id
        }
      })
    },
    tabtap (item) {
      console.log('点击的分类：', item.category_id)
      this.currentName = item.category_name
      this.currentId = item.category_id
    },
    _CheckCacheTime (times, xs = 5) {
      const time = Date.parse(new Date()) / 1000 //当前时间
      const end_time = times + 60 * xs
      return time > end_time ? true : false
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

    },
    classify () {
      uni.navigateTo({
        url: '/pages/extend-view/productList/productList'
      })
    },
    more: function (e) {
      let key = e.currentTarget.dataset.key || ""
      uni.navigateTo({
        url: '/pages/extend-view/productList/productList?searchKey=' + key
      })

    },
    search () {
      uni.navigateTo({
        url: '/pages/extend-view/news-search/news-search'
      })
    },
    jump_article (id, type) {
      if (!type) {
        return
      }
      let url = '/pages/article/article?id=' + id
      if (type == 'goods') {
        url = '/pages/extend-view/productDetail/productDetail?id=' + id
      }
      uni.navigateTo({
        url: url
      })
    },
    tosearch (item) {
      uni.navigateTo({
        url: '../extend-view/productList/productList?key=' + item
      })
    },
    navToList (sid) {
      const cid = this.currentId
      uni.navigateTo({
        url: `/pages/extend-view/productList/productList?cid=${cid}&sid=${sid}`
      })
    },
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
  width: 100%;
  margin-bottom: 4%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12rpx;
  overflow: hidden;

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
  width: 320rpx;
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
.s-list {
  width: 100%;
  background: #fff;
}
.t-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  padding-top: 12upx;

  &:after {
    content: '';
    flex: 99;
    height: 0;
  }
}
.t-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 176upx;
  font-size: 26upx;
  color: #666;
  padding-bottom: 20upx;

  image {
    width: 140upx;
    height: 140upx;
  }
}
</style>
