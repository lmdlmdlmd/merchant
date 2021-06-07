<template>
  <view class="depositOrderBox">
    <zz-nav-bar
      title="定金订单"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="customer_info">
          <p class="ci_title">顾客信息</p>
          <view class="ci_con">
            <van-field
              class="br"
              placeholder="请输入商铺"
              v-model="shops"
              label="商铺"
            />
            <van-field
              class="bg"
              placeholder="请输入品牌名称"
              v-model="brandName"
              label="品牌名称"
            />
            <van-field
              v-model="cardNumber"
              placeholder="请输入会员号或手机号"
              label="会员卡号"
              right-icon="search"
              @click-right-icon="handleRightSearch"
            />
            <van-field
              class="bg"
              v-model="name"
              placeholder="请输入顾客姓名"
              label="顾客姓名"
            />
            <van-field
              class="br"
              v-model="phone"
              placeholder="请输入联系电话"
              label="联系电话"
            />
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="deposit_info">
          <p class="ci_title">定金信息</p>
          <view class="ci_con">
            <van-field
              class="br"
              v-model="money"
              placeholder="请输入定金金额"
              label="定金金额"
            />
          </view>
        </view>
      </view>
      <view id="screens3">
        <view class="sub_box">
          <van-button type="primary" class="reset" @click="handleReset"
            >重置</van-button
          >
          <van-button type="primary" class="determine" @click="handleSubmit"
            >确定</van-button
          >
        </view>
      </view>
    </view>
    <view class="footer"> <Footer active="navigation"></Footer></view>
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";
import Footer from "../../../components/footer-nav";
import Anchor from "../../components/anchor";
export default {
  components: {
    zzNavBar,
    Footer,
    Anchor,
  },
  data() {
    return {
      shops: "DS1-001-002",
      brandName: "HT2232323323",
      cardNumber: "",
      name: "",
      phone: "",
      money: "¥999",
      anchor: ["顾客信息", "定金信息", "订单确认"],
    };
  },
  onLoad() {},
  methods: {
    //会员卡号
    handleRightSearch() {
      if (!this.cardNumber) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入会员号或手机号",
        });
      }
      this.name = "王立伟";
      this.phone = "13509090909";
    },
    //提交
    handleSubmit() {
      uni.navigateTo({
        url: `/pages/navigation/deposit/depositOrderDetail`,
      });
    },
    //重置
    handleReset() {
      this.shops = "";
      this.brandName = "";
      this.cardNumber = "";
      this.name = "";
      this.phone = "";
      this.money = "";
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 65px;
  }
  .customer_info,
  .deposit_info {
    padding: 10px 0;
    border-top: 1px solid #dddddd;
  }
  .ci_title {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0;
    margin-left: 10px;
  }
  .ci_con {
    width: calc(100% - 20px);
    padding: 10px;
    background: #fafafa;
  }
  .br {
    border-radius: 6px;
  }
  .bg {
    background-color: #f4f5f5;
  }
  .sub_box {
    text-align: right;
    margin: 12px auto;
    width: calc(100% - 20px);
    .reset,
    .determine {
      color: #000;
      background: #dddddd;
      border: none;
      outline: none;
      padding: 3px 23px;
      border-radius: 4px;
      margin-right: 22px;
      height: 32px;
    }
    .determine {
      background: #1890ff;
      margin-right: 0;
      color: #fff;
    }
  }
}
.depositOrderBox {
  background: #f5f5f5;
  min-height: 100vh;
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
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
</style>