<template>
  <view>
    <view class="content">
      <text class="name">王晓霞</text>

      <van-row class="store_box" @click="handleAddShow">
        <van-col>
          <text class="store_title">{{ addData }}</text>
          <!-- <text class="store_title"
            >大明宫钻石店<span class="identity">导购员</span></text
          > -->
          <image
            src="../../static/img/imgs/more.png"
            class="home_more_img"
          ></image>
        </van-col>
      </van-row>
      <van-row class="data_analysis">
        <van-col>
          <image
            src="../../static/img/imgs/datasource.png"
            class="data_an_img"
          ></image>
          <text class="data_an_title">销售数据分析</text>
        </van-col>
      </van-row>
      <van-row class="data_select">
        <van-col span="10">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="dateStart"
            label=""
            placeholder="开始时间"
            @click="hanleUpdateDate('start')"
            :label-width="0"
            right-icon="notes-o"
            class="startData"
          />
        </van-col>
        <van-col span="2" class="interval">至</van-col>
        <van-col span="10">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="dateEnd"
            label=""
            placeholder="结束时间"
            @click="hanleUpdateDate('end')"
            :label-width="0"
            right-icon="notes-o"
            class="startData"
          />
        </van-col>
      </van-row>
      <van-row class="statistical_box">
        <van-col span="11" class="st_con1">
          <text class="st_title">开单数 （单）</text>
          <p class="st_con">20单</p>
        </van-col>
        <van-col span="2"></van-col>
        <van-col span="11" class="st_con2">
          <text class="st_title">开单总金额（万）</text>
          <p class="st_con">3.60%</p>
        </van-col>
      </van-row>
      <van-row class="statistical_box">
        <van-col span="11" class="st_con3">
          <text class="st_title">客单价 （万）</text>
          <p class="st_con">¥88，888.00万元</p>
        </van-col>
        <van-col span="2"></van-col>
        <van-col span="11" class="st_con4">
          <text class="st_title">收款金额（万）</text>
          <p class="st_con">¥88，888.00万元</p>
        </van-col>
      </van-row>
    </view>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <view>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title=""
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="3"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </view>
    </van-popup>
    <van-popup
      v-model="addShow"
      title=""
      class="addSheet"
      round
      position="bottom"
    >
      <van-row class="add_opr">
        <van-col span="12" class="can" @click="handleCancel">取消</van-col>
        <van-col span="12" class="con" @click="handleCancel">确定</van-col>
      </van-row>
      <van-picker
        :show-toolbar="false"
        :columns="columns"
        @change="handleConfirm"
      />
    </van-popup>
    <van-action-sheet v-model="addShow" title="" class="addSheet">
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
  components: {},
  data() {
    return {
      show: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2999, 10, 1),
      currentDate: new Date(),
      dateStart: "",
      dateEnd: "",
      type: "", //表示开始时间还是结束时间
      addShow: false, //切换用户身份
      columns: [
        "上海徐家汇店 招商经理",
        "大明宫店钻石店 导购员",
        "杭州滨江店 客服经理",
      ],
      addData: "大明宫店钻石店 导购员",
      addIndex: null,
    };
  },
  onLoad() {
    //地址弹出框选择默认值
    this.addIndex = this.columns.findIndex((x) => x == this.addData);
  },
  methods: {
    //地址筛选start
    handleAddShow() {
      this.addShow = true;
    },
    handleConfirm(value, index) {
      console.log(value, index);
      this.addShow = false;
      this.addData = index;
    },
    handleCancel() {
      this.addShow = false;
    },
    //地址筛选end
    //时间筛选start
    hanleUpdateDate(type) {
      this.type = type;
      this.show = true;
    },
    onConfirm(value, index) {
      const da = value;
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      if (this.type == "start") {
        this.dateStart = [year, month, date].join("-");
      } else {
        this.dateEnd = [year, month, date].join("-");
      }
      this.show = false;
      //开始时间结束时间同时存在刷新页面
      // const params = {};
      // Vue.prototype.$api.updateUser(params).then((res) => {
      //   console.log(res);
      //   this.$toast.text("操作成功");
      // });
    },
    onCancel() {
      this.show = false;
    },

    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    //时间筛选end
  },
};
</script>

<style lang="less" scoped>
.content {
  width: calc(100% - 80upx);
  margin: 30upx auto 68upx;
  .name {
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    font-weight: 600;
  }
  .store_title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    margin-top: 10px;
  }
  .home_more_img {
    width: 10px;
    height: 6px;
    margin-left: 6px;
  }
  .identity {
    margin-left: 6px;
  }
  .data_analysis {
    margin: 30px 0 14px;
  }
  .data_select {
    margin-bottom: 8px;
  }
  .data_an_img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  } //#e9f5fc #fbece8 #f1f9e8 #fbece8
  .data_an_title {
    color: #333333;
    font-size: 13px;
    font-weight: 600;
    margin-left: 13px;
  }
  .startData {
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
  }
  .interval {
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    margin-top: 8px;
  }
  .st_con1,
  .st_con2,
  .st_con3,
  .st_con4 {
    border-left: 3px solid rgba(0, 145, 255, 1);
    border-radius: 5px;
    padding: 8px 10px;
    font-size: 13px;
    color: #333333;
    background: #e9f5fc;
    margin-top: 22px;
  }
  .st_con {
    margin-top: 10px;
  }
  .st_con2,
  .st_con4 {
    background: #fbece8;
    border-left: 3px solid #ff4c0f;
  }
  .st_con3 {
    background: #f1f9e8;
    border-left: 3px solid #6dd400;
  }
}
</style>

<style lang="less" >
/deep/.data_select .van-field__control {
  font-size: 12px;
  text-indent: 3px;
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
</style>