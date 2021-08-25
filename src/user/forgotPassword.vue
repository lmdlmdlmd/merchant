<template>
  <view class="editPwBox">
    <!-- <zz-nav-bar
      title="忘记密码"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar> -->

    <view class="content">
      <input
        type="password"
        class="input_text"
        :value="phone"
        placeholder="请输入手机号"
      />
      <van-button
        type="primary"
        class="retPassword"
        @click="handleRetPassword()"
        >找回密码</van-button
      >
    </view>
  </view>
</template>

<script>
// import zzNavBar from "../../components/zz-nav-bar";
export default {
  // components: {
  //   zzNavBar,
  // },
  data() {
    return {
      phone: "",
    };
  },
  onLoad() {},
  methods: {
    handleRetPassword() {
      uni.navigateTo({
        url: `/pages/login/index`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 38px auto;
  width: calc(100% - 60px);

  p {
    color: #1e1e18;
    font-size: 14px;
    margin-top: 20px;
    text-align: right;
  }
  .input_text {
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #1e1e18;
  }
}
</style>
<style lang="less">
/deep/.van-field {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
}
/deep/ .retPassword .van-button {
  width: calc(100% - 30px);
  margin: 37px auto;
  height: 32px;
  background: #1890ff;
  border-radius: 3px;
  border: none;
  outline: none;
  display: block;
  line-height: 32px;
}
</style>