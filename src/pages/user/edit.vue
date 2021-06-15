<template>
  <view class="editPwBox">
    <zz-nav-bar
      title="修改密码"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <van-row class="userMobile">
        <van-col span="5"> 登录账号 </van-col>
        <van-col span="19">
          <text>{{ mobile }}</text>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="5" class="input_lable"> 原密码 </van-col>
        <van-col span="19">
          <van-field
            v-model="password"
            type="password"
            placeholder="请输入原密码"
        /></van-col>
      </van-row>
      <van-row>
        <van-col span="5" class="input_lable"> 新密码 </van-col>
        <van-col span="19">
          <van-field
            v-model="new_password"
            type="password"
            placeholder="填写新密码"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="5" class="input_lable"> 确认密码 </van-col>
        <van-col span="19">
          <van-field
            v-model="rep_new_password"
            type="password"
            placeholder="再次填写确认"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="16" class="pwd_rules"> 密码为数字或字母组合 </van-col>
        <van-col span="8" class="forge_pwd" @click="handleEdit()">
          忘记原密码？</van-col
        >
      </van-row>
      <van-button
        type="primary"
        :disabled="!password || !new_password || !rep_new_password"
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
      password: "",
      new_password: "",
      rep_new_password: "",
      mobile: "",
    };
  },
  created() {
    setTimeout(() => {
      const { user = {} } = this.$auth;
      this.mobile = user.mobile;
    }, 300);
    console.log(this.mobile);
  },
  methods: {
    // handleEdit() {
    //   uni.navigateTo({
    //     url: `/pages/mine/forgotPassword`,
    //   });
    // },
    handleOut() {
      const { user = {} } = this.$auth;
      this.$api
        .post("base/shopuser/go", {
          action: "modify",
          form: {
            password: this.password,
            new_password: this.new_passwor,
            rep_new_password: this.rep_new_password,
          },
          id: user.id,
        })
        .then((res) => {
          uni.showToast({
            icon: "none",
            position: "bottom",
            title: "修改成功",
          });
          uni.navigateTo({
            url: `/pages/login/index`,
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 38px auto;
  width: calc(100% - 60px);
  .userMobile {
    color: rgba(30, 30, 24, 0.25);
    font-size: 14px;
    margin-bottom: 16px;
  }
  .pwd_rules {
    color: rgba(30, 30, 24, 0.5);
    font-size: 12px;
    margin-top: 18px;
  }
  .forge_pwd {
    color: #0f5cb6;
    font-size: 14px;
    margin-top: 18px;
    text-align: right;
  }
  .input_lable {
    color: rgba(30, 30, 24, 1);
    font-size: 14px;
    margin-top: 12px;
  }
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
/deep/.van-field__label {
  color: #1e1e18;
}
/deep/.van-field__control {
  color: #1e1e18;
}
</style>