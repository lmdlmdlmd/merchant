<template>
  <view>
    <!-- <van-button type="info" @click="handle">按钮</van-button> -->

    <!-- TODO: custome-style里面的width和van-overlay加起来是100%，是为了控制关闭按钮的位置，能关闭了，但是叉号用不了 -->

    <!-- <van-popup
      position="bottom"
      closeable
      :show="addShow"
      custom-style="width:100%;height:40%;"
      close-icon-position="top-right"
      @click-overlay="onClose"
      @close="onCloseBtnClicked"
    >

    </van-popup> -->
    <view class="content">
      <text class="name">{{ name }}</text>
      <view @click="addShow = true">
        <van-row class="store_box">
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
      </view>
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
        <van-col span="10" class="timebox">
          <!-- <van-field
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
          /> -->

          <input
            class="timeInput"
            @click="hanleUpdateDate('start')"
            :value="dateStart"
          />
          <van-icon name="notes-o" class="input_icon" />
        </van-col>
        <van-col span="2" class="interval"
          ><text class="interval_text">至</text></van-col
        >
        <van-col span="10" class="timebox">
          <input
            class="timeInput"
            @click="hanleUpdateDate('end')"
            :value="dateEnd"
          />
          <van-icon name="notes-o" class="input_icon" />
          <!-- <van-field
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
          /> -->
        </van-col>
      </van-row>
      <van-row gutter="20" class="statistical_box">
        <van-col span="11" class="st_con1">
          <text class="st_title">开单数 （单）</text>
          <p class="st_con">20单</p>
        </van-col>
        <van-col span="2" class="view_pla"></van-col>
        <van-col span="11" class="st_con2">
          <text class="st_title">开单总金额（万）</text>
          <p class="st_con">3.60%</p>
        </van-col>
      </van-row>
      <van-row gutter="20" class="statistical_box">
        <van-col span="11" class="st_con3">
          <text class="st_title">客单价 （万）</text>
          <p class="st_con">¥88，888.00万元</p>
        </van-col>
        <van-col span="2" class="view_pla"></van-col>
        <van-col span="11" class="st_con4">
          <text class="st_title">收款金额（万）</text>
          <p class="st_con">¥88，888.00万元</p>
        </van-col>
      </van-row>
    </view>
    <!-- <van-popup v-bind:show="show" position="bottom" :style="{ height: '30%' }">
   
      <van-datetime-picker
        :value="currentDate"
        type="date"
        data-type="date"
        :min-date="minDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
      
    </van-popup> -->
    <van-popup
      v-bind:show="show"
      position="bottom"
      custom-style="width:100%;height:40%;"
    >
      <view>
        <van-datetime-picker
          :value="currentDate"
          type="date"
          title="请选择日期"
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="5"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </view>
    </van-popup>
    <!-- <van-popup
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
    </van-popup> -->
    <van-action-sheet
      v-bind:show="addShow"
      title="请选择店铺"
      close-icon-position="top-right"
      @click-overlay="onClose"
      @close="onCloseBtnClicked"
      class="addSheet"
    >
      <view class="add_opr">
        <van-row>
          <van-col span="12"
            ><view class="can" @click="handleCancel">取消</view></van-col
          >
          <van-col span="12"
            ><view class="con" @click="handleCancel('submit')"
              >确定</view
            ></van-col
          >
        </van-row>
      </view>
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
import authHandler from "../../provider/auth.handler"; //'./auth.handler.js';
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      name: "",
      show: false,
      minDate: new Date(1900, 0, 1).getTime(),
      maxDate: new Date(2999, 10, 1).getTime(),
      currentDate: new Date().getTime(),
      dateStart: null,
      dateEnd: null,
      type: "", //表示开始时间还是结束时间
      addShow: false, //切换用户身份
      columns: [
        // "上海徐家汇店(DS1-A-001)-招商经理",
        // "大明宫店钻石店(DS1-A-001)-导购员",
        // "杭州滨江店(DS1-A-001)-客服经理",
      ],
      addData: "", //"大明宫店钻石店(DS1-A-001)-导购员",
      addIndex: null,
      addDataId: null,
      isChooserole: false, //判断是否切换
    }; //userinfo
  },
  onLoad() {
    //地址弹出框选择默认值
    setTimeout(() => {
      const { user } = this.$auth;
      console.log(this.$auth);
      this.name = user.name;
      // let addIndexs = authRo.role;
      // this.addIndex = this.columns.findIndex((x) => x == this.addData);
    }, 500);
    // console.log(this.$auth);
  },
  mounted() {
    this.$api.post("userinfo").then((res) => {
      const { roles, roleorg } = res || {};
      roles.map((item, index) => {
        // console.log(addIndexs);
        if (item.id === roleorg) {
          this.addData = item.name;
          this.addIndex = index;
        }
        this.columns.push({ text: item.name, value: item.id });
      });
    });
  },
  created() {
    const dateSource = new Date();
    let year = dateSource.getFullYear() + "年";
    let month = dateSource.getMonth() + 1 + "月";
    let date = dateSource.getDate() + "日";
    this.dateStart = [year, month, date].join("-");
    this.dateEnd = [year, month, date].join("-");
  },
  methods: {
    onClose() {
      console.log("onClick methods function");
      this.addShow = false;
    },
    onCloseBtnClicked() {
      console.log("close button clicked");
      this.addShow = false;
    },
    // handle() {
    //   console.log(11);
    //   this.addShow = true;

    //   // this.setData({ show: true });
    // },
    onClickHide() {
      console.log(22);
      this.addShow = false;
    },
    //地址筛选start
    handleAddShow() {
      this.addShow = true;
    },
    handleConfirm(value) {
      console.log(value);
      const { detail } = value;
      if (this.addDataId != detail.value.value) {
        this.isChooserole = true;
        this.addDataId = detail.value.value;
        this.addData = detail.value.text;
      }
    },
    handleCancel(type) {
      if ((type = "submit" && this.isChooserole)) {
        this.$api.get("chooserole", { roleorg: this.addDataId }).then((res) => {
          console.log(res);
          const { token } = res;
          // sessionStorage.setItem("token", token);
          authHandler.saveToken(token);
          this.isChooserole = false;
        });
      }
      this.addShow = false;
    },
    //地址筛选end
    //时间筛选start
    hanleUpdateDate(type) {
      this.type = type;
      this.show = true;
    },
    onConfirm(value) {
      const { detail: da } = value || {};
      console.log(da);
      // const da = value;
      //    const data = new Date(da);
      // var year = data.getFullYear() + "年";
      // var month =data.getMonth() + 1 + "月";
      // var date = data.getDate() + "日";
      if (this.type == "start") {
        this.dateStart = moment(parseInt(da)).format("YYYY-MM-DD");
        // this.dateStart = [year, month, date].join("-");
      } else {
        // this.dateEnd = [year, month, date].join("-");
        this.dateEnd = moment(parseInt(da)).format("YYYY-MM-DD");
      }
      this.show = false;
      if (this.dateStart && this.dateEnd) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "查询成功",
        });
      }
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
    margin: 8px 0 14px;
    display: block;
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
    // padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
  }
  .interval {
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
  }
  .interval_text {
    margin-top: 5px;
    display: block;
  }

  .st_con {
    margin-top: 10px;
  }

  .timebox {
    // position: relative;
  }
  .timeInput {
    overflow: revert;
    padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    text-indent: 3px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  .input_icon {
    position: relative;
    top: -26px;
    right: -116px;
    color: rgba(0, 0, 0, 0.5);
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

// TODO: custome-style里面的width和van-overlay加起来是100%，是为了控制关闭按钮的位置
/deep/ .van-overlay {
  width: 100%;
  height: 60%;
}
/deep/ .st_con1 .van-col,
/deep/ .st_con2 .van-col,
/deep/ .st_con3 .van-col,
/deep/ .st_con4 .van-col {
  border-left: 3px solid rgba(0, 145, 255, 1);
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 13px;
  color: #333333;
  background: #e9f5fc;
  margin-top: 22px;
  display: block;
}
/deep/ .st_con2 .van-col,
/deep/ .st_con4 .van-col {
  background: #fbece8;
  border-left: 3px solid #ff4c0f;
}
/deep/ .st_con3 .van-col {
  background: #f1f9e8;
  border-left: 3px solid #6dd400;
}
/deep/ .view_pla .van-col {
  height: 10px;
}
</style>