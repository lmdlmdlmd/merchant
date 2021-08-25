<template>
  <view class="salesInquiryBox">
    <zz-nav-bar
      title="销售查询"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <view class="selling_period">
        <p class="se_title">销售期间</p>
        <van-row class="data_select">
          <van-col span="10" class="timebox">
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
          </van-col>
        </van-row>
        <!-- <van-row class="data_select">
          <van-col span="11">
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
          <van-col span="11">
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
        </van-row> -->
      </view>
      <view class="orderBox">
        <zz-empty
          v-if="!list.data.length"
          title="该期间还没有订单哦～"
        ></zz-empty>
        <mescroll-uni
          @down="downCallback"
          @up="upCallback"
          :top="top"
          @init="scroll = $event"
          class="dataList"
        >
          <view
            v-for="(item, index) of list.data"
            :key="index"
            class="orderDiv"
            @click="handleDetail(item)"
          >
            <van-row class="dataHeader">
              <van-col span="18" class="order_title"
                >对账单号：<text class="sn">{{ item.orderno }}</text></van-col
              >
              <van-col span="6" class="tel_right">
                <span
                  class="mark"
                  :style="{
                    background: item.type == '1' ? '#ff4c0f' : '#52C41A',
                  }"
                ></span>
                <text class="order_type">{{
                  item.type == "1" ? "定金" : "销售"
                }}</text>
              </van-col>
            </van-row>
            <van-row class="dataCon">
              <van-col span="6" class="lavelBox"
                ><p class="lavel">销售日期</p>
                <p class="val">{{ item.Ordertime_s }}</p></van-col
              >
              <van-col span="6" class="lavelBox"
                ><p class="lavel">销售凭证号</p>
                <p class="val">{{ item.ordervoucher }}</p></van-col
              >
              <van-col span="6" class="lavelBox"
                ><p class="lavel">销售金额</p>
                <p class="val">¥ {{ item.Amount }}</p></van-col
              >
              <van-col span="6" class="lavelBox"
                ><p class="lavel">收款金额</p>
                <p class="val">¥ {{ item.Realamount }}</p></van-col
              >
            </van-row>
          </view>
        </mescroll-uni>
      </view>
      <view class="footer"> <Footer active="navigation"></Footer></view>
    </view>
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
          @cancel="show = false"
        />
      </view>
    </van-popup>
  </view>
</template>

