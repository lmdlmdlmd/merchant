<template>
  <view class="wh-100s relative">
    <!-- <zz-nav-bar
      title="修改密码"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar> -->
    <view class="padding-20">
      <view class="form">
        <view class="row">
          <view class="reg-label">原密码</view>
          <wx-input
            :eye="true"
            type="password"
            placeholder="请输入企业代码"
            :value.sync="password"
            class="reg-input"
          ></wx-input>
        </view>
        <view class="row">
          <view class="reg-label">新密码</view>
          <wx-input
            :eye="true"
            type="password"
            placeholder="请输入账号"
            :value.sync="new_password"
            class="reg-input"
          ></wx-input>
        </view>
        <view class="row">
          <view class="reg-label">确认密码</view>
          <wx-input
            :eye="true"
            type="password"
            placeholder="请输入密码"
            :value.sync="rep_new_password"
            class="reg-input"
          ></wx-input>
        </view>
      </view>
      <view>
        <span class="sub-text"> 密码为数字或字母组合 </span>
      </view>
    </view>

    <view class="padding-20 absolute bottom-0 right-0 left-0">
      <button class="wx-m w-100s wx-primary" @click="handleOut">确定</button>
    </view>
  </view>
</template>

<script>
import wxInput from "@/components/Form/wx-input.vue";
export default {
  components: {
    wxInput
  },
  data() {
    return {
      password: "",
      new_password: "",
      rep_new_password: ""
    };
  },
  methods: {
    handleOut() {
      const { data } = this.$auth;
      this.$api.post("base/shopuser/go", {
        action: "modify",
        form: {
          password: this.password,
          new_password: this.new_password,
          rep_new_password: this.rep_new_password
        },
        id: data.id
      }).then((res) => {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "修改成功",
        });
        uni.navigateTo({
          url: `/pages/user/index`,
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  padding: 20px 0 10px 0;
  .row {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    .reg-label {
      min-width: 70px;
      text-align: left;
    }
    .reg-input {
      flex: 1 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);

    }
  }
}
</style>
