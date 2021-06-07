<template>
  <view class="anchorBody">
    <view class="division"></view>
    <view class="anchorBox">
      <view v-for="(item, index) of anchor" :key="index">
        <view
          :class="isSelect == index ? 'active' : 'anchor'"
          @click="handleAnchor(index)"
          >{{ item }}</view
        ></view
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "anchor",
  props: {
    anchor: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {
      isSelect: 0,
    };
  },
  onLoad() {},
  methods: {
    handleAnchor(id) {
      this.isSelect = id;
      let anchorEle = document.getElementById("screens" + (parseInt(id) + 1));
      anchorEle &&
        anchorEle.scrollIntoView({ behavior: "auto", block: "center" });
    },
  },
};
</script>

<style lang="less" scoped>
.anchorBox {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  margin: 12px auto;
  width: calc(100% - 20px);
  color: #333333;
  font-size: 14px;
}
.anchorBody {
  margin: 0 auto;
  background: #fff;
  height: 35px;
  position: fixed;
  z-index: 999;
  padding-bottom: 20px;
  width: 100%;
  text-align: center;
  margin-top: -1px;
}
.division {
  width: 100%;
  height: 12px;
  background: #f5f5f5;
}
.active {
  color: #0091ff;
  border-bottom: 2px solid #0091ff;
  padding-bottom: 2px;
}
</style>
