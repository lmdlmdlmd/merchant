<template>
  <view class="editPwBox">
    <zz-nav-bar
      title="修改密码"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <van-field v-model="name" placeholder="请输入用户名" />
      <van-field v-model="pwd" placeholder="新密码" />

      <van-field v-model="conPwd" placeholder="再次确认新密码" />
      <!-- <p @click="handleEdit()">忘记原密码？</p> -->
      <van-button
        type="primary"
        :disabled="!name || !pwd || !conPwd"
        class="login_out"
        @click="handleOut()"
        >确定</van-button
      >
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
      name: "",
      pwd: "",
      conPwd: "",
    };
  },
  onLoad() {},
  methods: {
    // handleEdit() {
    //   uni.navigateTo({
    //     url: `/pages/mine/forgotPassword`,
    //   });
    // },
    handleOut() {
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
  .login_out {
    width: calc(100% - 30px);
    margin: 200px auto;
    height: 32px;
    background: #1890ff;
    border-radius: 3px;
    border: none;
    outline: none;
    display: block;
  }
}
</style>
<style lang="less">
/deep/.van-field {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
}
/deep/.van-cell::after {
  border: none;
}
</style>