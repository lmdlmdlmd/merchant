<template>
  <view class="receivingQueryBox">
    <zz-nav-bar
      title="交款信息详情"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <view class="orderNo">
        <view class="orderNoBox">
          <view class="sn_title">单号</view>
          <view class="sn">XSDH-202103010001</view>
          <view class="data_select">
            <van-row>
              <van-col span="6"> <view class="title">商铺/品牌</view></van-col>
              <van-col span="18"
                ><view class="val">DS01-01-04-001/喜临门床垫</view></van-col
              >
            </van-row>
          </view>
          <view class="data_select">
            <van-row>
              <van-col span="6"><view class="title">销售金额</view></van-col>
              <van-col span="18"
                ><view class="val co_black">¥1000.00</view></van-col
              >
            </van-row>
          </view>
          <view class="data_select">
            <van-row>
              <van-col span="6"><view class="title">应收金额</view></van-col>
              <van-col span="18"
                ><view class="val co_black">¥1000.00</view></van-col
              >
            </van-row>
          </view>
          <view class="data_select newTime">
            <van-row>
              <van-col span="6"
                ><view class="title new_title">本次交款金额</view></van-col
              >
              <van-col span="18"
                ><view class="val co_black">¥800.00</view></van-col
              >
            </van-row>
          </view>
        </view>
      </view>
      <view class="orderNo">
        <view class="orderNoBox">
          <view class="record">支付记录</view>
          <view class="re_sn">信用卡</view>
          <view class="re_data_select">
            <van-row>
              <van-col span="16"
                ><view class="re_value">04/07 17:32</view></van-col
              >
              <van-col span="8"
                ><view class="re_val_money">手续费：5元</view></van-col
              >
            </van-row>
          </view>
          <view class="re_card re_data_select">
            <van-row>
              <van-col span="16"
                ><view class="value_sn">卡号：1456*******732</view></van-col
              >
              <van-col span="8"><view class="val_price">¥100.00</view></van-col>
            </van-row>
          </view>
          <view class="re_sn">支付宝</view>
          <view class="re_data_select">
            <van-row>
              <van-col span="16">
                <view class="re_value">04/07 17:32</view></van-col
              >
              <van-col span="8"
                ><view class="re_val_money">手续费：5元</view></van-col
              >
            </van-row>
          </view>
          <view class="re_data_select re_card">
            <van-row>
              <van-col span="16"
                ><view class="value_sn">账号：1456*******732</view></van-col
              >
              <van-col span="8"><view class="val_price">¥100.00</view></van-col>
            </van-row>
          </view>
          <view class="re_sn">现金</view>
          <view class="re_data_select re_card">
            <van-row>
              <van-col span="16"
                ><view class="re_value">04/07 17:32</view></van-col
              >
              <van-col span="8"><view class="val_price">¥100.00</view></van-col>
            </van-row>
          </view>
        </view></view
      >
    </view>
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";
export default {
  components: {
    zzNavBar,
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.receivingQueryBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 0 auto 68upx;
  .orderNo {
    margin-top: 10px;
    background: #fff;
  }
}
.orderNoBox {
  width: calc(100% - 20px);
  margin: 0 auto;
  padding-bottom: 20px;
}
.sn_title {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 20px 0 16px;
}
.sn {
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}
.data_select {
  color: rgba(0, 0, 0, 0.45);
  margin-top: 15px;
  font-size: 14px;
}
.val {
  text-align: right;
}
.co_black {
  color: #000;
}
.newTime {
  border-top: 1px solid #ddd;
  margin-top: 18px;
  padding-top: 12px;
}
.new_title {
  color: rgba(0, 0, 0, 0.65);
}
.record {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding-top: 16px;
  padding-bottom: 8px;
}
.re_sn {
  margin-top: 8px;
  color: #000000;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 3px;
}
.re_data_select {
  font-size: 12px;
  margin-top: 5px;
  .re_value {
    color: rgba(0, 0, 0, 0.45);
  }
  .re_val_money {
    color: #0091ff;
    text-align: right;
  }
}
.re_card {
  color: #000000;
  font-size: 14px;
  border-bottom: 1px dashed #eeeeee;
  padding-bottom: 7px;
}
.val_price {
  font-weight: 600;
  text-align: right;
}
</style>
<style lang="less">
/deep/ .van-tabs__line {
  bottom: 8px !important;
}
</style>