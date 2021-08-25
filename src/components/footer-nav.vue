<template>
  <div class="footer-nav">
    <!-- <div @click="go('/pages/index/index')">
      <div>
        <img
          src="../static/img/tabbar/index.png"
          alt="home"
          v-if="active != 'index'"
        />
        <img
          src="../static/img/tabbar/index_s.png"
          alt="home"
          v-if="active == 'index'"
        />
      </div>
      <p>首页</p>
    </div>
    <div @click="go('/pages/navigation/index')">
      <div>
        <img
          src="../static/img/tabbar/navigation.png"
          alt="navigation"
          v-if="active != 'navigation'"
        />
        <img
          src="../static/img/tabbar/navigation_s.png"
          alt="navigation"
          v-if="active == 'navigation'"
        />
      </div>
      <p>导航</p>
    </div>
    <div @click="go('/pages/home/index')">
      <div>
        <img
          src="../static/img/tabbar/mine.png"
          alt="user"
          v-if="active != 'home'"
        />
        <img
          src="../static/img/tabbar/mine_s.png"
          alt="user"
          v-if="active == 'home'"
        />
      </div>
      <p>我的</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    active: { type: String, required: true, default: "index" }, //标识要选中那个
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    go(path) {
      console.log(path);
      //跳转
      uni.reLaunch({
        url: `${path}`,
      });
    },
  },
};
</script>

<style lang="less" scope>
.footer-nav {
  display: flex;
  justify-content: space-around;
  padding-top: 6upx;
  padding-bottom: 8upx;
  background-color: #fff;
  > div {
    text-align: center;
    flex: 1;
    > div {
      height: 42upx;
    }
    img {
      vertical-align: top;
      width: 42upx;
      height: 40upx;
    }

    p {
      font-size: 22upx;
      line-height: 32upx;
      font-weight: 400;
      color: #999999;
      &.active {
        font-weight: 500;
        color: #0c0d0e;
      }
    }
  }
  &.ios {
    padding-bottom: 74upx;
  }
}
</style>