<template>
  <view class="navigationBox">
    <zz-nav-bar title="功能导航" @click-right="rightClick"></zz-nav-bar>

    <view class="content">
      <view class="card_box">
        <view v-for="(items, index) of navigation" :key="index">
          <view class="divider"></view>

          <text class="title">{{ items.name }}</text>
          <view class="nav_body">
            <view
              v-for="(item, i) of items.child"
              :key="i"
              class="nav_box"
              @click="handleClick(item.path)"
            >
              <image :src="item.url" class="nav_img"></image>
              <p class="nav_text">{{ item.title }}</p>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import zzNavBar from "../../components/zz-nav-bar";
export default {
  components: {
    zzNavBar,
  },
  data() {
    return {
      navigation: [
        {
          name: "销售管理",
          child: [
            {
              id: 1,
              url: "../../static/img/imgs/standard_order.png",
              title: "标准开单",
              path: "/pages/navigation/standard/standardOrder",
            },
            {
              id: 2,
              url: "../../static/img/imgs/deposit_order.png",
              title: "定金订单",
              path: "/pages/navigation/deposit/depositOrder",
            },
            {
              id: 3,
              url: "../../static/img/imgs/sales_query.png",
              title: "销售查询",
              path: "/pages/navigation/salesInquiry/index",
            },
            {
              id: 4,
              url: "../../static/img/imgs/receiving_query.png",
              title: "收款查询",
              path: "/pages/navigation/receivingQuery/index",
            },
          ],
        },
        {
          name: "商品管理",
          child: [
            {
              id: 5,
              url: "../../static/img/imgs/goods_query.png",
              title: "商品查询",
              path: "/pages/navigation/commodityManagement/list",
            },
            {
              id: 6,
              url: "../../static/img/imgs/new_goods.png",
              title: "商品新增",
              path: "/pages/navigation/commodityManagement/addCommodity?id=-1",
            },
            {
              id: 7,
              url: "../../static/img/imgs/price_nquiry.png",
              title: "价签打印查询",
              path: "/pages/navigation/priceTag/index",
            },
            {
              id: 8,
              url: "../../static/img/imgs/price_printing.png",
              title: "价签打印申请",
              path: "/pages/navigation/priceTag/edit",
            },
          ],
        },
        {
          name: "返款对账",
          child: [
            {
              id: 9,
              url: "../../static/img/imgs/check_query.png",
              title: "对账查询",
              path: "/pages/navigation/checkQuery/index",
            },
          ],
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    handleClick(path) {
      uni.navigateTo({
        url: path,
      });
      console.log("no error");
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  .card_box {
    font-size: 14px;
    .nav_box {
      padding-bottom: 34px;
    }
    .title {
      width: calc(100% - 48upx);
      margin: 28upx auto 60upx;
      display: block;
      color: rgba(0, 0, 0, 0.8);
    }
    .nav_body {
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .nav_body {
      width: calc(100% - 80upx);
      margin: 0 auto;
      .nav_img {
        width: 24px;
        height: 24px;
      }
      .nav_text {
        margin-top: 10px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  .divider {
    height: 20upx;
    width: 100%;
    background: #f5f5f5;
  }
}
</style>