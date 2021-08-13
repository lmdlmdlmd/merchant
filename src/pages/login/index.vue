<template>
  <view class="wh-100s">
    <view>
      <view class="w-100s h-266">
        <image class="wh-100s"
          mode="scaleToFill"
          src="../../static/img/imgs/login_banner.png"
        ></image>
      </view>
      <!-- 主体表单 -->
      <view class="margin-t-16">
        <view class="form">
          <view class="row">
            <view class="reg-label">企业代码</view>
            <wx-input
              placeholder="请输入企业代码"
              :value.sync="code"
              class="reg-input"
            ></wx-input>
          </view>
          <view class="row">
            <view class="reg-label">账号</view>
            <wx-input
              placeholder="请输入账号"
              :value.sync="mobile"
              class="reg-input"
            ></wx-input>
          </view>
          <view class="row">
            <view class="reg-label">密码</view>
            <wx-input
              :eye="true"
              type="password"
              placeholder="请输入密码"
              :value.sync="password"
              class="reg-input"
            ></wx-input>
          </view>
          <view class="row">
            <view class="reg-label flex row-reverse">
              <view class="check_user">
                <van-checkbox
                  :value="checked"
                  @change="handleChange"
                ></van-checkbox>
              </view>
            </view>
            <text class="lable_che">记住密码并自动登录</text>
          </view>
        </view>
        <view class="center margin-t-40">
          <button class="wx-primary wx-m w-80s" @click.stop="startLogin">立即登录</button>
        </view>
      </view>
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
      checked: false,
      code: "",
      mobile: "",
      password: "",
    };
  },
  onLoad(options) {
    if (options.errorMsg) {
      uni.showToast({
        title: options.errorMsg,
        icon: "none",
      });
    }
    const { code, mobile, password, checked = false } = this.$auth.data || {};
    this.code = code;
    this.mobile = mobile;
    this.password = password;
    this.checked = checked;
    if (this.code && this.mobile && this.password && this.checked) {
      this.startLogin();
    }
  },
  methods: {
    handleChange(e) {
      this.checked = e.detail;
    },
    startLogin() {
      if (!this.code) {
        this.$toast.text("企业代码不能为空");
        return;
      }
      if (!this.mobile) {
        this.$toast.text("账号不能为空");
        return;
      }
      if (!this.password) {
        this.$toast.text("密码不能为空");
        return;
      }
      const params = {
        code: this.code,
        mobile: this.mobile,
        password: this.password,
        checked: this.checked
      };

      this.$auth.login(params, this.checked).then((res) => {
        if (res == "notPermission") {
          return this.$toast.text("不是商家角色,请切换账号");
        }
        uni.reLaunch({
          url: "/pages/home/index",
        });
      }).catch((err) => {
        this.$toast.text(err.message || "登录失败");
      });
    }
  }
};
</script>

<style  lang="less" scoped>
.form {
  width: calc(100% - 60px);
  margin: 0 auto;
  .row {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    .reg-label {
      flex: 0 1 25%;
      min-width: 60px;
      padding-right: 10px;
      text-align: right;
    }
    .reg-input {
      flex: 1 0;
      width: 75%;
      border-radius: 6upx;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
}

.check_user {
  width: 20px;
}
.lable_che {
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}

</style>