<template>
  <view>
    <!-- 地址 -->
    <navigator url="/pages/address/address?source=1"
      class="address-section"
      v-if="address_show">
      <view class="order-content">
        <text class="yticon icon-shouhuodizhi"></text>
        <view class="cen"
          v-if="address">
          <view class="top">
            <text class="name">{{address.name}}</text>
            <text class="mobile">{{address.mobile}}</text>
          </view>
          <text class="address">{{address.province}} {{address.city}}{{address.county}}</text>
        </view>
        <text class="yticon icon-you"></text>
      </view>

    </navigator>
    <view class="H10"
      v-if="is_kai != 1 && is_pt == 1"></view>
    <view class="tuanzhang"
      v-if="is_kai != 1 && is_pt == 1">
      <view class="tz-l">
        <checkbox-group>
          <label>
            <checkbox value="cb"
              style="transform:scale(0.7)" />
          </label>
        </checkbox-group>
      </view>
      <view class="tz-m">该团由团长代收包裹（免运费）</view>
      <view class="tz-r">团长：123</view>
    </view>
    <view class="H10"></view>
    <view class="uni-list">
      <radio-group @change="radioChange">
        <label class="uni-list-cell uni-list-cell-pd"
          v-if="switch_list.drive_type==1 || switch_list.drive_type==2 || switch_list.drive_type==3">
          <view class="tuanzhang">
            <view class="tz-l">
              <radio value="1"
                style="transform:scale(0.7)" />
            </view>
            <view class="tz-m">快递配送</view>
            <view class="tz-r"></view>
          </view>
        </label>
        <label class="uni-list-cell uni-list-cell-pd"
          v-if="switch_list.drive_type==2 || switch_list.drive_type==3">
          <view class="tuanzhang">
            <view class="tz-l">
              <radio value="2"
                style="transform:scale(0.7)" />
            </view>
            <view class="tz-m">同城配送</view>
            <view class="tz-r"></view>
          </view>
        </label>
        <label class="uni-list-cell uni-list-cell-pd"
          v-if="switch_list.drive_type==1 || switch_list.drive_type==3">
          <view class="tuanzhang">
            <view class="tz-l">
              <radio value="3"
                style="transform:scale(0.7)" />
            </view>
            <view class="tz-m">到店自提</view>
            <view class="tz-r"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view class="ztdz"
      v-if="kuaidi==3">
      {{switch_list.zt_address}}
    </view>
    <view class="goods-section">
      <!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
      <!-- 商品列表 -->
      <view class="g-item"
        v-for="(item,index) of buy_data"
        :key="index">
        <image :src="getimg + item.imgs"></image>
        <view class="right">
          <text class="title clamp">{{item.goods_name}}</text>
          <text class="spec">{{item.sku_name?item.sku_name:''}}</text>
          <view class="price-box">
            <!-- <text class="price" v-if="item.vip_price && !item.discount">￥{{item.price - item.vip_price}}</text>
						<text class="price" v-if="item.vip_price && item.discount">￥{{item.price}}</text>
						<text class="price" v-if="!item.vip_price && !item.discount">￥{{item.price}}</text>
						<text class="number">x {{item.num}}</text> -->
          </view>
        </view>
      </view>

    </view>

    <view class="yt-list"
      v-if="is_pt == 1">
      <view class="jr">
        <view class="jr_tit">为您加入仅差1人的团，支付后即可拼购成功</view>
        <view class="jr_img">
          <view class="img_01 img_01_border">
            <img :src="pt_data.c_pic"
              alt="团长"></img>
            <view class="zhicheng">团长</view>
          </view>
          <view class="img_01"
            v-for="item of pt_data.item_pic">
            <img :src="item"
              alt="成员"></img>
          </view>
          <view class="img_01">
            <img :src="head.avatarUrl"
              alt="我"></img>
            <view class="zhicheng">待支付</view>
          </view>
        </view>
      </view>
    </view>

    <view class="yt-list"
      v-if="is_kai == 1">
      <view class="jr">
        <view class="jr_tit">立即支付，即可开团成功</view>
        <view class="jr_img">
          <view class="img_01 img_01_border">
            <img :src="head.avatarUrl"
              alt="我"></img>
            <view class="zhicheng">待支付</view>
          </view>
          <view class="img_01 img_01_borderx"
            v-for="(item,index) of buy_data[0].pt.pt.user_num-1"
            :key="index">
            ?
          </view>
        </view>
      </view>
    </view>

    <!-- 优惠明细 -->
    <view class="yt-list"
      v-if="buy_data.length&&!buy_data[0]['discount']&&!buy_data[0]['pt']">
      <view class="yt-list-cell b-b"
        @click="toggleMask('show')">
        <view class="cell-icon">
          券
        </view>
        <text class="cell-tit clamp">红包</text>

        <text class="cell-tip active">
          {{coupon_text}}
        </text>
        <text class="cell-more wanjia wanjia-gengduo-d"></text>
      </view>
      <!-- <view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">暂无可用优惠</text>
			</view> -->
    </view>

    <!-- 金额明细 -->
    <view class="yt-list">
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">商品金额</text>
        <text class="cell-tip">￥{{goods_money | count_price(goods_money)}}</text>
      </view>
      <view class="yt-list-cell b-b"
        v-if="coupon_money>0">
        <text class="cell-tit clamp">优惠金额</text>
        <text class="cell-tip red">-￥{{coupon_money}}</text>
      </view>
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">运费</text>
        <text class="cell-tip"
          v-if="yunfei_money">￥ {{yunfei_money}}</text>
        <text class="cell-tip"
          v-else>免运费</text>
      </view>
      <!-- <view class="yt-list-cell b-b" @click="jump_invoices" v-if="invoice_switch">
				<text class="cell-tit clamp">发票</text>
				<text class="cell-tip" >不开发票</text>
				<text class="yticon icon-you"></text>
			</view> -->
      <!-- -------------------------------------------万能表单组件 -->
      <view style="margin-top: 20px;"
        v-if="form_switch">
        <Formt ref="child"
          :data_form="data_form"
          @get_data="get_data"
          :kg="kg"></Formt>
        <!-- <Formt :data_form="data_form" :farther_fun="get_data"></Formt> -->
      </view>
      <!-- -------------------------------------------万能表单结束 -->

      <view class="yt-list-cell desc-cell">
        <text class="cell-tit clamp">备注</text>
        <input class="desc"
          type="text"
          v-model="obj.msg"
          placeholder="请填写备注信息"
          placeholder-class="placeholder" />
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <view class="price-content">
        <text>实付款</text>
        <text class="price-tip">￥</text>
        <!-- <text class="price">{{pay_money.toFixed(2)}}</text> -->
        <text class="price">{{pay_money | count_price()}}</text>
      </view>
      <text class="submit"
        @click="submit">提交订单</text>
    </view>

    <!-- 红包面板 -->
    <view class="mask"
      :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''"
      @click="toggleMask">
      <view class="mask-content">
        <!-- 红包页面，仿mt -->
        <scroll-view class="scroll"
          scroll-y
          v-if="couponList.length">
          <view class="coupon-item"
            v-for="(item,index) in couponList"
            :key="index">
            <block v-if="item.status == 0">
              <view class="con">
                <view class="left">
                  <text class="title"
                    v-if="item.full==0">减{{item.reduce}}</text>
                  <text class="title"
                    v-else>满{{item.full}} 减{{item.reduce}}</text>
                  <!-- <text class="time"></text> -->
                </view>
                <view class="right">
                  <text class="price">{{item.reduce}}</text>
                  <!-- <text>满{{item.full}}可用</text> -->
                </view>

                <view class="circle l"></view>
                <view class="circle r"></view>
              </view>
              <view class="use"
                style="display: flex;justify-content: space-between;">
                <text class="tips">有效期至{{item.end_time}}</text>
                <view class="tips2"
                  v-if="item.full*1 <= goods_money*1"
                  @click="to_use(index)">去使用</view>
                <view class="tips3"
                  v-else>不可用</view>
              </view>
            </block>
          </view>
        </scroll-view>
        <div v-else
          style="text-align:center;">暂无可用红包</div>
        <view class="btn"
          @click="cancel_use">不使用红包</view>
      </view>
    </view>

    <!-- 购买前的提示，不需要可以删除 -->
    <view class="tan"
      v-if="xieyi">
      <div class="black">
        <!-- 弹窗蒙层 -->
        <div class="container"></div>
      </div>
      <view class="t_con">
        <view class="t_c_con">
          <rich-text :nodes="content"></rich-text>
        </view>

        <view class="t_c_btn">
          <view class="t_c_btn_01 bg_gery"
            @click="xy_approve(false)">不同意</view>
          <view class="t_c_btn_01 bg_red"
            @click="xy_approve(true)">同意</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import Formt from '@/components/form_data/form_data.vue'
