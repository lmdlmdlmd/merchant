<template>
  <view class="navbar">
    <view
      class="navbar__content"
      :class="{
        'navbar--fixed': fixed,
        'navbar--border': border,
        'navbar--shadow': shadow,
      }"
      :style="{ background: background }"
    >
      <view
        class="navbar__header navbar__content_view"
        :style="{ color: color }"
      >
        <view
          class="navbar__header-btns navbar__content_view"
          :style="{ flex: btnWidth }"
        >
          <view @click="onClickLeft">
            <view v-if="leftIcon.length" class="uni-navbar__content_view">
              <zz-icon :type="leftIcon" :color="color"></zz-icon>
            </view>
            <view
              v-if="leftText.length"
              :class="{ 'navbar-btn-icon-left': !leftIcon.length }"
              class="navbar-btn-text navbar__content_view"
              >{{ leftText }}</view
            >
            <slot name="left" />
          </view>
        </view>
        <view class="navbar__header-container navbar__content_view">
          <view
            v-if="title.length"
            class="navbar__header-container-inner navbar__content_view"
            >{{ title }}</view
          >
          <slot name="title" />
        </view>
        <view
          class="navbar__header-btns navbar__content_view"
          :style="{ flex: btnWidth }"
        >
          <view @click="onClickRight">
            <view v-if="rightIcon.length" class="navbar__content_view">
              <zz-icon :type="rightIcon" :color="color"></zz-icon>
            </view>
            <view
              v-if="rightText.length && !rightIcon.length"
              class="navbar-btn-text navbar__content_view"
              :style="{ color: rightColor }"
              >{{ rightText }}</view
            >
            <slot name="right" />
          </view>
        </view>
      </view>
    </view>
    <view v-if="fixed" class="navbar__placeholder"></view>
  </view>
</template>

<script>
import zzIcon from "./zz-icon.vue";

export default {
  name: "zzNavBar",
  components: {
    zzIcon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#000000",
    },
    background: {
      type: String,
      default: "#fff",
    },
    leftText: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    rightColor: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    rightIcon: {
      type: String,
      default: "",
    },
    btnWidth: {
      type: String,
      default: "",
    },
    backNum: {
      type: [String, Number],
      default: 1,
    },
  },
  methods: {
    onClickLeft() {
      if (this.leftIcon == "back" || this.leftIcon == "back-arrow") {
        uni.navigateBack({
          delta: parseInt(this.backNum),
        });
      }
      this.$emit("click-left");
    },
    onClickRight() {
      this.$emit("click-right");
    },
  },
};
</script>

<style scoped>
.navbar__content {
  padding-top: var(--status-bar-height);
  position: relative;
  width: 100%;
  overflow: hidden;
}

.navbar__content .navbar__content_view {
  display: flex;
  align-items: center;
  /* padding-top: 16upx;
  padding-bottom: 16upx; */
}

.navbar__header {
  display: flex;
  width: 100%;
  height: 80upx;
  line-height: 80upx;
}

.navbar__header-btns {
  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  flex: 0 0 140upx;
  padding: 0 32upx;
  font-size: 32upx;
  line-height: 44upx;
  font-weight: 700;
}

.navbar__header-btns .navbar-btn-text {
  white-space: nowrap;
}

.navbar__header-btns:last-of-type {
  justify-content: flex-end;
}

.navbar__header-container {
  width: 100%;
  margin: 0 10upx;
}

.navbar__header-container-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 32upx;
  /* font-weight: 700; */
  white-space: nowrap;
  color: #1e1e18;
}

.navbar__placeholder {
  height: calc(80upx + var(--status-bar-height));
  border-bottom: 1px solid #eeeeee;
}

.navbar--fixed {
  position: fixed;
  z-index: 998;
}

.navbar--shadow {
  /* box-shadow: 0px 0px 8px 0px rgba(153, 153, 153, 0.2); */
}
</style>
