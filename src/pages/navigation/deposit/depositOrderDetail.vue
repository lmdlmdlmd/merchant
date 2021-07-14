<template>
  <view class="depositOrderDetailBox">
    <zz-nav-bar
      title="定金订单详情"
      leftIcon="back"
      rightIcon="back-point"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="code_info">
          <p class="ci_title">二维码信息</p>
          <view class="ci_con">
            <image
              src="../../../static/img/imgs/code.png"
              class="code_img"
            ></image>
            <p>订单号：{{ info.orderno }}</p>
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="customer_info">
          <p class="ci_title">顾客信息</p>
          <view class="ci_con">
            <van-field
              class="br"
              v-model="info.shopid_s"
              label="商铺"
              readonly
            />
            <van-field
              class="bg"
              v-model="info.brandid_s"
              label="品牌名称"
              readonly
            />
            <van-field v-model="cardNumber" label="会员卡号" readonly />
            <van-field
              class="bg"
              v-model="info.customer"
              label="顾客姓名"
              readonly
            />
            <van-field
              class="br phone"
              v-model="info.customermobile"
              label="联系电话"
              readonly
            />
          </view>
        </view>
      </view>
      <view id="screens3">
        <view class="deposit_info pad_64">
          <p class="ci_title">定金信息</p>
          <view class="ci_con">
            <van-field
              class="br money"
              v-model="info.amount"
              label="定金金额"
            />
          </view>
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
      info: {},
      cardNumber: "3434343435", //bug
      anchor: ["二维码信息", "顾客信息", "定金信息"],
    };
  },
  onLoad(query) {
    if (query.id) {
      this.$api
        .post("mall/saleorder/view", {
          id: query.id,
        })
        .then((res) => {
          console.log(res);
          this.info = res;
        });
    } else {
      uni.navigateBack();
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 55px;
  }
  .customer_info,
  .deposit_info,
  .code_info {
    padding: 10px 0;
    border-top: 1px solid #dddddd;
  }
  .pad_64 {
    padding-bottom: 64px;
  }
  .code_info {
    margin-top: 10px;
    .ci_con {
      text-align: center;
    }
    .code_img {
      margin: 30px 0 20px;
      width: 135px;
      height: 135px;
      padding: 30px 110px;
      background: #fff;
      border: 1px dashed #888;
    }
    p {
      color: #000;
      font-size: 13px;
      font-weight: 600;
    }
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
    padding: 0 10px 10px;
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
    margin-top: 12px;
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

      color: #fff;
    }
  }
  .phone {
    color: #1890ff;
  }
}
.depositOrderDetailBox {
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
/deep/ .phone .van-field__control {
  color: #1890ff;
}
/deep/ .money .van-field__control {
  color: #1890ff;
}
</style>