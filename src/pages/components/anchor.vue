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
      // FIXME: 小程序中没有虚拟dom，不支持getElementById。
      // 解决思路：既然获取不到，就控制screens的显示，
      // 如点击1，就给1加一个active标签，
      // 在这里hidden2和3，每次点击遍历所有元素，只显示一个，其他隐藏

      // 其他几个页面的getelementbyid也要改
      // const query = wx.createSelectorQuery();
      // let anchorEle = query
      //   .select("#screens" + (parseInt(id) + 1))
      //   .boundingClientRect();
      let anchorEle = document.getElementById("screens" + (parseInt(id) + 1));
      console.log(anchorEle);
      anchorEle &&
        anchorEle.scrollIntoView({ behavior: "auto", block: "center" });
    },
    test() {
      console.log("test fonction");
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
