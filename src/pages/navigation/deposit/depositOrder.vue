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
              readonly
              placeholder="请输入商铺"
              v-model="info.name"
              label="商铺"
            />
            <van-field
              class="bg"
              readonly
              placeholder="请输入品牌名称"
              v-model="info.brandid_s"
              label="品牌名称"
            />
            <van-field
              v-model="params.customercode"
              placeholder="请输入会员号或手机号"
              label="会员卡号"
              right-icon="search"
              @click-right-icon="handleRightSearch"
            />
            <van-field
              class="bg"
              v-model="params.customer"
              placeholder="请输入顾客姓名"
              label="顾客姓名"
            />
            <van-field
              class="br"
              v-model="params.customermobile"
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
              v-model="params.amount"
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
      params: {
        amount: "¥ 0",
        customermobile: "",
        customer: "",
        customercode: "",
      },
      anchor: ["顾客信息", "定金信息", "订单确认"],
      info: {},
    };
  },
  created() {
    setTimeout(() => {
      const { shop = {} } = this.$auth;
      //基本信息
      this.info = {
        name: shop && shop.name,
        brandid_s: shop.brandid_s,
        merchatid_s: shop.merchatid_s,
      };
      // console.log(this.info, "info", this.$auth);
    }, 500);
  },
  onLoad() {},
  methods: {
    //会员卡号预留查询
    handleRightSearch() {
      if (!this.customercode) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入会员号或手机号",
        });
      }
      //查询姓名和电话
      // this.name = "王立伟";
      // this.phone = "13509090909";
    },
    //提交
    handleSubmit() {
      this.params.amount = this.params.amount && this.params.amount.substr(1);
      this.$api
        .post("mall/deposit/add", this.params)
        .then((res) => {
          // console.log(res);
          this.$toast.toast({
            icon: "",
            title: "添加成功",
            success: () => {
              this.handleReset();
              uni.navigateBack();
            },
          });
        })
        .catch((e) => {
          console.log(e);
          this.$toast.toast({
            icon: "",
            title: e.message,
            success: () => {},
          });
        });
      uni.navigateTo({
        url: `/pages/navigation/deposit/depositOrderDetail`,
      });
    },
    //重置
    handleReset() {
      Object.keys(this.params).forEach((key) => {
        this.params[key] = "";
      });
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