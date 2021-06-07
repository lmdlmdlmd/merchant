<template>
  <view class="login login-bg w-h-100 custom-light">
    <view class="content">
      <view class="login_banner">
        <image class="img" src="../../static/img/imgs/login_banner.png"></image>
      </view>
      <!-- 主体表单 -->
      <view class="main_box_login">
        <view class="form">
          <view class="row code_box">
            <text class="reg_lable">企业代码</text>
            <zz-input
              placeholder="请输入企业代码"
              :value.sync="code"
              key="username5"
              class="reg_input"
            ></zz-input>
          </view>
          <view class="row">
            <text class="reg_lable mar_26">账号</text>
            <zz-input
              placeholder="请输入账号"
              :value.sync="mobile"
              key="username6"
              class="reg_input"
            ></zz-input>
          </view>
          <view class="row">
            <text class="reg_lable mar_26">密码</text>
            <zz-input
              placeholder="请输入密码"
              :value.sync="password"
              key="username7"
              class="reg_input"
            ></zz-input>
          </view>
          <p @click="handleEdit()">忘记原密码？</p>
          <view class="row">
            <van-checkbox
              v-model="checked"
              class="checkbox_body"
            ></van-checkbox>
            <text class="lable_che">记住密码并自动登录</text>
          </view>
        </view>
        <view class="submit reg_submit_box">
          <button class="btn" @click.stop="startLogin">立即登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import md5 from "@/common/lib/md5.min.js";
import zzNavBar from "../../components/zz-nav-bar";
import zzInput from "../../components/zz-input";
import Vue from "vue";
export default {
  computed: {
    // ...mapGetters(['darkMode'])
  },
  data() {
    return {
      checked: false,
      isRotate: false, //是否加载旋转
      code: "",
      mobile: "",
      password: "",
    };
  },
  components: {
    zzNavBar,
    zzInput,
  },
  onLoad(options) {
    if (options.errorMsg) {
      uni.showToast({
        title: options.errorMsg,
        icon: "none",
      });
    }
  },
  methods: {
    handleEdit() {
      uni.navigateTo({
        url: `/pages/user/forgotPassword`,
      });
    },
    login(params) {
      console.log("store cookie");
      console.log(params);
      if (params) {
        this.isRotate = true;
        this.$store
          .dispatch("login", params)
          .then((res) => {
            console.log("data back");
            this.isRotate = false;
            console.log(res.data.dataSource.token);

            sessionStorage.setItem("name", res.data.dataSource.name);
            sessionStorage.setItem("passwd", res.data.dataSource.passwd);

            sessionStorage.setItem("token", res.data.dataSource.token);
            uni.reLaunch({
              url: "/pages/home/index",
            });
          })
          .catch(() => {
            this.isRotate = false;
          });
      }
    },
    startLogin() {
      const params = {
        mobile: "18637152523",
        password: "99999999",
        code: "LMD",
      };
      this.$auth
        .login(params)
        .then((res) => {
          // console.log(res, "-----");
          //  request.setRequestHeader("Authorization", token);
          uni.reLaunch({
            url: "/pages/home/index",
          });
        })
        .catch((err) => {
          console.log(err);
          // let key = Object.keys(err.data)[0];
          this.$toast.text(err.message || "登录失败");
        });
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (!this.code) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "企业代码不能为空",
        });
        return;
      }
      if (!this.mobile) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "账号不能为空",
        });
        return;
      }
      if (this.password.length < 5) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return;
      }

      // 网络请求
      // const params = {
      //   code: this.code,
      //   mobile: this.mobile,
      //   password: this.password,
      // };
      // this.login(params);
    },
  },
};
</script>

<style  lang="less" scoped>
// /* @import url("../../components/watch-login/css/icon.css"); */
// @import url("./css/main.css");
.login_banner {
  width: 100%;
  height: 266px;
  .img {
    width: 100%;
    height: 100%;
  }
}
p {
  color: #1e1e18;
  font-size: 14px;
  margin-top: 20px;
  text-align: right;
}
.main_box_login {
  margin-top: 60upx;
}
.reg_lable {
  color: rgba(0, 0, 0, 0.65);
  font-size: 28upx;
}
.tel_input,
.pws_input,
.reg_input {
  margin-left: 30upx;
  color: #333333;
  position: relative;
}
// .pws_box {
//   margin-top: 40upx;
// }
.row {
  display: flex;
  align-items: center;
  margin-top: 50upx;
}

.clear {
  clear: both;
}
.form {
  width: calc(100% - 180upx);
  margin: 0 auto;
}

.submit {
  width: calc(100% - 180upx);
  margin: 80upx auto 0;
  .btn {
    width: 100%;
    background: #0091ff;
    height: 32px;
    font-size: 14px;
    color: #fff;
    line-height: 32px;
    border-radius: 2px;
  }
}
.checkbox_body {
  margin-left: 34px;
}
.lable_che {
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}
.mar_26 {
  margin-left: 52upx;
}
.mar_13 {
  margin-left: 26upx;
}
.mar_15 {
  margin-left: 30upx;
}
</style>
<style lang="less">
/deep/.van-checkbox__icon--checked .van-icon-success::before {
  content: "";
  display: inline-block;
  background: url("../../static/img/imgs/login_check.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
/deep/.van-icon-success::before {
  content: "";
  display: inline-block;
  background-image: url("../../static/img/imgs/login_unSelect.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
/deep/.van-checkbox__icon .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
/deep/.van-checkbox__icon .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>