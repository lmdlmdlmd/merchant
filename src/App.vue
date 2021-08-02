<script>
import Vue from "vue";
import api from "./provider/api.js";
import auth from "./provider/auth.js";
import toast from "./provider/toast.js";
export default {
  onLaunch: function () {
    console.log("App Launch", Vue.prototype);
    Vue.prototype.$toast = toast;
    Vue.prototype.$api = api;
    Vue.prototype.$auth = auth;
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

<style>
/*每个页面公共css */
@import "./wxcomponents/common/index.wxss";
</style>
