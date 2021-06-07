<template>
  <view class="operate" :style="{ marginLeft: maLe }">
    <van-field
      v-model="type"
      placeholder="请选择价签打印类型"
      label="价签打印类型"
      :required="isRequire"
      right-icon="arrow"
      @click-right-icon="typeShow = true"
    />
    <van-row class="good_money_box">
      <van-col span="12">
        <p :class="isRequire ? 'good_money_be' : 'good_money'">
          {{ title }}
        </p>
      </van-col>
      <van-col span="12" class="opr_sh">
        <view>
          <text class="add_sh" @click="handleAdd">+</text>
          <text class="add_num">{{ number }}</text>
          <text class="de_sh" @click="handleDel">-</text>
        </view>
      </van-col>
    </van-row>
    <van-action-sheet v-model="typeShow" title="" class="addSheet">
      <van-row class="add_opr">
        <van-col span="12" class="can" @click="handleCancel">取消</van-col>
        <van-col span="12" class="con" @click="handleCancel">确定</van-col>
      </van-row>
      <van-picker
        :show-toolbar="false"
        :columns="columns"
        @change="handleConfirm"
        :default-index="addIndex"
      />
    </van-action-sheet>
  </view>
</template>

<script>
export default {
  name: "Operate",
  props: {
    title: {
      type: String,
      default: "价签打印数量",
    },
    type: {
      type: String,
      default: "",
    },
    number: {
      type: Number,
      default: 1,
    },
    maLe: {
      type: String,
      default: "0",
    },
    isRequire: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      typeShow: false,
      columns: ["标准签", "横签", "竖签", "爆炸签"],
      //  addData: "横签",
      addIndex: null,
      index: null,
    };
  },
  onLoad() {
    //地址弹出框选择默认值
    this.addIndex = this.columns.findIndex((x) => x == this.type);
  },
  methods: {
    handleConfirm(value, index) {
      // console.log(value, index);
      // this.typeShow = true;
      this.index = index;
    },
    handleCancel() {
      this.typeShow = false;
      console.log(this.index);
      this.$emit("handleConfirm", this.index);
    },
    handleAdd() {
      this.$emit("handleAdd");
    },
    handleDel() {
      this.$emit("handleDel");
    },
  },
};
</script>

<style scoped>
.operate {
  /* width: calc(100% - 40px);
  margin: 0 auto; */
  margin-left: 32px;
  margin-right: 18px;
}
.good_money_box {
  margin-top: 5px;
}
.good_money,
.good_money_be {
  color: #1e1e1e;
  font-size: 12px;
  margin-top: 5px;
  left: 17px;
  position: relative;
}
.good_money_be::before {
  position: absolute;
  left: -9px;
  color: #ee0a24;
  font-size: 14px;
  content: "*";
}
.opr_sh {
  text-align: right;
}
.add_sh,
.de_sh {
  color: #333333;
  font-size: 30upx;
  border: 1px solid #cccccc;
  /* padding: 1px 5px; */
  /* line-height: 20px; */
  /* height: 24px; */
  padding: 4upx 10upx;
}
.add_num {
  color: #333;
  font-size: 30upx;
  padding: 4upx 10upx;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 48upx;
  height: 68upx;
}
</style>
<style lang="less">
/deep/ .van-cell::after {
  border-bottom: none;
}
/deep/ .van-field__label {
  color: #1e1e1e;
  font-size: 12px;
}
/deep/.van-cell {
  padding: 10px 0 10px 16px;
}
/deep/.van-field__control {
  text-align: right;
}
/deep/.addSheet .add_opr {
  width: 60%;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 600;
  color: #0091ff;
  padding-bottom: 10px;
  margin-top: 20px;
  .con {
    text-align: right;
  }
}
/deep/.addSheet .van-picker-column__item--selected {
  color: #0091ff;
}
</style >
