<template>
  <view class="icon">
    <image
      class="search"
      v-if="type == 'search'"
      src="../../static/img/icon/icon-search.png"
    ></image>
    <image
      class="back-black"
      v-if="type == 'back' && color == '#000000'"
      src="../../static/img/icon/icon-back-black.png"
    ></image>
    <image
      class="back-white"
      v-if="type == 'back' && color == '#ffffff'"
      src="../../static/img/icon/icon-back-white.png"
    ></image>
    <image
      class="back-arrow"
      v-if="type == 'back-arrow'"
      src="../../static/img/icon/icon-back-arrow.png"
    ></image>
    <image
      class="back-point"
      v-if="type == 'back-point'"
      src="../../static/img/icon/icon-black-point.png"
    ></image>
  </view>
</template>

<script>
export default {
  name: "zzIcon",
  props: {
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
}

.search {
  width: 40upx;
  height: 40upx;
}

.back-black {
  width: 34upx;
  height: 34upx;
  padding: 26upx;
  margin-left: -26upx;
}
.back-point {
  width: 32upx;
  height: 32upx;
  /* padding: 26upx; */
  margin-left: -26upx;
}
.back-white {
  width: 24upx;
  height: 40upx;
  padding: 20upx;
  margin-left: -20upx;
}

.back-arrow {
  width: 44upx;
  height: 44upx;
  padding: 20upx;
  margin-left: -20upx;
}
</style>
