<template>
  <view class="mineBox">
    <zz-nav-bar title="我的"></zz-nav-bar>

    <view class="content">
      <view class="author_body">
        <view class="author_box">
          <image
            src="../../static/img/imgs/members.png"
            class="author_img"
          ></image>
          <text class="author_text">王立伟</text>
        </view>
        <van-row class="edit_pwd" @click="handleEdit">
          <van-col span="12">修改密码</van-col>
          <van-col span="12" class="icon_call"
            ><img
              class="icon_call_img"
              src="../../static/img/icon/icon_call.png"
          /></van-col>
        </van-row>
        <p>密码为数字或字母组合</p>
        <van-button type="primary" class="login_out" @click="show = true"
          >退出登录</van-button
        >
      </view>
    </view>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <view class="footer_box">
        <p>确定要退出登录吗?</p>
        <p class="confirm" @click="handleOut()">退出登录</p>
        <p class="concal" @click="show = false">取消</p>
      </view>
    </van-popup>
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
      show: false,
    };
  },
  onLoad() {},
  methods: {
    handleEdit() {
      console.log(1);
      uni.navigateTo({
        url: `/pages/mine/edit`,
      });
    },
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
  margin: 0 auto 68upx;
  .author_body {
    width: calc(100% - 60px);
    margin: 40px auto 30px;
    .author_img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      vertical-align: middle;
      margin-right: 22px;
    }
    .author_text {
      color: #1e1e18;
      font-size: 16px;
    }
    .edit_pwd {
      margin-top: 28px;
      padding-bottom: 8px;
      color: #1e1e18;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
    }
    .icon_call {
      text-align: right;
    }
    .icon_call_img {
      width: 14px;
      height: 14px;
    }
    p {
      color: #a7a7a5;
      font-size: 12px;
      margin-top: 8px;
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
}
.footer_box {
  padding: 20px 0;
  color: rgba(0, 0, 0, 0.45);
  p {
    font-size: 14px;
    text-align: center;
  }
  .concal {
    color: #000;
  }
  .confirm {
    color: #ff4c0f;
    font-size: 16px;
    padding: 30px 0;
  }
}
</style>