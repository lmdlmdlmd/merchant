<template>
  <view class="mineBox">
    <zz-nav-bar
      title="我的"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <view class="author_body">
        <view class="author_box">
          <view class="author">
            <text>{{
              name.substring(name.length - 2, name.length)
            }}</text></view
          >

          <text class="author_text">{{ name }}</text>
          <van-row class="detail">
            <van-col span="12" class="lable">
              <text>所属商场：</text>
            </van-col>
            <van-col span="12" class="value">
              <text>{{ main }}</text>
            </van-col>
          </van-row>
          <van-row class="detail">
            <van-col span="12" class="lable">
              <text>店铺：</text>
            </van-col>
            <van-col span="12" class="value">
              <text>{{ store }}</text>
            </van-col>
          </van-row>
          <van-row class="detail">
            <van-col span="12" class="lable">
              <text>品牌：</text>
            </van-col>
            <van-col span="12" class="value">
              <text>{{ brand }}</text>
            </van-col>
          </van-row>
          <van-row class="detail">
            <van-col span="12" class="lable">
              <text>登录用户权限：</text>
            </van-col>
            <van-col span="12" class="value">
              <text>{{ permissions }}</text>
            </van-col>
          </van-row>
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
      name: "王立伟",
      main: "大明宫钻石店",
      store: "DS1-A-001",
      brand: "慕斯寝具",
      permissions: "导购员",
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
    .author {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      vertical-align: middle;
      margin-right: 24px;
      background: #007aff;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      display: inline-block;
      margin-bottom: 10px;
    }
    .detail {
      margin-top: 5px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.85);
    }
    .lable {
      text-align: right;
      color: rgba(0, 0, 0, 0.6);
    }
    .value {
      text-indent: 14px;
      text-align: left;
    }
    .author_box {
      // display: inline-block;
      text-align: center;
    }
    .author_text {
      font-size: 16px;
      color: #1e1e18;
    }
    .edit_pwd {
      margin-top: 45px;
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