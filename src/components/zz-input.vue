<template>
  <view class="input">
    <input
      class="input-input"
      v-if="type === 'password'"
      :password="eye ? !showPwd : !show"
      v-model="zzValue"
      :focus="focus"
      :adjust-position="adjustPosition"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
    />
    <input
      class="input-input"
      v-else-if="type === 'number'"
      type="number"
      v-model="zzValue"
      :focus="focus"
      :adjust-position="adjustPosition"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
    />
    <input
      class="input-input"
      v-else-if="type === 'idcard'"
      type="idcard"
      v-model="zzValue"
      :focus="focus"
      :adjust-position="adjustPosition"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
    />
    <input
      class="input-input"
      v-else-if="type === 'digit'"
      type="digit"
      v-model="zzValue"
      :focus="focus"
      :adjust-position="adjustPosition"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
    />
    <input
      class="input-input"
      v-else
      v-model="zzValue"
      :focus="focus"
      :adjust-position="adjustPosition"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
    />
    <image
      v-if="zzValue && type != 'password'"
      class="input--clean"
      @click.stop="clean"
      src="/static/img/icon/icon-clean.png"
    ></image>
    <view
      v-if="type === 'password' && eye"
      class="icon"
      @click.stop="showPwd = !showPwd"
    >
      <image
        v-if="showPwd"
        class="input--eye-close"
        src="/static/img/icon/icon-eye.png"
      ></image>
      <image
        v-else
        class="input--eye-open"
        src="/static/img/icon/icon-eye-invisible.png"
      ></image>
    </view>
  </view>
</template>

<script>
const verifierMap = {
  money: /^\d*(\.\d{0,2})?$/,
};

export default {
  name: "zzInput",
  props: {
    value: {
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    focus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 140,
    },
    show: {
      type: Boolean,
      default: false,
    },
    eye: {
      type: Boolean,
      default: false,
    },
    max: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    handleMax: {
      type: Boolean,
      default: false,
    },
    adjustPosition: {
      type: Boolean,
      default: true,
    },
    verifier: {
      type: String,
      validator: (val) => {
        if (val) {
          return !!verifierMap[val];
        } else {
          return true;
        }
      },
    },
  },
  data() {
    return {
      zzValue: this.value,
      zzOldValue: this.value,
      showPwd: false,
    };
  },
  watch: {
    value(n, o) {
      this.zzOldValue = o;
      this.zzValue = n;
    },
    zzValue(e) {
      if (e != this.value) {
        this.$emit("update:value", this.zzValue);
      }
    },
  },
  methods: {
    clean() {
      this.zzValue = "";
      this.zzOldValue = "";
      this.$emit("clean");
      this.$emit("input", this.zzValue);
    },
    setValue(e) {
      this.zzValue = e;
    },
    onInput(e) {
      this.$nextTick(() => {
        let update = false;
        if (this.verifier) {
          let reg = verifierMap[this.verifier];
          if (!reg.test(this.zzValue.toString())) {
            this.zzValue = this.zzOldValue;
          } else {
            update = true;
          }
        }
        if (this.type === "digit") {
          let max = parseFloat(this.max);
          if (this.zzValue > max) {
            if (this.handleMax) {
              this.$emit("onMax", true);
            } else {
              this.zzValue = max;
            }
          } else {
            update = true;
          }
        }
        this.$emit("input", this.zzValue);
        if (update) {
          this.zzOldValue = this.zzValue;
        }
      });
      this.$emit("onMax", false);
    },
    onFocus(e) {
      this.$emit("foucs", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onConfirm(e) {
      this.$emit("confirm", e);
    },
  },
};
</script>

<style scoped>
.input {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  height: 48upx;
  font-size: 34upx;
}

.input-input {
  flex: 1;
  height: 64upx;
  text-indent: 24upx;
  border-radius: 6upx;
  border: 2upx solid rgba(0, 0, 0, 0.15);
}

.input--clean {
  width: 32upx;
  height: 32upx;
  /* margin: -16upx 0;
		padding: 16upx; */
  position: absolute;
  right: 24upx;
}

.input--clean:last-child {
  /* margin-right: -16upx; */
}

.icon {
  /* display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 50upx;
		padding: 16upx;
		margin-right: -16upx; */
  position: absolute;
  right: 24upx;
}

.input--eye-open {
  width: 32upx;
  height: 32upx;
  margin: -16upx;
  padding: 16upx;
}

.input--eye-close {
  width: 32upx;
  height: 26upx;
  margin: -16upx;
  padding: 16upx;
}
.input-placeholder,
.textarea-placeholder,
.uni-input-placeholder,
.uni-textarea-placeholder {
  color: rgba(0, 0, 0, 0.25);
  font-size: 28upx;
  /* height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end; */
}
</style>
