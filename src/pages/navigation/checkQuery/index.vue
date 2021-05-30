<template>
  <view class="checkQueryBox">
    <zz-nav-bar title="对账查询"></zz-nav-bar>

    <view class="content">
      <van-tabs v-model="active" color="#0091FF">
        <van-tab :title="item.title" v-for="(item, index) of tabs" :key="index">
          <List :active="active" />
        </van-tab>
      </van-tabs>
      <view class="footer"> <Footer active="navigation"></Footer></view>
    </view>
  </view>
</template>

<script>
import Footer from "../../components/footer-nav";
import List from "./list";
import zzNavBar from "../../components/zz-nav-bar";
export default {
  components: {
    zzNavBar,
    Footer,
    List,
  },
  data() {
    return {
      active: 0,
      tabs: [
        { title: "查看全部", active: 0 },
        { title: "待确认对账单", active: 1 },
        { title: "已确认对账单", active: 2 },
      ],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.checkQueryBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 0 auto 68upx;
  padding-top: 10px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
<style lang="less">
// /deep/ .van-tabs__nav {
//   // width: calc(100% - 200upx);
//   // margin: 0 auto;
// }
/deep/.van-tab {
  color: #333333;
  font-size: 28upx;
}
/deep/ .van-tab--active {
  color: #0091ff;
}
/deep/.van-step--vertical:not(:last-child)::after {
  border-bottom: none;
}
/deep/.van-tabs__line {
  bottom: 20px;
  width: 40px;
  height: 2px;
}
/deep/.van-tabs--line .van-tabs__wrap {
  height: 35px;
}
</style>