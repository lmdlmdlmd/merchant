<template>
  <view class="tabs">
    <view
      class="tabs__content"
      :class="{ 'tabs--shadow': shadow }"
      :style="{ background: background, height: height }"
    >
      <view
        v-for="(item, index) of options"
        :key="index"
        class="tabs-item"
        :class="{
          'tabs-item--active': index == zzActive,
          'tabs-item--border': border,
        }"
        :style="{
          color: index == zzActive ? activeColor : color,
          borderColor: index == zzActive ? activeColor : '',
        }"
        @click="tabClick(item, index)"
      >
        <text class="tabs-item-label">{{ item.label || item }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "zzTabs",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    background: {
      type: String,
      default: "#ffffff",
    },
    color: {
      type: String,
      default: "#333333",
    },
    activeColor: {
      type: String,
      default: "#0091ff",
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    active: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: "80upx",
    },
  },
  data() {
    return {
      zzActive: this.active,
    };
  },
  watch: {
    active(e) {
      this.zzActive = e;
    },
  },
  methods: {
    tabClick(item, index) {
      if (this.zzActive != index) {
        this.zzActive = index;
        this.$emit("update:active", index);
        this.$emit("change", item);
      }
    },
  },
};
</script>

<style scoped  lang="less">
.tabs {
  // position: relative;
  position: fixed;
  z-index: 9;
  width: 100%;
}

.tabs__content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tabs--shadow {
  box-shadow: 0px 0px 8px 0px rgba(153, 153, 153, 0.2);
}

.tabs-item {
  height: calc(100% - 4upx);
  display: flex;
  align-items: center;
  font-size: 32upx;
  padding-bottom: 4upx;
  font-weight: 700;
}
.tabs-item-label {
  //   color: #333333;
  font-size: 28upx;
}
.tabs-item--border.tabs-item--active {
  padding-bottom: 0;
  border-bottom: 4upx solid #0091ff;
}
// /deep/.van-tab {
//   color: #333333;
//   font-size: 28upx;
// }
// /deep/ .van-tab--active {
//   color: #0091ff;
// }
// /deep/.van-step--vertical:not(:last-child)::after {
//   border-bottom: none;
// }
// /deep/.van-tabs__line {
//   bottom: 20px;
//   width: 40px;
//   height: 2px;
// }
// /deep/.van-tabs--line .van-tabs__wrap {
//   height: 35px;
// }
</style>
