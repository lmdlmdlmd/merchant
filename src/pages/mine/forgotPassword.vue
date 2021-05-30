<template>
  <view class="editPwBox">
    <zz-nav-bar title="忘记密码"></zz-nav-bar>

    <view class="content">
      <van-field v-model="phone" placeholder="请输入手机号" />
      <van-button
        type="primary"
        :disabled="!phone"
        class="retPassword"
        @click="handleRetPassword()"
        >找回密码</van-button
      >
    </view>
  </view>
</template>

<script>
import zzNavBar from "../components/zz-nav-bar";
export default {
  components: {
    zzNavBar,
  },
  data() {
    return {
      phone: "",
    };
  },
  onLoad() {},
  methods: {
    handleRetPassword() {
      uni.navigateTo({
        url: `/pages/mine/edit`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 38px auto;
  width: calc(100% - 60px);
  .retPassword {
    width: calc(100% - 30px);
    margin: 37px auto;
    height: 32px;
    background: #1890ff;
    border-radius: 3px;
    border: none;
    outline: none;
    display: block;
  }
  p {
    color: #1e1e18;
    font-size: 14px;
    margin-top: 20px;
    text-align: right;
  }
}
</style>
<style lang="less">
/deep/.van-field {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
}
</style>