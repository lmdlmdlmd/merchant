<template>
  <view class="wh-100s">
    <view class="padding-l-16 padding-r-16">
      <text class="name">{{ name }}</text>
      <view class="margin-t-10">
        <van-row gutter="20">
          <van-col span="16">
            <text class="lh-20 text-12">{{ role.name || '--' }}</text>
          </van-col>
          <van-col span="8">
            <button class="wx-primary wx-ghost wx-s" style="line-height: 18px; padding: 0 8px"  @click="showRoles = true">
              切换身份
              <van-icon class="margin-l-3" name="arrow-down" />
            </button>
          </van-col>
        </van-row>
      </view>
      <view class="padding-t-10 padding-b-10">
        <van-row class="data_analysis">
          <van-col>
            <image
              src="../../static/img/imgs/datasource.png"
              mode="aspectFit"
              class="data_an_img"
            ></image>
            <text class="data_an_title">销售数据分析</text>
          </van-col>
        </van-row>
      </view>
      <view class="padding-b-10">
        <van-row>
          <van-col span="11">
            <view class="timebox">
              <input
                class="timeInput"
                @click="hanleUpdateDate('start')"
                :value="dateStart"
              />
              <van-icon name="notes-o" class="input_icon" />
            </view>
          </van-col>
          <van-col span="2" class="interval">
            <text class="interval_text">至</text>
          </van-col>
          <van-col span="11">
            <view class="timebox">
              <input
                class="timeInput"
                @click="hanleUpdateDate('end')"
                :value="dateEnd"
              />
              <van-icon name="notes-o" class="input_icon" />
            </view>
          </van-col>
        </van-row>
      </view>
      
      <view>
        <van-row gutter="20">
          <van-col span="12">
            <view class="st_con1">
              <view class="st_title">开单数 （单）</view>
              <view class="margin-t-10">{{ storeView.ordernum || 0 }}单</view>
            </view>
          </van-col>
          <van-col span="12">
            <view class="st_con2">
              <view class="st_title">开单总金额（万）</view>
              <view class="margin-t-10">{{ storeView.orderamount || 0 }} %</view>
            </view>
          </van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="12">
            <view class="st_con3">
              <view class="st_title">客单价 （万）</view>
              <view class="margin-t-10">¥ {{ storeView.unitprice || 0 }} 万元</view>
            </view>
          </van-col>
          <van-col span="12">
            <view class="st_con4">
              <view class="st_title">收款金额（万）</view>
              <view class="margin-t-10">¥ {{ storeView.receivedamount || 0 }} 万元</view>
            </view>
          </van-col>
        </van-row>
      </view>
    </view>
    <van-popup
      :show="show"
      position="bottom"
    >
      <view>
        <van-datetime-picker
          :value="defaultDate"
          type="date"
          title="请选择日期"
          :min-date="new Date(1900, 0, 1).getTime()"
          :max-date="new Date(2999, 10, 1).getTime()"
          visible-item-count="5"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </view>
    </van-popup>
    <van-popup
      :show="showRoles"
      round
      position="bottom"
    >
      <van-picker
        :show-toolbar="true"
        :columns="columns"
        value-key="name"
        :default-index="defaultIndex"
        @cancel="onClickHide"
        @confirm="handleConfirm"
      />
    </van-popup>
  </view>
</template>

<script>
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      name: "",
      show: false,
      showRoles: false, // 显示切换用户身份列表
      role: {}, //"大明宫店钻石店(DS1-A-001)-导购员",
      defaultDate: new Date().getTime(),
      dateStart: null,
      dateEnd: null,
      type: "", //表示开始时间还是结束时间
      columns: [],
      storeView: {
        receivedamount: 0,
        unitprice: 0,
        ordernum: 0,
        orderamount: 0
      }
    };
  },
  onLoad() {
    const { name } = this.$auth.data || {};
    this.name = name;
    const dateSource = new Date();
    this.dateStart = moment(dateSource).format("YYYY-MM-DD");
    this.dateEnd = moment(dateSource).format("YYYY-MM-DD");
    this.getUserInfo();
  },
  onShow() {
    this.getStoreView();
  },
  computed: {
    defaultIndex() {
      let index = 0
      this.columns.forEach((item, i) => {
        if (item.id == this.role.id) {
          index = i;
        }
      });
      return index;
    }
  },
  methods: {
    getUserInfo() {
      this.$api.post("userinfo").then((res) => {
        const { roles, roleorg } = res || {};
        roles.map((item, index) => {
          if (item.id === roleorg) {
            this.role = item;
            this.$auth.update({ ...res, role: item });
          }
          this.columns.push(item);
        });
      });
    },
    onClickHide() {
      this.showRoles = false;
    },
    onCancel() {
      this.show = false;
    },
    handleConfirm(value) {
      const { detail } = value;
      this.role = detail.value;
      this.changeRole();
    },
    changeRole() {
      this.$api.get("chooserole", { roleorg: this.role.id }).then((res) => {
        const { token, roleorg } = res;
        this.$auth.update({ token, roleorg });
        uni.reLaunch({url: '/pages/index/index'});
      });
    },
    //地址筛选end
    //时间筛选start
    hanleUpdateDate(type) {
      this.type = type;
      this.show = true;
      if (this.type === "start") {
        this.defaultDate = moment(this.dateStart, "YYYY-MM-DD").valueOf();
      } else {
        this.defaultDate = moment(this.dateEnd, "YYYY-MM-DD").valueOf();
      }
    },
    onConfirm(value) {
      const { detail: da } = value || {};
      const date = moment(parseInt(da)).format("YYYY-MM-DD");
      if (this.type == "start") {
        if ( date > this.dateEnd) {
          return this.$toast.text("开始时间不能大于结束时间");
        }
        this.dateStart = moment(parseInt(da)).format("YYYY-MM-DD");
      } else {
        if (date < this.dateStart) {
          return this.$toast.text("结束时间不能小于开始时间");
        }
        this.dateEnd = moment(parseInt(da)).format("YYYY-MM-DD");
      }
      this.show = false;
      this.getStoreView();
    },
    getStoreView() {
      const params = {
        tp: "merch",
        ordertime: {
          min: moment(this.dateStart, "YYYY-MM-DD").startOf('day').valueOf(),
          max: moment(this.dateStart, "YYYY-MM-DD").endOf('day').valueOf()
        }
      }
      this.$api.post("mall/storder/view", params).then(res => {
        res = {
          "data": {
              "receivedamount": 115,
              "unitprice": 5460,
              "ordernum": 56,
              "orderamount": 1858
          },
          "code": 0
        };
        this.storeView = res.data;
      });
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
    }
  }
};
</script>

<style lang="less" scoped>
.name {
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
}
.data_an_img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.data_an_title {
  color: #333333;
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  margin-left: 13px;
}
.timebox {
  position: relative;
  .timeInput {
    overflow: revert;
    padding: 3px 20px 3px 8px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    text-indent: 3px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  .input_icon {
    position: absolute;
    top: 8px;
    right: 8px;
    color: rgba(0, 0, 0, 0.5);
  }
}
.interval {
  text-align: center;
  font-size: 12px;
  line-height: 30px;
}
.st_con1,
.st_con2,
.st_con3,
.st_con4 {
  border-left: 3px solid rgba(0, 145, 255, 1);
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 13px;
  line-height: 18px;
  color: #666;
  background: #e9f5fc;
  margin-top: 22px;
  display: block;
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
</style>
