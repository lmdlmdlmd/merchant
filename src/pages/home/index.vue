<template>
  <view class="wh-100s relative">
    <!-- <zz-nav-bar
      title="我的"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar> -->

    <view class="content padding-20">
      <!-- 头像昵称 -->
      <view class="flex">
        <view class="author">
          <text>{{ subName }}</text>
        </view>
        <view class="lh-42 margin-l-10 text-16">{{ data.name || "--" }}</view>
      </view>
      <!-- 详细信息 -->
      <view class="padding-t-40 padding-b-40">
        <view class="lh-24 flex">
          <view class="lable">所属商场：</view>
          <view class="value flex-sub">{{ data.role.mallid_s || '' }}</view>
        </view>
        <view class="lh-24 flex">
          <view class="lable">店铺：</view>
          <view class="value flex-sub">{{ data.role.shopid_s || '' }}</view>
        </view>
        <view class="lh-24 flex">
          <view class="lable">品牌：</view>
          <view class="value flex-sub">{{ data.role.merchid_s || '' }}</view>
        </view>
        <view class="lh-24 flex">
          <view class="lable">登录用户权限：</view>
          <view class="value flex-sub">{{ data.role.role_s || '' }}</view>
        </view>
      </view>
      <view>
        <view class="flex padding-t-10 padding-b-10" @click="handleEdit()">
          <view class="text-16 flex-sub">修改密码</view>
          <view>
            <image
              class="wh-14 margin-t-4"
              src="@/static/img/icon/icon_call.png"
            />
          </view>
        </view>
        <view class="pwd-tip">密码为数字或字母组合</view>
      </view>
    </view>

    <view class="padding-20 absolute bottom-0 right-0 left-0">
      <button class="wx-m w-100s wx-primary" @click="handleOutLogin">退出登录</button>
    </view>
    <van-popup
      :show="show"
      position="bottom"
      @click-overlay="onClose"
    >
      <view class="footer_box">
        <p>确定要退出登录吗?</p>
        <p class="confirm" @click="handleOut()">退出登录</p>
        <p class="concal" @click="onClose">取消</p>
      </view>
    </van-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      data: {}
    };
  },
  onLoad(options) {
    this.data = this.$auth.data;
  },
  computed: {
    subName() {
      let name = '';
      if (this.data && this.data.name) {
        name = this.data.name.substr(-2);
      }
      return name;
    }
  },
  methods: {
    onClose() {
      this.show = false;
    },
    handleOutLogin() {
      this.show = true;
    },
    handleEdit() {
      uni.navigateTo({
        url: `/user/edit`,
      });
    },
    handleOut() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="less" scoped>
.author {
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #007aff;
  font-size: 16px;
  line-height: 42px;
  text-align: center;
  color: #fff;
}
.lable {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.value {
  font-size: 12px;
  text-align: right;
}
.pwd-tip {
  color: #a7a7a5;
  font-size: 12px;
  line-height: 28px;
  border-top: 1px solid #F0F0F0;
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