<script>
import zzNavBar from "@/components/zz-nav-bar";
import Footer from "@/components/footer-nav";
import zzEmpty from "@/components/zz-empty";
import moment from "moment";
import MescrollUni from "@/mescroll-uni/mescroll-uni.vue";
import { EasyListService } from "@/provider/list.service.js";
import { formatDecimal } from "@/utils/index.js";
export default {
  components: {
    zzNavBar,
    Footer,
    zzEmpty,
    MescrollUni,
  },
  data() {
    return {
      top: 0,
      list: {},
      scroll: null,
      show: false,
      type: "",
      dateStart: null,
      dateEnd: null,
      minDate: new Date(1900, 0, 1).getTime(),
      maxDate: new Date(2999, 10, 1).getTime(),
      currentDate: new Date().getTime(),
      start: "",
      end: "",
    };
  },
  onLoad() {},
  created() {
    let sys = uni.getSystemInfoSync();
    this.top = 248 + Math.floor(sys.statusBarHeight) * 2;
    const dateSource = new Date();
    let year = dateSource.getFullYear() + "年";
    let month = dateSource.getMonth() + 1 + "月";
    let date = dateSource.getDate() + "日";
    this.dateStart = [year, month, date].join("-");
    this.dateEnd = [year, month, date].join("-");
    this.start = moment(dateSource).valueOf();
    this.end = moment(new Date()).valueOf();
    this.list = new EasyListService({
      url: "mall/saleorder/search",
      pageKey: "page",
      sizeKey: "rows",
      params: {
        ordertime: {
          max: moment(new Date()).valueOf(),
          min: moment(dateSource).valueOf(),
        },
      },
      format: (list) => {
        return list.map((_) => {
          _.Amount = formatDecimal(_.amount, 2);
          _.Realamount = formatDecimal(_.realamount, 2);
          _.Ordertime_s = moment(_.ordertime_s).format("YYYY-MM-DD");
          return _;
        });
      },
    });
  },
  methods: {
    downCallback(e) {
      // console.log("刷新");
      e.resetUpScroll();
    },
    upCallback(e) {
      // console.log("加载", e);
      this.list
        .load(e.num, e.size)
        .then(() => {
          // console.log("加载成功", this.list);
          e.endBySize(this.list.preLength, this.list.total);
        })
        .catch(() => {
          // console.log('加载失败');
          e.endErr();
        });
    },
    handleDetail(data) {
      console.log(data);
      //定金订单详情`/pages/navigation/deposit/depositOrderDetail`
      //标准订单详情`/pages/navigation/standard/standardOrderDetail?id=${id}`
      uni.navigateTo({
        url:
          data.type == "1"
            ? `/pages/navigation/deposit/depositOrderDetail?id=${data.id}`
            : `/pages/navigation/standard/standardOrderDetail?id=${data.id}`,
      });
    },
    hanleUpdateDate(type) {
      this.type = type;
      this.show = true;
    },

    onConfirm(value) {
      // const da = value;
      const { detail: da } = value || {};
      const data = new Date(da);
      var year = data.getFullYear() + "年";
      var month = data.getMonth() + 1 + "月";
      var date = data.getDate() + "日";
      if (this.type == "start") {
        // this.dateStart = moment(parseInt(da)).format("YYYY-MM-DD");
        this.start = da;
        this.dateStart = [year, month, date].join("-");
      } else {
        this.end = da;
        // this.dateEnd = moment(parseInt(da)).format("YYYY-MM-DD");

        this.dateEnd = [year, month, date].join("-");
      }
      console.log(this.start, this.end);
      if (this.start && this.end) {
        // console.log(this.start, moment(this.start).utcOffset(480));
        this.list.onLoad = (body) => {
          body.ordertime = {
            max: moment(new Date(this.start)).utcOffset(480).valueOf(),
            min: moment(new Date(this.end)).utcOffset(480).valueOf(),
          };
        };
        this.downCallback(this.scroll);
      }
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
  },
};
</script>

<style lang="less" scoped>
.salesInquiryBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 10px auto 68upx;
  .selling_period {
    background: #fff;
    padding: 10px 20px;
  }
  .se_title {
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
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
  .selling_period {
    border-bottom: 1px solid #dddddd;
  }
  .orderBox {
    margin-top: 10px;
  }
  .orderDiv {
    border-top: 1px solid #dddddd;
    background: #fff;
    padding-bottom: 10px;
    margin-top: 10px;
  }

  .tel_right {
    text-align: right;
  }
  .mark {
    width: 8px;
    height: 8px;
    background: #ff4c0f;
    display: inline-block;
    border-radius: 20px;
    margin-right: 8px;
  }
  .file_text {
    color: #1e1e1e;
    font-size: 13px;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.data_select {
  margin-bottom: 8px;
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
.interval {
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
}
.interval_text {
  margin-top: 5px;
  display: block;
}
</style>
<style lang="less">
/deep/.data_select .van-field__control {
  font-size: 12px;
  text-indent: 3px;
}
/deep/.data_select .van-field__control {
  font-size: 12px;
  text-indent: 3px;
}
/deep/ .dataHeader .van-row {
  margin: 10px auto 6px;
  width: calc(100% - 20px);
  // padding: 10px 0;
  font-size: 14px;
  color: #1e1e1e;
}
/deep/ .dataCon .van-row {
  font-size: 12px;
  color: #1e1e1e;
  text-align: center;
  border: 1px solid #eeeeee;
  margin: 10px auto 6px;
  width: calc(100% - 20px);
  padding: 10px 0;
  border-radius: 6px;
  .val {
    margin-top: 7px;
    color: #9a9a9a;
  }
  .lavelBox {
    text-align: center;
    // padding-right: 10px;
  }
}
/deep/ .timebox .van-col {
  height: 25px;
}
</style>