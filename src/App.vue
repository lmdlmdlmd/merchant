<script>
export default {
  onLaunch: function () {
    // console.log('App OnLaunch');
    // 自动登录检测
    // this.autoLogin();
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    /**
     * 自动登录
     * 判断本地是否有账号信息，如果有，就自动重新登录
     */
    // autoLogin() {
    //   this.$store.dispatch("autoLogin");
    // },
  },
};
</script>

<style lang="less">
/*每个页面公共css */
@import "./wxcomponents/common/index.wxss";
@import "./common/css/index.less";
</style>
