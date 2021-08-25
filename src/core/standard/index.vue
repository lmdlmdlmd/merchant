<template>
  <view class="wh-100s">
    <!-- tab -->
    <view class="w-100s">
      <scroll-view scroll-x class="nav">
        <view class="flex">
          <view
            class="cu-item flex-sub pos-rel item"
            :class="currentTab == item.id ? 'active' : ''"
            v-for="(item, index) in tabs"
            :key="index"
            @tap="tabSelect(item)"
          >
            <text>{{ item.name }}</text>
            <view class="lineParent">
              <view :class="currentTab == item.id ? 'line' : ''"></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="w-100s wx-globle-bg" style="height: calc(100% - 35px)">
      <scroll-view
        scroll-y
        class="wh-100s"
        @scroll="mainScroll"
        :scroll-into-view="scrollInto"
      >
        <view class="padding-16">
          <view id="item-0" class=" main-item">
            <!-- 用户信息 -->
            <CustomerInfo></CustomerInfo>
          </view>
          <view id="item-1" class=" main-item">
            <!-- 商品信息 -->
            <GoodsInfo></GoodsInfo>
          </view>
          <view id="item-2" class=" main-item">
            <TotalInfo></TotalInfo>
          </view>
          <view id="item-3" class=" main-item">
            <button></button>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import CustomerInfo from './components/customerInfo.vue';
import GoodsInfo from './components/goodsInfo.vue';
import TotalInfo from './components/totalInfo.vue';

export default {
  data() {
    return {
      tabs: [{
        id: 0,
        name: '顾客信息'
      }, {
        id: 1,
        name: '商品信息'
      }, {
        id: 2,
        name: '金额信息'
      }, {
        id: 3,
        name: '订单确认'
      }],
      currentTab: 0,
      scrollInto: ''
    };
  },
  components: {
    CustomerInfo,
    GoodsInfo,
    TotalInfo
  },
  methods: {
    tabSelect(item) {
      this.currentTab = item.id;
      this.scrollInto = `item-${item.id}`;
    },
    mainScroll(e) {
      const top = e.detail.scrollTop;
      let index = 0;
      new Promise((resolve, reject) => {
        const view = uni.createSelectorQuery().selectAll(".main-item");
        view.boundingClientRect((data) => {
          resolve(data);
        }).exec();
      }).then((res) => {
        for (let i = res.length - 1; i >= 0; i--) {
          let heightTop = 0;
          for (let j = 0; j < i; j++) {
            heightTop += res[j].height;
          }
          if (top + 2 >= heightTop) {
            index = res[i].id.slice(5, 6);
            break;
          }
        }
        this.currentTab = index < 0 ? 0 : index;
      });
    }
  }
}
</script>

<style lang="less" scoped>

</style>
