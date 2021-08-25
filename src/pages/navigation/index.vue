<template>
  <view class="wh-100s wx-globle-bg">
    <view class="padding-t-10">
      <view v-for="(items, index) of navigation" :key="index" class="wx-card-bg padding-12 margin-b-10">
        <view class="title padding-t-10 padding-b-10">{{ items.name }}</view>
        <view class="padding-t-6 padding-b-6 flex">
          <view
            v-for="(item, i) of items.child"
            :key="i"
            class="w-25s center"
            @click="handleClick(item.path)"
          >
            <image :src="item.url" class="wh-24"></image>
            <view class="padding-5 text-12">{{ item.title }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navigation: [{
        name: "销售管理",
        child: [{
          id: 1,
          url: "../../static/img/imgs/standard_order.png",
          title: "标准开单",
          path: "/core/standard/index",
        }, {
          id: 2,
          url: "../../static/img/imgs/deposit_order.png",
          title: "定金订单",
          path: "/core/deposit/depositOrder",
        }, {
          id: 3,
          url: "../../static/img/imgs/sales_query.png",
          title: "销售查询",
          path: "/core/salesInquiry/index",
        }, {
          id: 4,
          url: "../../static/img/imgs/receiving_query.png",
          title: "收款查询",
          path: "/core/receivingQuery/index",
        }]
      }, {
        name: "商品管理",
        child: [{
          id: 5,
          url: "../../static/img/imgs/goods_query.png",
          title: "商品查询",
          path: "/core/commodityManagement/list",
        }, {
          id: 6,
          url: "../../static/img/imgs/new_goods.png",
          title: "商品新增",
          path: "/core/commodityManagement/addCommodity?id=-1",
        }, {
          id: 7,
          url: "../../static/img/imgs/price_nquiry.png",
          title: "价签打印查询",
          path: "/core/priceTag/index",
        }, {
          id: 8,
          url: "../../static/img/imgs/price_printing.png",
          title: "价签打印申请",
          path: "/core/priceTag/edit",
        }]
      }, {
        name: "返款对账",
        child: [{
          id: 9,
          url: "../../static/img/imgs/check_query.png",
          title: "对账查询",
          path: "/core/checkQuery/index",
        }]
      }]
    };
  },
  methods: {
    handleClick(path) {
      uni.navigateTo({
        url: path,
      });
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  font-weight: bold;
}
</style>