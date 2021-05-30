<template>
  <view class="priceTagBox">
    <view class="header">
      <van-row class="heaser_box">
        <van-col span="6">
          <image
            @click="handleBack"
            class="back"
            src="../../../static/img/icon/icon-back-black.png"
          ></image>
        </van-col>
        <van-col span="12" class="header_title">价签打印管理 </van-col>
        <van-col span="6" class="header_right" @click="handleEdiTag('-1')">
          <image
            class="right-icon"
            src="../../../static/img/icon/add.png"
          ></image>
          <span>新增申请</span>
        </van-col>
      </van-row>
    </view>
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
export default {
  components: {
    Footer,
    List,
  },
  data() {
    return {
      active: 0,
      tabs: [
        { title: "查看全部", active: 0 },
        { title: "申请中", active: 1 },
        { title: "已通过", active: 2 },
        { title: "草稿与驳回", active: 3 },
      ],
    };
  },
  onLoad() {},
  methods: {
    //新增申请
    handleEdiTag(id) {
      uni.navigateTo({
        url: `/pages/navigation/priceTag/edit?id=${id}`,
      });
    },
    handleBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 40px auto 68upx;
  padding-top: 10px;
}
.priceTagBox {
  background: #f5f5f5;
  min-height: 100vh;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    background: #fff;
    .heaser_box {
      margin: 0 auto;
      width: calc(100% - 20px);
    }
    .back {
      width: 18px;
      height: 18px;
      margin-top: 11px;
      vertical-align: middle;
    }
    .header_title {
      font-size: 16px;
      color: #1e1e18;
      line-height: 40px;
      text-align: center;
    }
    .header_right {
      text-align: right;
    }
    .right-icon {
      width: 13px;
      height: 13px;
      margin-right: 5px;
      margin-top: 2px;
      vertical-align: middle;
    }
    span {
      font-size: 12px;
      color: #1890ff;
      line-height: 40px;
      margin-right: 10px;
    }
  }
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