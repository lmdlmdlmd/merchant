<template>
  <view class="empty">
    <view class="empty-container">
      <image
        v-if="image == 'default'"
        src="../../static/img/icon/icon-back-arrow.png"
        class="icon"
      ></image>
      <image
        v-if="image != 'default'"
        :src="image"
        :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
        class="icon"
      ></image>
      <slot name="icon" />
      <text v-if="title" class="title">{{ title }}</text>
      <text v-if="desc" class="desc">{{ desc }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "zzEmpty",
  props: {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "default",
    },
    imgWidth: {},
    imgHeight: {},
  },
};
</script>

<style scoped>
.empty-container {
  position: fixed;
  top: 38%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
}

.empty-container .title {
  /* font-weight: 700; */
  font-size: 32upx;
  line-height: 36upx;
  margin-top: 32upx;
  color: #aaaaaa;
}

.empty-container .desc {
  font-size: 26upx;
  line-height: 36upx;
  margin-top: 20upx;
  color: #999999;
}

.empty-container .icon {
  width: 284upx;
  height: 200upx;
  /* margin-bottom: 42upx; */
}
</style>
