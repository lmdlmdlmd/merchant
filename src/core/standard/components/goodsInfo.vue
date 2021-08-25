<template>
  <view class="w-100s">
    <view class="margin-b-8 flex justify-between">
      <view class="text-16 text-blod flex-sub">商品信息</view>
      <view class="text-14 link flex">
        <view>新增商品</view>
        <view class="margin-l-10">选择商品</view>
      </view>
    </view>
    <!-- 店铺、品牌 -->
    <view class="wx-card-bg br-5 padding-10 min-h-50 margin-b-10">
      <view class="row-input">
        <view>店铺</view>
        <view>DS1-001-002</view>
      </view>
      <view class="row-input">
        <view>品牌名称</view>
        <view>HT2232323323</view>
      </view>
    </view>
    <!-- 用户信息 -->
    <view class="wx-card-bg br-5 padding-10 min-h-50 margin-b-10">
      <view class="row-input">
        <view>会员卡号</view>
        <input
          placeholder="请输入会员号或手机号"
          v-model="cardNumber"
        />
      </view>
      <view class="row-input">
        <view>顾客姓名</view>
        <input
          placeholder="请输入顾客姓名"
          v-model="customerName"
        />
      </view>
      <view class="row-input">
        <view>联系电话</view>
        <input
          placeholder="请输入顾客电话"
          v-model="mobile"
        />
      </view>
    </view>
    <!-- 地址 -->
    <view class="wx-card-bg br-5 padding-10 min-h-50 margin-b-10">
      <view class="row-input">
        <view>送货日期</view>
        <input
          placeholder="请输入会员号或手机号"
          v-model="cardNumber"
        />
      </view>
      <view class="row-input">
        <view>送货方式</view>
        <input
          placeholder="请输入顾客姓名"
          v-model="customerName"
        />
      </view>
      <view class="row-input">
        <view>所在地区</view>
        <input
          placeholder="请输入顾客电话"
          v-model="mobile"
        />
      </view>
      <view class="row-input">
        <view>详细地址</view>
        <input
          placeholder="街道、门牌号等"
          v-model="mobile"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  created() {
    console.log(this);
  }
}
</script>

<style lang="less" scoped>
.row-input {
  display: flex;
  justify-content: space-between;
  line-height: 26px;
  input {
    flex: 1;
    text-align: right;
  }
}
</style>