import {
  CUser
} from '@/common/cache/user.js'
import productModel from '@/model/product.js'
import orderModel from '@/model/order.js'
var cache_user = new CUser()
export default {
  data () {
    return {
      address_show: false,
      form_switch: '',
      kuaidi: 0,
      kg: 0,
      data_form: [],
      goods_money: 0,
      content: '演示商品，请勿购买。如需测试支付功能，购买后不发货不退款',
      xieyi: false, //购买前的弹窗提示 
      sku_id: '',
      head: '',
      is_kai: 0,
      pid: '',
      is_pt: 0,
      pt_data: '',
      coupon_id: 0,
      save_cache: {},
      order_id: 0,
      getimg: this.$getimg,
      maskState: 0, //红包面板显示状态
      desc: '', //备注
      payType: 1, //1微信 2支付宝
      yunfei_money: 0, //运费
      couponList: [],
      addressData: {},
      state: '',
      buy_data: '',
      address: '',
      paying: '', //防止多次提交订单
      coupon_text: '选择红包',
      coupon_money: 0, //优惠金额		
      switch_list: '',
      obj: {
        msg: "",
        order_from: "xcx",
        payment_type: "wx",
        total_price: "",
        shoping_price: "",
        coupon_price: "",
        coupon_id: 0,
        discount: "",
        switch_list: '',
        invoice_switch: false,
        drive_type: '',
        other: ''
      },
      wnlist: '',
      sys_switch: ''

    }
  },
  components: {
    Formt
  },
  async onLoad (option) {
    this.sys_switch = uni.getStorageSync('switch')
    this.form_switch = this.sys_switch.is_form == 1 ? true : false
    this.state = option.state
    await this.prmSwitch()
    this.check_switch()
    if (option.state == 'buy') {
      let buy_data = uni.getStorageSync('buy')
      console.log('直接购买的商品信息：', buy_data)
      if (this.form_switch) {
        this.get_wn_data()
      }
      this.buy_data = buy_data

      //判断商品实虚  是否显示地址
      for (let k in buy_data) {
        let v = buy_data[k]
        if (v.style == 0) {
          this.address_show = true
          break
        } else {
          this.address_show = false
          break
        }
      }
    }
    if (option.state == 'car') {
      let buy_data = uni.getStorageSync('cart')
      console.log('购物车里的商品信息：', buy_data)
      let arr = []
      let cache = {}
      let x = 0
      for (let k in buy_data) {
        const v = buy_data[k]
        if (v.radio) {
          arr[x] = v //购物车中选中的商品
          x++
        } else {
          cache[k] = v //购物车未选中的商品 
        }
      }
      this.buy_data = arr

      this.save_cache = cache
      //判断商品实虚  是否显示地址
      for (let k in buy_data) {
        let v = buy_data[k]
        if (v.style == 0) {
          this.address_show = true
          break
        }
      }
    }
    // if(this.buy_data[0].goods_name=="吾仓集市-授权"){				
    // 	this.$api.http.get('index/get_file?type=3').then(res => {
    // 		this.content = res
    // 		this.xieyi=true
    // 	})	
    // }
    let id = uni.getStorageSync('pid')
    if (id) {
      this.pid = id
      this.is_pt = 1
      this.get_pid(id)
    }
    const my = cache_user.info()
    this.head = {
      avatarUrl: my.headpic
    }
    this.is_kai = uni.getStorageSync('is_kai')
    this._load()
    this.js_goods_money()
    this.$api.http.get('address/get_default_address').then(res => {
      // orderModel.getAddressDefault().then(res=>{
      this.address = res.data
    })
    //商品数据s
    //let data = JSON.parse(option.data);
    //console.log(data);
  },
  onShow () {
    this.$api.http.get('address/get_default_address').then(res => {
      // orderModel.getAddressDefault().then(res=>{
      console.log("默认的寄件地址", res.data)
      this.address = res.data
    })

    this.get_yunfei()
  },
  computed: {
    //订单应付金额
    pay_money () {
      console.log('应付金额', this.goods_money, this.yunfei_money, this.coupon_money)
      let money = this.goods_money + this.yunfei_money - this.coupon_money
      if (money <= 0) {
        return 0
      }
      return money
    },

  },
  methods: {
    async prmSwitch () {
      this.switch_list = await this.promise_switch.then(res => {
        return res
      })
      return this.switch_list
    },
    //获取vip
    get_user_vip_status () {
      let vip_status = uni.getStorageSync('my')
      if (vip_status.data && vip_status.data.vip && vip_status.data.vip.status == 1) return true
      return false
    },
    radioChange (e) {
      this.kuaidi = e.detail.value
      if (this.kuaidi == 1) {
        this.obj.drive_type = '快递'
      }
      if (this.kuaidi == 2) {
        this.obj.drive_type = '同城'
      }
      if (this.kuaidi == 3) {
        this.obj.drive_type = '自提：' + this.switch_list.zt_address
      }
    },
    get_data (e) {
      this.obj.other = JSON.stringify(e)
    },
    //计算所有商品金额
    js_goods_money () {
      const buy = this.buy_data
      console.log('vip状态：', this.get_user_vip_status())
      let total = 0
      for (let k in buy) {
        const v = buy[k]
        if (v.discount) {
          total += v.price * v.num
        } else {
          if (this.get_user_vip_status() && v.vip_price) {
            total += (v.price - v.vip_price) * v.num
          } else {
            total += v.price * v.num
          }
        }
        /* if(v.vip_price){
          total = total - v.vip_price
        } */
      }
      console.log('总价', total)
      this.goods_money = total
    },
    async check_switch () {
      const that = this
      await this.prmSwitch()

      that.invoice_switch = this.switch_list.is_invoice == 1 ? true : false
    },
    _load () {
      this.$api.http.get('coupon/user/get_coupon').then(res => {
        console.log('红包列表：', res)
        // orderModel.getOrderUserCoupon().then(res=>{
        this.couponList = res.data
      })
      this.get_yunfei()
    },
    jump_invoices () {
      uni.navigateTo({
        url: '/pages/invoices/invoices',
      })
    },
    get_pid (id) {
      // this.$api.http.get('pt/get_one_item', {
      // 	id: id
      // }).then(res => {
      orderModel.getPtOneItem(id).then(res => {
        console.log('拼团成员：', res)
        this.pt_data = res.data
        uni.removeStorageSync('pid')
      })
    },
    //判断商品中是否有分销商品
    check_fx_pro () {
      const buy = this.buy_data
      let fx_swtich = false
      for (let k in buy) {
        const v = buy[k]
        if (v.is_fx) {
          fx_swtich = true
        }
      }
      console.log("是否为分销订单：", fx_swtich)
      return fx_swtich
    },
    //获取运费
    get_yunfei () {
      console.log('运费计算：', this.buy_data)
      const buy_data = this.buy_data
      let obj = []
      for (let k in buy_data) {
        const v = buy_data[k]
        obj[k] = {}
        obj[k]['goods_id'] = v.goods_id
        obj[k]['num'] = v.num
      }
      this.$api.http.post('product/get_shipment_price', obj).then(res => {
        // productModel.postProductSimPrice(obj).then(res=>{
        this.yunfei_money = res.data
      })
    },
    //显示红包面板
    toggleMask (type) {
      let timer = type === 'show' ? 10 : 300
      let state = type === 'show' ? 1 : 0
      this.maskState = 2

      setTimeout(() => {
        this.maskState = state
      }, timer)

    },
    //使用红包
    to_use (index) {
      this.maskState = 0
      this.coupon_id = this.couponList[index].id ? this.couponList[index].id : 0
      const reduce = this.couponList[index].reduce
      this.coupon_money = reduce
      this.coupon_text = '已优惠' + reduce + '元'
    },
    //取消使用红包
    cancel_use () {
      this.maskState = 0
      this.coupon_id = 0
      this.coupon_money = 0
      this.coupon_text = '选择红包'
    },
    numberChange (data) {
      this.number = data.number
    },
    changePayType (type) {
      this.payType = type
    },

    //设置订单数据
    set_order_data () {
      const that = this
      let obj = this.obj
      obj.discount = 0

      for (let k in that.buy_data) {
        const v = that.buy_data[k]

        if (v.discount && v.discount != "[]") {
          obj.discount = 1
        }
      }
      obj.total_price = this.pay_money
      obj.shoping_price = this.yunfei_money
      obj.coupon_price = this.coupon_money
      obj.coupon_id = this.coupon_id
      obj.goods_id = this.buy_data[0].goods_id

      obj.price = this.buy_data[0].price * this.buy_data[0].num
      obj.num = this.buy_data[0].num
      obj.order_from = 0


      // #ifdef H5
      obj.payment_type = 'wx'
      // #endif
      // #ifdef MP-WEIXIN
      obj.payment_type = 'xcx'
      // #endif


      if (this.get_user_vip_status()) {
        obj.price = (this.buy_data[0].price - this.buy_data[0].vip_price) * obj.num

      }

      //商品中有分销商品，则提交分销身份码
      const level_one = uni.getStorageSync('level_one')
      if (this.check_fx_pro() && level_one) {
        obj.sfm = level_one
      }

      if (this.buy_data[0].pt) {
        obj.is_captain_sign = 1
      }
      this.is_item = uni.getStorageSync('is_item')
      if (this.is_item) {
        obj.item_id = this.pt_data.id
        uni.removeStorageSync('is_item')
      }
      let pro = this.buy_data
      let sku = {}
      for (let k in pro) {
        const v = pro[k]
        let name = v.goods_id
        if (v.sku) {
          name = v.goods_id + '-' + v.sku.id
          this.sku_id = v.sku.id
        }
        sku[name] = v
        sku[name].sku_id = 0
        if (v.sku) {
          sku[name].sku_id = v.sku.id
        }
        delete sku[name].radio
        delete sku[name].sku
        delete sku[name].sku_name
        delete sku[name].goods_name

      }
      obj.json = sku
      return obj
    },

    check_sub_data () {
      if (this.address_show && !this.address) {
        this.$api.msg('未填写地址')
        return
      }
      if (this.paying) return

      let url = ''
      //#ifdef MP-WEIXIN || APP-PLUS
      url = 'order/create'
      //#endif
      //#ifdef H5
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        url = 'order/create_cart'
      } else {
        url = 'order/create'
      }
      //#endif
      console.log('创建订单请求的url:', url)
      return url
    },
    xy_approve (e) {
      this.xieyi = false
      if (!e) {
        uni.navigateBack({})
        return
      }
    },
    //创建订单
    async submit () {
      if (this.pay_money == 0) {
        this.$api.msg('价格错误', this.pay_money)
        return
      }
      //万能表单，不知道写的什么
      if (this.sys_switch.is_form == 1) {
        this.$refs.child.get_form()
      }

      let is_pin = uni.getStorageSync('is_item')
      uni.removeStorageSync('is_item')
      const url = this.check_sub_data()
      if (!url) return

      let obj = this.set_order_data()

      if (this.switch_list.drive_type > 0 && (!obj.drive_type || obj.drive_type == '')) {
        this.$api.msg('请选择配送方式')
        return
      }
      console.log('创建订单入参:', obj)
      if (this.sku_id == '') {
        obj.sku_id = 0
      } else {
        obj.sku_id = this.sku_id
      }
      let order_json = ''
      if (this.is_kai == 1) {
        obj.is_captain_sign = 1
        //团长下单
        order_json = await this.$api.http.post('pt/create_pt_item', obj).then(res => (res))
        // order_json = await orderModel.postPtCreateItem(obj).then(res => (res))
      } else if (is_pin == 1) {
        obj.item_id = this.pid
        obj.is_captain_sign = 1
        //团员下单
        order_json = await this.$api.http.post('pt/create_pt', obj).then(res => (res))
        // order_json = await orderModel.postPtCreateItems(obj).then(res => (res))
      } else {
        //普通下单
        order_json = await this.$api.http.post(url, obj).then(res => (res))
      }
      this.paying = true
      if (!order_json.data) {
        this.$api.msg(order_json.msg)
        setTimeout(() => {
          uni.navigateBack({})
        }, 1000)
        return
      }
      this.order_id = order_json.data || order_json

      if (this.state == 'buy') {
        uni.removeStorageSync('buy')
      } else {
        uni.removeStorageSync('cart')
        uni.setStorageSync('cart', this.save_cache)
      }
      const order_id = order_json.data
      this.order_id = order_id

      //#ifdef MP-WEIXIN
      // const pay_data = await this.$api.http.post('order/pay/pre_order', {
      // 	id: order_id
      // }).then(res => {
      const pay_data = await orderModel.postOrderWxPay(order_id).then(res => {
        console.log('小程序支付:', res)
        return res
      })
      await this.pay(pay_data)
      //#endif

      //#ifdef APP-PLUS 
      // const app_data = await this.$api.http.post('order/pay/pre_app', {
      // 	id: order_id
      // }).then(res => {
      const app_data = await orderModel.postOrderAppPay(order_id).then(res => (res))
      await this.app_pay(app_data)
      //#endif

      //#ifdef H5
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        /* const pay = await this.$api.http.post('order/second_pay', {
          id: this.order_id
        }).then(res => {
          console.log('pay:', res)
          return res
        }) */
        console.log("微信浏览器支付：", this.order_id)
        this.wxPay(this.order_id)
      } else {
        uni.reLaunch({
          url: 'pay?order_num=' + this.order_id
        })
      }
      //#endif
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
      let state = 0
      console.log("公众号支付")
      WeixinJSBridge.invoke("getBrandWCPayRequest", json, function (res) {
        WeixinJSBridge.log('a:', res.err_msg)
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          state = 2
          that.$api.msg("支付成功!")
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          state = 1
          that.$api.msg("取消支付")
        } else {
          state = 1
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
            url: '/pages/order/order?state=' + state
          })
        }, 1000)
      })
    },
    //小程序支付
    pay (data) {
      const order_id = this.order_id
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
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
    get_wn_data () {
      let type = 2
      let i = 0,
        j = 0
      let options = []
      let opdata
      let data = []
      this.$api.http.get('wntable/getbytype', type).then(res => {
        this.data_form = res.data
        console.log("dataform")
        console.log(this.data_form)
        console.log("dataform")
      })
    },
    diy_form () {
      this.get_wn_data()
      /* this.data_form=[
          {
            type: "radio",
            desc: "自定义选择",
            default: "",
            show: false,
            option: [{
              value: '0',
              name: "惊雷",
              default: 1
            }, {
              value: '1',
              name: "无情"
            }],
            name: "sex"
          },
          {
            type: "date",
            desc: "配送日期",
            default: "",
            show: true,
            options: "2020-05-06",
            name: "dateA"
          }, 
          {
            type: "time",
            desc: "另一种时间",
            default: "xxx",
            show: true,
            options: "",
            name: "timeA"
          },
          {
            type: "switch",
            desc: "是否开关",
            default: "xxx",
            show: true,
            options: "",
            name: "switchA"
          },
        	
               {
                type: "input",
                desc: "输入框",
                default: "测试",
                show: true,
                options: "",
                name: "nameA"
              },
           {
            type: "check",
            desc: "多选套餐",
            default: "",
            show: false,
            option: [{
              value: 0,
              name: "套餐A"
            }, {
              value: 1,
              name: "套餐B"
            }, {
              value: 2,
              name: "套餐C"
            }],
            name: "checkA"
          },
          {
            type: "select",
            desc: "下拉选择",
            default: "请选择",
            show: true,
            options: [
              '中国',
              '日国',
              '韩国',
              '美国',
            ],
            name: "selectA"
          },
          {
            type: "address",
            desc: "其他地址",
            default: "请选择",
            show: true,
            options: [],
            name: "address"
          },
        ] */
    }
  },
  onPullDownRefresh () {
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

.black {
  .container {
    background-color: #000000;
    position: fixed;
    top: 0;
    opacity: 0.6;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
}

.t_con {
  background-color: #fff;
  position: fixed;
  top: 120px;
  left: 10%;
  width: 80%;
  padding: 20px;
  border-radius: 5px;
  z-index: 1999;
  overflow: hidden;

  .t_c_tit {
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    padding-bottom: 10px;
  }

  .t_c_con {
    font-size: 14px;
    max-height: 280px;
    min-height: 120px;
    overflow-y: scroll;
    width: 100%;
    overflow-x: hidden;
  }

  .t_c_more {
    text-align: center;
    color: #868686;
    padding: 15px 0 10px;
    font-size: 14px;

    span {
      color: #4b73ce;
    }
  }

  .t_c_btn {
    display: flex;
    justify-content: space-between;

    .t_c_btn_01 {
      height: 35px;
      line-height: 35px;
      color: #fff;
      border-radius: 20px;
      text-align: center;
      width: 47%;
      font-size: 14px;
      margin-top: 10px;
    }

    .bg_red {
      background-color: #ff7900;
    }

    .bg_gery {
      background-color: #cccccc;
    }
  }
}

.H10 {
  height: 10px;
}

.ztdz {
  padding: 10px 0 10px 20px;
  color: #777;
  background-color: #fff;
  font-size: 14px;
}

.tuanzhang {
  background: #fff;
  padding: 3px 10px;
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

.jr {
  padding: 10px;
  font-size: 14px;

  .jr_tit {
    font-weight: 600;
    text-align: center;
    padding-bottom: 10px;
  }

  .jr_img {
    display: flex;
    justify-content: center;

    .img_01 {
      position: relative;
      border-radius: 50%;
      margin: 0 7px;
      width: 44px;
      height: 44px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .zhicheng {
        position: absolute;
        bottom: -5px;
        left: 0;
        background-color: #e93b3d;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        width: 40px;
        text-align: center;
      }
    }

    .img_01_border {
      border: 2px solid #e93b3d;
    }

    .img_01_borderx {
      border: 2px dashed #e6e6e6;
      text-align: center;
      line-height: 44px;
      color: #e6e6e6;
    }
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
  padding-top: 10px;

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
    padding: 20px 0px 60px;
    background: #f3f3f3;
    transform: translateY(100%);
    transition: 0.3s;
    overflow-y: scroll;
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 95%;
    text-align: center;
    border: 1px solid #fa436a;
    background-color: #fa436a;
    color: #ffffff;
    border-radius: 20px;
    margin: 10px;
    padding: 5px;
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

.scroll {
  max-height: 55vh;
}

/* 红包列表 */
.coupon-item {
  display: flex;
  flex-direction: column;
  margin: 3upx 24upx;
  background: #fff;

  .con {
    display: flex;
    align-items: center;
    position: relative;
    height: 120upx;
    padding: 0 30upx;

    /* &:after {
				position: absolute;
				left: 0;
				bottom: 10;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			} */
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
    white-space: nowrap;
    padding-left: 30upx;
  }

  .tips2 {
    font-size: 24upx;
    color: $font-color-light;
    line-height: 50upx;
    height: 50upx;
    text-align: center;
    margin: 5upx 10px 0 0;
    width: 80px;
    border: 1px solid #fa436a;
    background-color: #fa436a;
    color: #ffffff;
    border-radius: 25px;
  }

  .tips3 {
    font-size: 24upx;
    color: $font-color-light;
    line-height: 50upx;
    height: 50upx;
    text-align: center;
    margin: 5upx 10px 0 0;
    width: 80px;
    border: 1px solid #c0c0c0;
    background-color: #c0c0c0;
    color: #ffffff;
    border-radius: 25px;
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
