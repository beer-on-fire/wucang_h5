<template>
  <view class="evaluate">
    <!-- <view style="position: absolute;top:45%;left:45%;"><van-loading size="50px" v-if="shua" /></view> -->

    <!-- <view class='btn'>
		  <view class='btn_1'><van-button plain type="primary" size="small">全部</van-button></view>
		  <view class='btn_1'><van-button plain type="danger" size="small">有图</van-button></view>
		</view> -->
    <tui-tabs :tabs="navbar"
      :currentTab="currentTab>1?0:currentTab"
      @change="change"
      itemWidth="50%"
      selectedColor="#FF7900"
      sliderBgColor="#FF7900"></tui-tabs>
    <None v-if="list_empty"></None>
    <view v-for="(item, index) of list"
      :key="index"
      v-else>
      <block v-if="currentTab == 0 ">
        <view class='con'>
          <view class='con_1'>
            <view class='con_1_l'>
              <img :src='item.headpic' />
              <view class='name'>{{item.nickname}}<span></span>
                <!-- <view class='cu-tag bg-orange sm'>VIP</view> -->
                <view class='con_1_r'>{{item.create_time}}</view>
              </view>
            </view>
            <view class='con_1_r'>
              <view class="ping">
                <tui-rate :current="item.rate"
                  @change="changedd"
                  active="#F37B1D"
                  :disabled="true"></tui-rate>
              </view>
            </view>
          </view>
          <view class='con_2'>
            {{item.content}}
            <view class="img">
              <block v-for="(x,y) of item.imgs"
                :key="y"
                v-if="y<9">
                <img :src="getimg + x"
                  @click="ViewImage(index,y)"></img>
              </block>
            </view>
          </view>

          <view class="reply"
            v-if="item.reply_content!=null">商家回复：</br>
            <view style="margin-left: 20px;padding: 10px;">
              {{item.reply_content}}
            </view>
          </view>

        </view>
      </block>
      <block v-if="currentTab == 1 && item.imgs.length > 0">
        <view class='con'>
          <view class='con_1'>
            <view class='con_1_l'>
              <img :src='item.headpic' />
              <view class='name'>{{item.nickname}}<span></span>
                <!-- <view class='cu-tag bg-orange sm'>VIP</view> -->
                <view class='con_1_r'>{{item.create_time}}</view>
              </view>
            </view>
            <view class='con_1_r'>
              <view class="ping">
                <tui-rate :current="item.rate"
                  @change="changedd"
                  active="#F37B1D"
                  :disabled="true"></tui-rate>
              </view>
            </view>
          </view>
          <view class='con_2'>
            {{item.content}}
            <view class="img">
              <block v-for="(x,y) of item.imgs"
                :key="y"
                v-if="y<9">
                <img :src="getimg + x"
                  @click="ViewImage(index,y)"></img>
              </block>
            </view>
          </view>
          <view class="reply">商家回复：</br>
            <view style="margin-left: 20px;padding: 10px;">
              {{item.reply_content}}
            </view>
          </view>
        </view>
      </block>
      <view class='H10'></view>
    </view>

  </view>
</template>

<script>
import {
  Api_url
} from '@/common/config'
import None from "@/components/qy/none.vue"
import tuiTabs from "@/components/tui-tabs/tui-tabs"
import tuiRate from "@/components/rate/rate"
import productModel from '@/model/product.js'
export default {
  data () {
    return {
      getimg: this.$getimg,
      currentTab: 0,
      navbar: [{
        name: "全部"
      }, {
        name: "有图"
      }],
      shua: true,
      list_empty: false,
      id: '',
      //rate_fen:this.$route.query.fen
      list: '',
      current: 5,
      index: 5,
      img: [require('@/imgs/8.jpg'), require('@/imgs/8.jpg'), require('@/imgs/8.jpg'), require('@/imgs/8.jpg'),
      require('@/imgs/8.jpg'), require('@/imgs/8.jpg'), require('@/imgs/8.jpg'), require('@/imgs/8.jpg'), require(
        '@/imgs/8.jpg')
      ]
    }
  },
  components: {
    tuiTabs,
    tuiRate,
    None
  },
  onLoad (options) {
    this.id = options.id
    this._load()
  },
  methods: {
    _load () {
      // this.$api.http.get('product/get_evaluate?id=', {
      // 	id: this.id
      // }).then(res => {
      productModel.getEvalutes(this.id).then(res => {
        console.log('评价：', res.data)
        if (!res.data.length) {
          this.list_empty = true
        } else {
          this.list = res.data
        }
        console.log(this.list)
      })
    },
    change (e) {
      this.currentTab = e.index

    },
    changedd: function (e) {
      this.index = e.index
      this.current = e.index
    },
    ViewImage (index, y) {
      let arr = []
      const getimg = this.getimg
      let x = 0
      for (let item of this.list[index].imgs) {
        arr[x] = getimg + item
        x++
      }
      uni.previewImage({
        urls: arr,
        current: y
      })
    }
  },
  onPullDownRefresh () {
    this._load()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 2000)
  }
}
</script>

<style lang="less">
.evaluate {
  background-color: #f0f0f0;
  min-height: 100vh;
  font-size: 14px;

  .zhpf {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .zhpf_l {
    display: flex;
  }

  .zhpj_l_01 {
    padding: 5px 10px 0 0;
  }

  .zhpf_r {
    color: #ffb91e;
    padding-top: 5px;
  }

  .H10 {
    height: 10px;
  }

  .btn {
    padding: 0 10px 10px;
    background-color: #fff;
    display: flex;
  }

  .btn_1 {
    padding-right: 10px;
  }

  .con {
    background-color: #fff;
    padding: 10px;
  }

  .con_1 {
    display: flex;
    justify-content: space-between;
  }

  .con_1_l {
    display: flex;
    line-height: 20px;
  }

  .con_1_l img {
    height: 40px;
    width: 40px;
    border-radius: 30px;
    margin-right: 10px;
  }

  .name {
    font-size: 16px;

    span {
      padding-left: 5px;
    }
  }

  .con_1_r {
    color: #b3b3b3;
    font-size: 12px;
  }

  .ping {
    padding-top: 5px;
  }

  .con_2 {
    padding: 5px 0px 10px 50px;

    .img {
      padding-top: 8px;

      img {
        width: 24vw;
        height: 19vw;
        border-radius: 5px;
        margin: 0 2vw 10px 0;
      }
    }
  }
}
</style>
