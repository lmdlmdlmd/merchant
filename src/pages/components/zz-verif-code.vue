<template>
  <view
    class="verif-container"
    :style="{
      backgroundColor: /^1[34578]\d{9}$/.test(phone) ? '#0091FF' : '#bfbfbf',
    }"
  >
    <!-- <zz-input
      :value.sync="zzCode"
      :placeholder="placeholder"
      v-if="input_code"
    ></zz-input> -->
    <view v-if="line" class="verif-line"></view>
    <text v-if="time" class="verif-code c-gray">{{ time }}s后获取</text>
    <text
      v-else
      class="verif-code c-blue"
      @click="/^1[34578]\d{9}$/.test(phone) ? getCode() : ''"
      >获取验证码</text
    >
  </view>
</template>

<script>
import zzInput from "./zz-input.vue";

export default {
  name: "zzVerifCode",
  props: {
    value: {
      default: "",
    },
    type: {
      type: [Number, String],
      required: true,
    },
    line: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: [Number, String],
      default: "86",
    },
    placeholder: {
      type: String,
      default: "请输入验证码",
    },
    input_code: {
      type: String,
      default: false,
    },
  },
  components: {
    zzInput,
  },
  data() {
    return {
      zzCode: "",
      time: 0,
      timer: undefined,
    };
  },
  watch: {
    zzCode(e) {
      this.$emit("update:value", e);
      this.$emit("change", this.zzCode);
    },
  },
  methods: {
    // 获取验证码
    getCode() {
      // this.$api.post('pushmsg/index/sms/send-code', {
      // 	mobile: this.phone,
      // 	type: this.type,
      // 	foreign: this.code == '86' ? 0 : 1,
      // 	foreign_code: this.code
      // }).then(res => {
      this.startCountDown();
      this.$emit("onSuccess");
      // })
    },
    // 开始验证码倒计时
    startCountDown() {
      this.timer && clearInterval(this.timer);
      this.time = 60;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
};
</script>

<style scoped>
.verif-container {
  position: absolute;
  right: 0;
  padding: 12upx 20upx;
  background-color: #bfbfbf;
  color: #fff;
  font-size: 28upx;
  border-radius: 8upx;
  margin-bottom: 6upx;
}
/* .verif-container {
  display: flex;
  flex: 1;
  width: 100%;
}

.verif-line {
  width: 1px;
  height: 44upx;
  margin: 0 32upx;
  background: #eeeeee;
}

.verif-code {
  width: 174upx;
  font-size: 34upx;
  text-align: right;
} */
</style>
